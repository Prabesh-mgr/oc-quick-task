import { BoardColumn, Task, User } from "../../models/index.js";

export const getBoardColumnsAndTasks = async (req, res) => {
  try {
    const boardId = req.params.boardId;
    const loggedInUserId = req.user.userId;
    
    if (!boardId) {
      return res.status(400).json({ error: "Board ID is required" });
    }
    
    if (!loggedInUserId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    
    
    const columns = await BoardColumn.findAll({
      where: {
        boardId: boardId
      },
      include: [
        {
          model: Task,
          as: 'tasks',
          attributes: ['taskId', 'taskName', 'description', 'dueDate', 'columnId', 'assignedTo', 'completed', 'createdAt', 'updatedAt'],
          required: false
        }
      ]
    });
    
    
    if (!columns || columns.length === 0) {
      return res.status(204).json([]);
    }

    const allAssignedUserIds = new Set();
    columns.forEach(column => {
      if (column.tasks && Array.isArray(column.tasks)) {
        column.tasks.forEach(task => {
          if (task.assignedTo && Array.isArray(task.assignedTo)) {
            task.assignedTo.forEach(userId => allAssignedUserIds.add(userId));
          }
        });
      }
    });

    let userMap = {};
    if (allAssignedUserIds.size > 0) {
      try {
        const assignedUsers = await User.findAll({
          where: { userId: Array.from(allAssignedUserIds) },
          attributes: ['userId', 'firstName', 'lastName', 'email'] 
        });
        
        assignedUsers.forEach(user => {
          userMap[user.userId] = {
            name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.email || user.userId, 
            email: user.email
          };
        });
      } catch (userError) {
        console.error("Error fetching user data:", userError);
      }
    }
    
    const result = columns.map(column => ({
      columnId: column.columnId,
      columnName: column.columnName,
      tasks: Array.isArray(column.tasks) ? column.tasks.map(task => {
        let taskAssignedTo = [];
        
        try {
          if (task.assignedTo && Array.isArray(task.assignedTo)) {
            taskAssignedTo = task.assignedTo.map(userId => {
              if (userMap[userId]) {
                return {
                  userId: userId,
                  name: userMap[userId].name || 'Unknown User'
                };
              }
              return { userId: userId, name: 'Unknown User' };
            });
          }
        } catch (err) {
          console.error(`Error processing assignedTo for task ${task.taskId}:`, err);
          taskAssignedTo = [];
        }
        
        return {
          taskId: task.taskId,
          taskName: task.taskName || '',
          taskDueDate: task.dueDate || null,
          taskAssignedTo: taskAssignedTo,
          taskCompleted: !!task.completed,
          taskDescription: task.description || '',
          taskCreatedAt: task.createdAt,
          taskUpdatedAt: task.updatedAt,
        };
      }) : []
    }));
    res.json(result);
  } catch (error) {
    console.error("Error fetching column data:", error);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
};
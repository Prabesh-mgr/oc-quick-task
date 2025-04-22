import { BoardColumn, Task } from "../../models/index.js";

export const getBoardColumnsAndTasks = async (req, res) => {
  try {
    const boardId = req.params.boardId;
    const loggedInUserId = req.user.userId;

    if (!loggedInUserId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const columns = await BoardColumn.findAll({
      where: {
        boardId: boardId,
        userId: loggedInUserId ,
      },
      include: [
        {
          model: Task,
          as: 'tasks',
          attributes: ['taskId', 'taskName', 'description', 'dueDate', 'columnId', 'assignedTo', 'completed'],
          where: { userId: loggedInUserId },
          required: false 
        }
      ]
    });

    if (!columns || columns.length === 0) {
      return res.status(404).json({ error: 'No columns found for this board or user' });
    }

    const result = columns.map(column => ({
      columnId: column.columnId,
      columnName: column.columnName,
      tasks: column.tasks.map(task => ({
        taskId: task.taskId,
        taskName: task.taskName,
        taskDueDate: task.dueDate,
        taskAssignedTo: task.assignedTo,
        taskCompleted: task.completed,
      }))
    }));

    res.json(result);
  } catch (error) {
    console.error("Error fetching column data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

import { BoardColumn, Task } from "../../models/index.js";

export const getBoardColumnsAndTasks = async (req, res) => {
  try {
    const boardId = req.params.board_id;

    const columns = await BoardColumn.findAll({
      where: { board_id: boardId },
      include: [
        {
          model: Task,
          as: 'tasks', 
          attributes: ['task_id', 'task_name', 'description', 'due_date', 'column_id', 'assigned_to', 'completed'],
        }
      ]
    });

    if (!columns || columns.length === 0) {
      return res.status(404).json({ error: 'No columns found for this board' });
    }

    const result = columns.map(column => ({
      columnId: column.column_id,
      columnName: column.column_name,
      tasks: column.tasks.map(task => ({
        taskId: task.task_id,
        taskName: task.task_name,
        taskDescription: task.description,
        taskStatus: task.due_date,
        taskAssignedTo: task.assigned_to,
        taskPriority: task.completed,
      }))
    }));

    res.json(result);
  } catch (error) {
    console.error("Error fetching column data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

import Task from "../../models/Tasks.js";

export const deleteTasks = async (req, res) => {
  try {
    const { task_id } = req.params;

    if (!task_id) {
      return res.status(400).json({ message: "Task ID is required" });
    }

    const task = await Task.findByPk(task_id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await task.destroy();

    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    return res.status(500).json({
      message: "Failed to delete task",
      error: error.message,
    });
  }
};

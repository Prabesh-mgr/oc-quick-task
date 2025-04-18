import Task from "../../models/Tasks.js";

export const updateTasks = async (req, res) => {
    try{
        const { task_id } = req.params;
        const { task_name, description, due_date, column_id, assigned_to, completed } = req.body;

        if (!task_id) {
            return res.status(400).json({ message: "Task ID is required" });
        }

        const task = await Task.findByPk(task_id);
        if (task_name) {
            const existingTask = await Task.findOne({ where: { task_name } });
            if (existingTask) {
                return res.status(409).json({ message: "Task with this name already exists" });
            }
        }

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        await task.update({
            task_name,
            description,
            due_date,
            column_id,
            assigned_to,
            completed
        });

        return res.status(200).json({
            message: "Task updated successfully",
            task: task,
        });

    }catch(error) {
        console.error("Error updating task:", error);
        return res.status(500).json({
            message: "Failed to update task",
            error: error.message,
        });
    }
}
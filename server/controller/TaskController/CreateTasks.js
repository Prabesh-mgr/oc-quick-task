import Task from "../../models/Tasks.js";

export const createTasks = async (req, res) => {
    try {
        const { task_name, description, due_date, column_id, assigned_to, completed} = req.body;

        if (!column_id || !task_name || !description) {
            return res.status(400).json({ message: "All the fields are required" });
        }
        const newTask = await Task.create({ task_name, description, due_date, column_id, assigned_to, completed });

        return res.status(201).json({
            message: "Task created successfully",
            task: newTask,
        });
    } catch (error) {
        console.error("Error creating task:", error);
        return res.status(500).json({
            message: "Failed to create task",
            error: error.message,
        });
    }
}
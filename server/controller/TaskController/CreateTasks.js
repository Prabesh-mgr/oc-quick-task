import Task from "../../models/Tasks.js";

export const createTasks = async (req, res) => {
    try {
        const { taskName, description, dueDate, columnId, assignedTo, completed} = req.body;
        const userId = req.user.userId;

        if (!columnId || !taskName || !description) {
            return res.status(400).json({ message: "All the fields are required" });
        }
        const newTask = await Task.create({ taskName, description, dueDate, columnId, assignedTo, completed, userId });

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
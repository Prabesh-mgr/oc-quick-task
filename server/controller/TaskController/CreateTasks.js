import Task from "../../models/Tasks.js";

export const createTasks = async (req, res) => {
    try {
        const { taskName, description, dueDate, columnId, assignedTo, completed } = req.body;

        if (!req.user || !req.user.userId) {
            return res.status(401).json({ message: "User authentication required" });
        }
        
        const userId = req.user.userId;
        
        if (!taskName || !description || !columnId) {
            return res.status(400).json({ message: "Task Name, Description, and Column ID are required" });
        }

        const processedAssignedTo = Array.isArray(assignedTo) ? 
            (assignedTo.length > 0 ? assignedTo : null) : 
            (assignedTo ? [assignedTo] : null);
        
        console.log("Creating task with data:", {
            taskName,
            description,
            dueDate,
            columnId,
            assignedTo: processedAssignedTo,
            completed,
            userId
        });
        
        const newTask = await Task.create({
            taskName,
            description,
            dueDate: dueDate || null,
            columnId,
            assignedTo: processedAssignedTo,
            completed: completed || false,
            userId
        });
        
        return res.status(201).json({
            message: "Task created successfully",
            task: newTask,
        });
    } catch (error) {
        console.error("Error creating task:", error);
        console.error("Error details:", {
            name: error.name,
            message: error.message,
            stack: error.stack,
            original: error.original 
        });
        
        return res.status(500).json({
            message: "Failed to create task",
            error: error.message,
        });
    }
};
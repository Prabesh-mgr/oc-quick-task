import {Task, BoardColumn} from "../../models/index.js";
import { Op } from "sequelize";

export const updateTasks = async (req, res) => {
    try {
        const { taskId } = req.params;
        const userId = req.user.userId;

        if (!taskId) {
            return res.status(400).json({ message: "Task ID is required" });
        }

        const task = await Task.findByPk(taskId);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        if (task.userIid !== userId) {
            return res.status(403).json({ message: "You are not authorized to update this task" });
        }

        const { taskName, description, dueDate, columnId, assignedTo, completed } = req.body;
        if (taskName) {
            const existingTask = await Task.findOne({
                where: {
                    taskName,
                    taskId: { [Op.ne]: taskId }
                }
            });
            if (existingTask) {
                return res.status(409).json({ message: "Task with this name already exists" });
            }
        }

        if (columnId) {
            const columnExists = await BoardColumn.findByPk(columnId);
            if (!columnExists) {
                return res.status(400).json({ message: "Invalid column_id — column does not exist" });
            }
        }

        await task.update({
            taskName,
            description,
            dueDate,
            columnId,
            assignedTo,
            completed
        });

        return res.status(200).json({
            message: "Task updated successfully",
            task,
        });

    } catch (error) {
        console.error("Error updating task:", error);
        return res.status(500).json({
            message: "Failed to update task",
            error: error.message,
        });
    }
};

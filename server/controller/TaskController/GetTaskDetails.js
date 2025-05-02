import Task from "../../models/Tasks.js";
import Column from "../../models/Columns.js";

export const getTaskDetails = async (req, res) => {
    try {
        const { taskId } = req.params;
        
        const task = await Task.findOne({
            where: { taskId: taskId }
        });

        if (!task) {
            return res.status(404).json({ 
                message: "Task not found" 
            });
        }

        let columnInfo = null;
        if (task.columnId) {
            columnInfo = await Column.findOne({
                where: { columnId: task.columnId },
                attributes: ['columnId', 'columnName']
            });

            if (!columnInfo) {
                columnInfo = await Column.findOne({
                    where: { id: task.columnId },
                    attributes: ['id', 'columnName']
                });
            }
        }

        const responseData = {
            ...task.toJSON(),
            column: columnInfo ? {
                columnId: columnInfo.columnId || columnInfo.id,
                columnName: columnInfo.columnName
            } : null
        };

        return res.status(200).json(responseData);
    } catch (error) {
        console.error("Error retrieving task details:", error);
        return res.status(500).json({ 
            message: "Internal Server Error",
            error: error.message
        });
    }
};
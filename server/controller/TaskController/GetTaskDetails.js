import Task from "../../models/Tasks.js";

export const getTaskDetails = async (req, res) => {
    try {
        const { taskId } = req.params;

        const result = await Task.findOne({
            where: { taskId: taskId }
        });

        if (!result) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.json(result);
    } catch (error) {
        console.error("Error retrieving task:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

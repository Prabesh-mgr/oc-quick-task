import BoardColumn from "../../models/Columns.js";

export const createBoardColumn = async (req, res) => {
    try {
        const userId = req.user?.userId;
        const { boardId, columnName } = req.body;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized: User not authenticated" });
          }
    
        if (!boardId || !columnName) {
        return res.status(400).json({ message: "Board ID and column name are required" });
        }
        const existingColumn = await BoardColumn.findOne({
            where: { boardId, columnName, userId },
        })
        if (existingColumn) {
            return res.status(409).json({
                message: "Column with this name already exists for the board.",
            });
        }
    
        const newColumn = await BoardColumn.create({
        boardId,
        columnName,
        userId,
        });
    
        return res.status(201).json({
        message: "Board column created successfully",
        column: newColumn,
        });
    } catch (error) {
        console.error("Error creating board column:", error);
        return res.status(500).json({
        message: "Failed to create board column",
        error: error.message,
        });
    }
}
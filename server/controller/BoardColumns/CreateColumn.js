import BoardColumn from "../../models/Columns.js";

export const createBoardColumn = async (req, res) => {
    try {
        const { board_id, column_name } = req.body;
    
        if (!board_id || !column_name) {
        return res.status(400).json({ message: "Board ID and column name are required" });
        }
    
        const newColumn = await BoardColumn.create({
        board_id,
        column_name,
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
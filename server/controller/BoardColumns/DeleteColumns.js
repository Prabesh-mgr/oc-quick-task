import BoardColumn from "../../models/Columns.js";
import Board from "../../models/Boards.js";
export const deleteBoardColumn = async (req, res) => {
    try {
        const columnIdToDelete = req.params.column_id;
        const userId = req.user.userId;

        const column = await BoardColumn.findOne({
            where: { column_id: columnIdToDelete },
        });

        if (!column) {
            return res.status(404).json({ error: "Column not found" });
        }

        const board = await Board.findOne({
            where: {
                board_id: column.board_id,
                user_id: userId,
            },
        });

        if (!board) {
            return res.status(403).json({ error: "Not authorized to delete this column" });
        }
        await column.destroy();

        return res.status(200).json({
            message: "Column deleted successfully",
            column,
        });

    } catch (error) {
        console.error("Error deleting board column:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

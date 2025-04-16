import Board from "../../models/Boards.js";

export const deleteBoard = async (req, res) => {
    try{
        const boardIdToDelete = parseInt(req.params.board_id);
        const board = await Board.findByPk(boardIdToDelete);
        if (!board) {
            return res.status(404).json({ error: 'Board not found' });
        }
        await board.destroy();
        res.status(200).json({ 
            message: 'Board deleted successfully',
            board: board,
         });
    }catch(error){
        console.error("Error deleting board:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
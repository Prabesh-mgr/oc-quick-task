import Board from "../../models/Boards.js";

export const deleteBoard = async (req, res) => {
  try {
    const boardIdToDelete = req.params.boardId; 
    const userId = req.user.userId; 

    const board = await Board.findOne({
      where: {
        boardId: boardIdToDelete,
        userId: userId,
      },
    });

    if (!board) {
      return res.status(404).json({ error: "Board not found or not authorized" });
    }

    await board.destroy();

    return res.status(200).json({
      message: "Board deleted successfully",
      board: board,
    });
  } catch (error) {
    console.error("Error deleting board:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

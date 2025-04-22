import Board from "../../models/Boards.js";

export const updateBoard = async (req, res) => {
  try {
    const boardIdToUpdate = req.params.boardId;
    const { boardName } = req.body;
    const userId = req.user.userId; 

    if (!boardName) {
      return res.status(400).json({ error: "Board name is required" });
    }

    const board = await Board.findOne({
      where: {
        boardId: boardIdToUpdate,
        userId: userId,
      },
    });

    if (!board) {
      return res.status(404).json({ error: "Board not found or not authorized" });
    }

    if (board.boardName === boardName) {
      return res.status(400).json({
        error: "New board name must be different from the current name",
      });
    }

    await board.update({ boardName });

    return res.status(200).json({
      message: "Board updated successfully",
      board,
    });
  } catch (error) {
    console.error("Error updating board:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

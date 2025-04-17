import Board from "../../models/Boards.js";

export const updateBoard = async (req, res) => {
  try {
    const boardIdToUpdate = req.params.board_id;
    const { board_name } = req.body;
    const userId = req.user.userId; 

    if (!board_name) {
      return res.status(400).json({ error: "Board name is required" });
    }

    const board = await Board.findOne({
      where: {
        board_id: boardIdToUpdate,
        user_id: userId,
      },
    });

    if (!board) {
      return res.status(404).json({ error: "Board not found or not authorized" });
    }

    if (board.board_name === board_name) {
      return res.status(400).json({
        error: "New board name must be different from the current name",
      });
    }

    await board.update({ board_name });

    return res.status(200).json({
      message: "Board updated successfully",
      board,
    });
  } catch (error) {
    console.error("Error updating board:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

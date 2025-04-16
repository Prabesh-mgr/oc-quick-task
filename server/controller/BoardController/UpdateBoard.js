import Board from "../../models/Boards.js";

export const updateBoard = async (req, res) => {
  try {
    const boardIdToUpdate = parseInt(req.params.board_id);
    const { board_name } = req.body;

    const board = await Board.findByPk(boardIdToUpdate);
    if (!board) {
      return res.status(404).json({ error: "Board not found" });
    }

    if (board.board_name === board_name) {
      return res.status(400).json({ error: "Name of the new board must be different from the current board name" });
    }

    await board.update({ board_name });

    res.status(200).json({
      message: "Board updated successfully",
      board,
    });
  } catch (error) {
    console.error("Error updating board:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

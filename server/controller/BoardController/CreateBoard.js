import Board from "../../models/Boards.js";

export const createBoard = async (req, res) => {
  try {
    const { user_id, board_name } = req.body;

    if (!user_id || !board_name) {
      return res.status(400).json({ message: "user_id and board_name are required" });
    }
    const existingBoard = await Board.findOne({
      where: {
        user_id,
        board_name
      }
    });

    if (existingBoard) {
      return res.status(409).json({ message: "Board with this name already exists for the user." });
    }
    const newBoard = await Board.create({ user_id, board_name });

    return res.status(201).json({
      message: "Board created successfully",
      board: newBoard,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create board",
      error: error.message,
    });
  }
};

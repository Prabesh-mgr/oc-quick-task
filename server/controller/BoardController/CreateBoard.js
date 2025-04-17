import Board from "../../models/Boards.js";

export const createBoard = async (req, res) => {
  try {
    const user_id = req.user.userId;
    const { board_name } = req.body;

    if (!board_name) {
      return res.status(400).json({ message: "Board name is required" });
    }

    const existingBoard = await Board.findOne({
      where: {
        user_id,
        board_name,
      },
    });

    if (existingBoard) {
      return res.status(409).json({
        message: "Board with this name already exists for the user.",
      });
    }

    const newBoard = await Board.create({
      user_id,
      board_name,
    });

    return res.status(201).json({
      message: "Board created successfully",
      board: newBoard,
    });
  } catch (error) {
    console.error("Error creating board:", error);
    return res.status(500).json({
      message: "Failed to create board",
      error: error.message,
    });
  }
};

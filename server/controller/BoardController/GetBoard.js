import Board from "../../models/Boards.js";

export const getBoardByUserId = async (req, res) => {
  try {
    const userId = req.user.userId;

    const boards = await Board.findAll({
      where: { userId: userId },
    });

    res.status(200).json(boards);
    
  } catch (error) {
    console.error("Error fetching board data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
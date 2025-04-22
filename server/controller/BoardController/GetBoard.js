import Board from "../../models/Boards.js";

export const getBoardByUserId = async (req, res) => {
  try {

    const userId = req.user.userId;

    const boards = await Board.findAll({
      where: { userId: userId },
    });

    if (boards.length === 0) {
      return res.status(404).json({ error: "No boards found for this user" });
    }
   res.status(200).json({ 
        message: `Boards fetched successfully of userid: ${userId}`,
        board: boards});
  } catch (error) {
    console.error("Error fetching board data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

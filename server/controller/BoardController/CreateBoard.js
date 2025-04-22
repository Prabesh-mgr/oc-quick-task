import Board from "../../models/Boards.js";
import BoardColumn from "../../models/Columns.js";

export const createBoard = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { boardName } = req.body;

    if (!boardName) {
      return res.status(400).json({ message: "Board name is required" });
    }

    const existingBoard = await Board.findOne({
      where: { userId, boardName },
    });

    if (existingBoard) {
      return res.status(409).json({
        message: "Board with this name already exists for the user.",
      });
    }
    const newBoard = await Board.create({
      userId,
      boardName,
    });

    const defaultColumns = [
      { columnName: "To Do", columnOrder: 1 },
      { columnName: "On Progress", columnOrder: 2 },
      { columnName: "Completed", columnOrder: 3 },
    ];

    const columnsToCreate = defaultColumns.map((col) => ({
      ...col,
      boardId: newBoard.boardId, 
      userId 
    }));

    await BoardColumn.bulkCreate(columnsToCreate);

    return res.status(201).json({
      message: "Board and default columns created successfully",
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

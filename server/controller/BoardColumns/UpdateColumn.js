import BoardColumn from "../../models/Columns.js";

export const updateBoardColumn = async (req, res) => {
  try {
    const columnId = req.params.columnId; 
    const { columnName } = req.body;

    const column = await BoardColumn.findByPk(columnId);

    if (!column) {
      return res.status(404).json({ error: 'Column not found' });
    }

    if (column.columnName === columnName) {
      return res.status(400).json({ error: 'New column name must be different from the current one' });
    }

    column.columnName = columnName;
    await column.save();

    res.status(200).json({
      message: 'Column updated successfully',
      column: column,
    });
  } catch (error) {
    console.error("Error updating board column:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

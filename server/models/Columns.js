import { DataTypes } from "sequelize";
import sequelize from "../service/connection.js";

const BoardColumn = sequelize.define("boardColumn", {
  column_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  board_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "boards", 
      key: "board_id",
    },
    onDelete: "CASCADE", 
  },
  column_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  column_order: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {
  tableName: "boardColumns",
  timestamps: true,
});

export default BoardColumn;

import { DataTypes } from "sequelize";
import sequelize from "../service/connection.js";
import { v4 as uuidv4 } from "uuid";

const BoardColumn = sequelize.define("BoardColumn", {
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
  timestamps: true,
});

export default BoardColumn;

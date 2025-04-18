import { DataTypes } from "sequelize";
import sequelize from "../service/connection.js";

const Board = sequelize.define("board", {
  board_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "users",
      key: "user_id"
    },
    onDelete: "CASCADE"
  },
  board_name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
}, {
  timestamps: true, 
});

export default Board;

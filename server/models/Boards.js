import { DataTypes } from "sequelize";
import sequelize from "../service/connection.js";

const Board = sequelize.define("board", {
  boardId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "users",
      key: "userId"
    },
    onDelete: "CASCADE"
  },
  boardName: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
}, {
  timestamps: true, 
});

export default Board;

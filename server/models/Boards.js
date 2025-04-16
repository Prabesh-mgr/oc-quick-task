import { DataTypes } from "sequelize";
import sequelize from "../service/connection.js";

const Board = sequelize.define("Board", {
  board_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
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
    tableName: "boards",
    timestamps: true,
});

export default Board;

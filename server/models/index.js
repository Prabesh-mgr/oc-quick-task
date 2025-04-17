import sequelize from "../service/connection.js"; 
import User from "./UserModel.js";
import Board from "./BoardModel.js";
import BoardColumn from "./Columns.js"; 


User.hasMany(Board, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});
Board.belongsTo(User, {
  foreignKey: "user_id",
});

Board.hasMany(BoardColumn, {
  foreignKey: "board_id",
  onDelete: "CASCADE",
});
BoardColumn.belongsTo(Board, {
  foreignKey: "board_id",
});

export {
  sequelize,
  User,
  Board,
  BoardColumn,
};

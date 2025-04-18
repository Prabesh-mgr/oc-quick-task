import sequelize from "../service/connection.js";
import Board from "./Boards.js";
import BoardColumn from "./Columns.js";
import User from "./Users.js";
import Task from "./Tasks.js";


User.hasMany(Board, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});
Board.belongsTo(User, { foreignKey: "user_id" });

Board.hasMany(BoardColumn, {
  foreignKey: "board_id",
  onDelete: "CASCADE",
});
BoardColumn.belongsTo(Board, { foreignKey: "board_id" });

BoardColumn.hasMany(Task, {
  foreignKey: "column_id",
  onDelete: "CASCADE",
  as: 'tasks',
});
Task.belongsTo(BoardColumn, {
  foreignKey: "column_id",
  onDelete: "CASCADE",
});

export {
  sequelize,
  User,
  Board,
  BoardColumn,
  Task,
};

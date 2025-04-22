import sequelize from "../service/connection.js";
import Board from "./Boards.js";
import BoardColumn from "./Columns.js";
import User from "./Users.js";
import Task from "./Tasks.js";


User.hasMany(Board, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});
Board.belongsTo(User, { foreignKey: "userId" });

Board.hasMany(BoardColumn, {
  foreignKey: "boardId",
  onDelete: "CASCADE",
});
BoardColumn.belongsTo(Board, { foreignKey: "boardId" });
User.hasMany(BoardColumn, { foreignKey: "userId", onDelete: "CASCADE" });
BoardColumn.belongsTo(User, { foreignKey: "userId" });

Board.hasMany(Task, { foreignKey: "boardId", onDelete: "CASCADE" });
Task.belongsTo(Board, { foreignKey: "boardId" });

User.hasMany(Task, { foreignKey: "userId", onDelete: "CASCADE" });
Task.belongsTo(User, { foreignKey: "userId" });

BoardColumn.hasMany(Task, {
  foreignKey: "columnId",
  onDelete: "CASCADE",
  as: 'tasks',
});
Task.belongsTo(BoardColumn, {
  foreignKey: "columnId",
  onDelete: "CASCADE",
});

export {
  sequelize,
  User,
  Board,
  BoardColumn,
  Task,
};

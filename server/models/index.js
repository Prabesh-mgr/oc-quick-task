import User from "./UserModel.js";
import Board from "./BoardModel.js";

User.hasMany(Board, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Board.belongsTo(User, {
  foreignKey: "user_id",
});

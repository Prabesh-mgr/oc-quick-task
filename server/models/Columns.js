import { DataTypes } from "sequelize";
import sequelize from "../service/connection.js";

const BoardColumn = sequelize.define("boardColumn", {
  columnId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  boardId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "boards", 
      key: "boardId",
    },
    onDelete: "CASCADE", 
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,

  },
  columnName: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  columnOrder: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {
  tableName: "boardColumns",
  timestamps: true,
});

export default BoardColumn;

import { DataTypes } from 'sequelize';
import sequelize from '../service/connection.js';

const Task = sequelize.define('task', {
    taskId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    taskName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    dueDate: {
        type: DataTypes.DATEONLY,
    },
    columnId: {
        type: DataTypes.UUID,
        allowNull: true,
    },
    assignedTo: {
        type: DataTypes.ARRAY(DataTypes.UUID),
        allowNull: true,
    },
    completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    timestamps: true,
});

export default Task;
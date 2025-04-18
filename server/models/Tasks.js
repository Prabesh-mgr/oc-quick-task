import { DataTypes } from 'sequelize';
import sequelize from '../service/connection.js';

const Task = sequelize.define('task', {
    task_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    task_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    due_date: {
        type: DataTypes.DATEONLY,
    },
    column_id: {
        type: DataTypes.UUID,
        allowNull: true,
    },
    assigned_to: {
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

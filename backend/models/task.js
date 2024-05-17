const { DataTypes } = require('sequelize');
const sequelize = require('../store/database.js');

const Task = sequelize.define('Task', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    state: {
        type: DataTypes.INTEGER,
        allowNull: false,
        default: 0
    }
});

module.exports = Task;

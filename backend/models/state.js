const { DataTypes } = require('sequelize');
const sequelize = require('../store/database.js');

const State = sequelize.define('State', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

module.exports = State;

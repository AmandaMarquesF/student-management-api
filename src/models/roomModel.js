
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Room = sequelize.define('Room', {
    number: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Room;

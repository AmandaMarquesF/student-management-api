const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Student = sequelize.define('Student', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    first_semester_grade: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    second_semester_grade: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    teacher_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Teachers',
            key: 'id'
        }
    },
    room_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Rooms',
            key: 'id'
        }
    }
});

module.exports = Student;

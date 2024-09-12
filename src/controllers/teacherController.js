// src/controllers/teacherController.js

const Teacher = require('../models/teacherModel');

exports.createTeacher = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: 'Teacher name is required' });
        }
        const newTeacher = await Teacher.create({ name });
        res.status(201).json(newTeacher);
    } catch (error) {
        console.error('Error creating teacher:', error);
        res.status(500).json({ message: 'Failed to create teacher', details: error.message });
    }
};

exports.getAllTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.findAll();
        res.status(200).json(teachers);
    } catch (error) {
        console.error('Error fetching teachers:', error);
        res.status(500).json({ message: 'Failed to fetch teachers', details: error.message });
    }
};

exports.getTeacherById = async (req, res) => {
    try {
        const { id } = req.params;
        const teacher = await Teacher.findByPk(id);
        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }
        res.status(200).json(teacher);
    } catch (error) {
        console.error('Error fetching teacher:', error);
        res.status(500).json({ message: 'Failed to fetch teacher', details: error.message });
    }
};

exports.updateTeacher = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const teacher = await Teacher.findByPk(id);
        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }
        teacher.name = name || teacher.name;
        await teacher.save();
        res.status(200).json(teacher);
    } catch (error) {
        console.error('Error updating teacher:', error);
        res.status(500).json({ message: 'Failed to update teacher', details: error.message });
    }
};

exports.deleteTeacher = async (req, res) => {
    try {
        const { id } = req.params;
        const teacher = await Teacher.findByPk(id);
        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }
        await teacher.destroy();
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting teacher:', error);
        res.status(500).json({ message: 'Failed to delete teacher', details: error.message });
    }
};

const Student = require('../models/studentModel');
const Teacher = require('../models/teacherModel');
const Room = require('../models/roomModel');

// Criar um novo aluno
exports.createStudent = async (req, res) => {
    try {
        const student = await Student.create(req.body);
        res.status(201).json(student);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Obter todos os alunos com informações relacionadas
// exports.getAllStudents = async (req, res) => {
//     try {
//         console.log('Fetching all students...');
//         const students = await Student.findAll({
//             include: [
//                 { model: Teacher, as: 'teacher' },
//                 { model: Room, as: 'room' }
//             ]
//         });
//         console.log('Students fetched:', students);
//         res.status(200).json(students);
//     } catch (error) {
//         console.error('Error fetching students:', error.message || error);
//         res.status(500).json({ error: 'Failed to fetch students' });
//     }
// };

exports.getAllStudents = async (req, res) => {
    try {
        const students = await Student.findAll();
        res.status(200).json(students);
    } catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).json({ message: 'Failed to fetch students', details: error.message });
    }
};

// Obter um aluno por ID com informações relacionadas
exports.getStudentById = async (req, res) => {
    try {
        const studentId = req.params.id;

        // Validação do ID
        if (!studentId || isNaN(studentId)) {
            console.log('Invalid student ID:', studentId);
            return res.status(400).json({ error: 'Invalid student ID' });
        }

        console.log(`Fetching student with ID: ${studentId}`);
        const student = await Student.findByPk(studentId);
        
        if (!student) {
            console.log('Student not found:', studentId);
            return res.status(404).json({ error: 'Student not found' });
        }
        
        console.log('Student fetched:', student);
        res.status(200).json(student);
    } catch (error) {
        console.error('Error fetching student:', error.message || error);
        res.status(500).json({ error: 'Failed to fetch student' });
    }
};
// Atualizar um aluno por ID
exports.updateStudent = async (req, res) => {
    try {
        const student = await Student.findByPk(req.params.id);
        if (!student) return res.status(404).json({ error: 'Student not found' });
        await student.update(req.body);
        res.status(200).json(student);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Deletar um aluno por ID
exports.deleteStudent = async (req, res) => {
    try {
        const student = await Student.findByPk(req.params.id);
        if (!student) return res.status(404).json({ error: 'Student not found' });
        await student.destroy();
        res.status(204).end();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

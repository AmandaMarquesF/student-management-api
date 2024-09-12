const Room = require('../models/roomModel');

// Criar uma nova sala
exports.createRoom = async (req, res) => {
    try {
        const room = await Room.create(req.body);
        res.status(201).json(room);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Obter todas as salas
exports.getAllRooms = async (req, res) => {
    try {
        const rooms = await Room.findAll();
        res.status(200).json(rooms);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Obter uma sala por ID
exports.getRoomById = async (req, res) => {
    try {
        const room = await Room.findByPk(req.params.id);
        if (!room) return res.status(404).json({ error: 'Room not found' });
        res.status(200).json(room);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Atualizar uma sala por ID
exports.updateRoom = async (req, res) => {
    try {
        const room = await Room.findByPk(req.params.id);
        if (!room) return res.status(404).json({ error: 'Room not found' });
        await room.update(req.body);
        res.status(200).json(room);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Deletar uma sala por ID
exports.deleteRoom = async (req, res) => {
    try {
        const room = await Room.findByPk(req.params.id);
        if (!room) return res.status(404).json({ error: 'Room not found' });
        await room.destroy();
        res.status(204).end();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

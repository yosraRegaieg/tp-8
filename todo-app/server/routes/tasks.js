const express = require('express');
const router = express.Router();
const Task = require('../models/Task');


// GET /tasks
router.get('/', async (req, res) => {
try {
const tasks = await Task.find().sort({ createdAt: -1 });
res.json(tasks);
} catch (err) {
res.status(500).json({ error: err.message });
}
});


// POST /tasks
router.post('/', async (req, res) => {
try {
const { title } = req.body;
const task = new Task({ title });
await task.save();
res.status(201).json(task);
} catch (err) {
res.status(400).json({ error: err.message });
}
});


// DELETE /tasks/:id
router.delete('/:id', async (req, res) => {
try {
const { id } = req.params;
await Task.findByIdAndDelete(id);
res.json({ message: 'Tâche supprimée' });
} catch (err) {
res.status(400).json({ error: err.message });
}
});


// PATCH /tasks/:id/toggle -> toggle completed
router.patch('/:id/toggle', async (req, res) => {
try {
const { id } = req.params;
const task = await Task.findById(id);
task.completed = !task.completed;
await task.save();
res.json(task);
} catch (err) {
res.status(400).json({ error: err.message });
}
});


module.exports = router;
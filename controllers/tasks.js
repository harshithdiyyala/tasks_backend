const Task = require('../models/tasks');

exports.createTask = async (req, res) => {
    const { title, description, status } = req.body;
    const userId = req.user.userId;
    
    try {
        const newTask = new Task({
            title,
            description,
            status,
            assignee_id:userId,
            
        });

        await newTask.save();
        res.status(201).send({ message: 'Task created successfully.' });
    } catch (error) {
        res.status(500).send({ message: 'Error creating task.' });
    }
};

exports.getTasks = async (req, res) => {
    const userId = req.user.userId
    try {
        const tasks = await Task.find({assignee_id : userId},{assignee_id :0, createdAt : 0, updatedAt :0,__v: 0});
        
        res.status(200).send(tasks);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching tasks.' });
    }
};

// Additional methods for update and delete...
exports.getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).send({ message: 'Task not found.' });
        }
        res.status(200).send(task);
    } catch (error) {
        res.status(500).send({ message: 'Error retrieving task.' });
    }
};

exports.updateTaskById = async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTask) {
            return res.status(404).send({ message: 'Task not found.' });
        }
        res.status(200).send(updatedTask);
    } catch (error) {
        res.status(500).send({ message: 'Error updating task.' });
    }
};

exports.deleteTaskById = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).send({ message: 'Task not found.' });
        }
        res.status(200).send({ message: 'Task deleted successfully.' });
    } catch (error) {
        res.status(500).send({ message: 'Error deleting task.' });
    }
};

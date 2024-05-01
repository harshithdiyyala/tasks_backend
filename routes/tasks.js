const express = require('express');
const router = express.Router();
const taskController = require('../controllers/tasks');

const authenticateToken = require('../middlewares/middleware');

// Apply the middleware to all task routes
router.use(authenticateToken);


router.post('/', taskController.createTask);
router.get('/', taskController.getTasks);

// Additional routes for specific task by ID...
router.get('/:id', taskController.getTaskById);
router.put('/:id', taskController.updateTaskById);
router.delete('/:id', taskController.deleteTaskById);


module.exports = router;

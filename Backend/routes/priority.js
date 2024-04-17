const express = require('express');
const { getPriorityItems, createPriorityItem } = require('../controllers/priorityController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// Require authentication for all priority routes
router.use(requireAuth);

// Route to get all priority items
router.get('/', getPriorityItems);

// Route to create a new priority item
router.post('/', createPriorityItem);

module.exports = router;

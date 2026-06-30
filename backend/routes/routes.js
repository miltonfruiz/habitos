const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');
const authenticate = require('../middleware/auth');

router.get('/api/habits', authenticate, controller.list);
router.post('/api/habits', authenticate, controller.create);
router.get('/api/habits/:id', authenticate, controller.getById);
router.put('/api/habits/:id', authenticate, controller.update);
router.delete('/api/habits/:id', authenticate, controller.remove);

module.exports = router;
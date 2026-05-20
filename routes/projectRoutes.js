const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const auth = require('../middleware/auth');

router.get('/', projectController.index);
router.get('/:id', projectController.show);
router.post('/', auth, projectController.store);
router.put('/:id', auth, projectController.update);
router.delete('/:id', auth, projectController.destroy);

module.exports = router;
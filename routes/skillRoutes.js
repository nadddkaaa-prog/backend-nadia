const express = require('express');
const router = express.Router();
const skillController = require('../controllers/skillController');
const auth = require('../middleware/auth');

router.get('/', skillController.index);
router.get('/:id', skillController.show);
router.post('/', auth, skillController.store);
router.put('/:id', auth, skillController.update);
router.delete('/:id', auth, skillController.destroy);

module.exports = router;
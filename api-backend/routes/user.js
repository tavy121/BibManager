const express = require('express');
const router = express.Router();
const check = require('../middleware/check');

const UserController = require('../controllers/user');

router.post('/signup', UserController.signup);

router.post('/login', UserController.login);

router.delete('/:userId', check, UserController.delete_by_id);

module.exports = router;
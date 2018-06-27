const express = require('express');
const router = express.Router();

const { validateUser } = require('../models/User');

const validateRequest = require('../middleware/validateRequest');
const catchErrros = require('../middleware/catchErrors');

const { registerUser } = require('../controllers/userController');

router.post('/', validateRequest(validateUser), catchErrros(registerUser));

module.exports = router;

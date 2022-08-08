const express = require('express');

const router = express.Router();
const handleAuth = require('../controllers/loginController');

router.post('', handleAuth);

module.exports = router;

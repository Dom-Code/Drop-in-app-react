const express = require('express');

const router = express.Router();
const handleLogOut = require('../controllers/logoutController');

router.post('', handleLogOut);

module.exports = router;

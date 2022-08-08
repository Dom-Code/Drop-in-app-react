const express = require('express');

const router = express.Router();
const handleReg = require('../controllers/registerController');

router.post('', handleReg);

module.exports = router;

const express = require('express');

const router = express.Router();
const handleReg = require('../controllers/partialProvidersController');

router.post('', handleReg);

module.exports = router;

const express = require('express');

const router = express.Router();
const getFullProviders = require('../controllers/fullProvidersController');

router.get('', getFullProviders);

module.exports = router;

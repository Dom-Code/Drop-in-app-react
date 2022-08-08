const express = require('express');

const router = express.Router();
const partialProviders = require('../controllers/partialProvidersController');

router.get('', partialProviders);

module.exports = router;

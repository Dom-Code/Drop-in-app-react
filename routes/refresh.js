const express = require('express');

const router = express.Router();
const handleRefreshToken = require('../controllers/handleRefreshController');

router.get('', handleRefreshToken);

module.exports = router;

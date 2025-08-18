const express = require('express');
const router = express.Router();

const serviceController = require('../controllers/matching.controller');

// Existing route: get services by provider
router.get('/provider/:provider_id', serviceController.getServicesByProvider);


router.get('/filter', serviceController.getServicesByFilters);

module.exports = router; // ✅ This is critical

const express = require('express');
const router = express.Router();
const JobRequestController = require('../controllers/jobRequest.controller');

// POST route
router.post('/create_request', JobRequestController.createRequest);

// GET route by provider_id
router.get('/provider/:provider_id', JobRequestController.getRequestsByProvider);

router.put('/:id/status', JobRequestController.updateStatus);

module.exports = router;

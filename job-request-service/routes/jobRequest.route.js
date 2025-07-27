const express = require('express');
const router = express.Router();
const JobRequestController = require('../controllers/jobRequest.controller');

router.post('/create_request', JobRequestController.createRequest);

module.exports = router;

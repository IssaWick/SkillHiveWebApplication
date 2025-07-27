const Model = require('../models/jobRequest.model');


exports.createRequest = (req, res) => {
  console.log("✅ /create_request route hit!");
  console.log("Request body:", req.body);

  const requestData = req.body;

  Model.createRequest(requestData, (err, result) => {
    if (err) {
      console.error('❌ Error inserting job request:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    res.status(201).json({
      message: 'Job request created successfully',
      data: result
    });
  });
};


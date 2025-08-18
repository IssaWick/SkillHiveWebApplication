const ServiceModel = require('../models/matching.model');
const axios = require('axios');

exports.getServicesByProvider = (req, res) => {
  const providerId = req.params.provider_id;

  ServiceModel.getServicesByProvider(providerId, (err, results) => {
    if (err) {
      console.error('❌ Error fetching services:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    // ✅ Spread the object so provider + services are visible
    res.status(200).json({
      message: '✅ Services fetched successfully',
      ...results
    });
  });
};
 exports.getServicesByFilters = (req, res) => {
  const { district, city, service_type } = req.query; 
  

  ServiceModel.getServicesByFilters(district, city, service_type, (err, results) => {
    if (err) return res.status(500).json({ message: 'Internal server error' });

    res.status(200).json({
      message: '✅ Services fetched successfully',
      services: results
    });
  });
};

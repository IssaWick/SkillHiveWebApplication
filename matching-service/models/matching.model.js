const db = require('../config/db'); 
const axios = require('axios');

// Fetch services with provider details
exports.getServicesByProvider = async (providerId, callback) => {
  try {
    // First: get services from this DB
    const query = `
      SELECT service_id, service_name, service_type, description
      FROM services 
      WHERE provider_id = ?
    `;

    db.query(query, [providerId], async (err, results) => {
      if (err) {
        console.error('❌ MySQL Error:', err);
        return callback(err, null);
      }

      try {
        // Second: call auth service for provider details
        const providerResponse = await axios.get(`http://localhost:3001/api/user-info/${providerId}`);
        
        // Combine results
        const responseData = {
          provider: providerResponse.data,  // provider details from auth service
          services: results                 // service details from this DB
        };

        callback(null, responseData);

      } catch (apiErr) {
        console.error('❌ Auth Service Error:', apiErr.message);
        callback(apiErr, null);
      }
    });

  } catch (error) {
    console.error('❌ Unexpected Error:', error.message);
    callback(error, null);
  }
};



exports.getServicesByFilters = (district, city, serviceType, callback) => {
  let query = `SELECT service_id, service_name, service_type, description, district, city, provider_id FROM services`;
  let conditions = [];
  let values = [];

  if (district) {
    conditions.push("district = ?");
    values.push(district);
  }
  if (city) {
    conditions.push("city = ?");
    values.push(city);
  }
  if (serviceType) {
    conditions.push("service_type = ?");
    values.push(serviceType);
  }

  if (conditions.length > 0) {
    query += " WHERE " + conditions.join(" AND ");
  }

  db.query(query, values, (err, results) => {
    if (err) return callback(err, null);
    callback(null, results);
  });
};

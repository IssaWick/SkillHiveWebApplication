const db = require('../config/db');

exports.createRequest = (data, callback) => {
  const sql = `
    INSERT INTO job_requests 
    (customer_id, provider_id, service_id, requested_time_from, requested_time_to, notes) 
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      data.customer_id,
      data.provider_id,
      data.service_id,
      data.requested_time_from,
      data.requested_time_to,
      data.notes
    ],
    callback
  );
};

exports.getRequestsByProvider = (providerId, callback) => {
  const sql = 'SELECT * FROM job_requests WHERE provider_id = ?';
  db.query(sql, [providerId], callback);
};

exports.updateRequestStatus = (requestId, status, callback) => {
  const sql = 'UPDATE job_requests SET status = ? WHERE id = ?';
  db.query(sql, [status, requestId], callback);
};
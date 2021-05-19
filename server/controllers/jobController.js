const db = require('../models/jobModels.js');

const jobController = {};

jobController.getJobs = (req, res, next) => {
  co
  db.query('SELECT * FROM job_posting')
    .then(((results) => {
      console.log(results);
      next();
    }
    ));
};

module.exports = jobController;

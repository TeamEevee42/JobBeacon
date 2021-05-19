const db = require('../models/jobModels.js');

const jobController = {};

jobController.getJobs = (req, res, next) => {
  db.query('SELECT * FROM job_listing')
    .then(((results) => {
      res.locals.jobs = results
      next();
    }
    ));
};

module.exports = jobController;

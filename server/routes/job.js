const express = require('express');

const jobController = require('../controllers/jobController');

const router = express.Router();

// @desc get all jobs
// @URL GET /job
router.get('/',
  jobController.getJobs,
  jobController.getTech,
  (req, res) => res.status(200).json(res.locals)
);

router.post('/',
  jobController.postJob,
  jobController.getJobs,
  jobController.getTech,
  (req, res) => res.status(200).json(res.locals)
);

module.exports = router;

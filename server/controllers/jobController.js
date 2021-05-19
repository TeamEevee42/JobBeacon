const db = require('../models/jobModels.js');

const jobController = {};

jobController.getJobs = (req, res, next) => {
  // Store filters from request

  const { filters } = req.body;
  console.log(`City is ${JSON.stringify(filters.city)}`);
  console.log(`Filters looks like this: ${JSON.stringify(filters)}`);

  const baseQuery = `SELECT commitment.description AS commitment, jobs.created_on, jobs.description, seniority.description AS seniority,
  jobs.modified_on, jobs.posting_date, remote.description AS workLocation, jobs.title, jobs.url,
  city.city_name AS city, jobs.salary
  FROM job_listing AS jobs
  INNER JOIN commitment
  ON jobs.commitment_id = commitment._id
  INNER JOIN seniority
  ON jobs.seniority_id = seniority._id
  INNER JOIN remote
  ON jobs.remote_id = remote._id
  INNER JOIN city
  ON jobs.city_id = city._id`;

  let condition = '';

  if (filters) {
    const filterArr = Object.keys(filters);
    if (filterArr.length > 0) {
      filterArr.forEach((prop) => {
        condition.length < 1 ? condition += ' WHERE ' : condition += ' AND ';
        // console.log(`Condition is ${condition}`);
        switch (prop) {
          case ('city'):
            condition += `city.city_name = '${filters[prop]}'`;
            break;
          case ('commitment'):
            condition += `commitment.description = '${filters[prop]}'`;
            break;
          case ('seniority'):
            condition += `seniority.description = '${filters[prop]}'`;
            break;
          case ('worklocation'):
            condition += `remote.description = '${filters[prop]}'`;
            break;
          case ('tech'):
            condition += `tech.description = '${filters[prop]}'`;
            break;
          default:
            break;
        }
      });
      console.log(`The query condition is currently ${condition}`);
    }
  }

  const query = `${baseQuery + condition};`;
  console.log(`The SQL query is currently ${query}`);

  db.query(query)
    .then(((results) => {
      res.locals.jobs = results;
      return next();
    }))
    .catch((err) => next(err));
};

module.exports = jobController;

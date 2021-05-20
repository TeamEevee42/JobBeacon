const db = require('../models/jobModels.js');

const jobController = {};

// Get Jobs
jobController.getJobs = (req, res, next) => {
  // Store filters from request
  const { filters } = req.body;

  const baseQuery = `SELECT jobs._id as _id, commitment.description AS commitment, jobs.created_on, jobs.description, seniority.description AS seniority,
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
    }
  }

  const query = `${baseQuery + condition};`;

  db.query(query)
    // .then(data => data.stringify())
    .then((results) => {
      const jobs = results["rows"];

      // Store ids of jobs listings in an array
      const jobIds = [];
      jobs.forEach((el) => jobIds.push(el._id))
      console.log(jobIds)

      res.locals.jobs = jobs;
      res.locals.jobIds = jobIds
      return next();
    })
    .catch((err) => next(err));
};

// Get Techstack for jobs stored in jobIds
jobController.getTech = (req, res, next) => {

  const baseQuery = `SELECT j._id, tech.name 
  FROM job_listing j
  INNER JOIN job_tech jt 
  ON j._id = jt.job_id
  INNER JOIN tech
  ON jt.tech_id = tech._id`

  // Conditions 
  let condition = '';
  const jobIds = res.locals.jobIds;

  jobIds.forEach(el => {
    condition.length < 1? condition += ' WHERE ': condition += ' OR ';
    condition += `j._id = ${el}`
  })

  const query = `${baseQuery + condition};`;

  db.query(query)
  .then(results => {
    res.locals.techStack = results['rows']
    next()
  })
}

// Post Job
jobController.postJob = (req, res, next) => {
  const {commitment, description, seniority, postingDate, workLocation, title, url, city, salary} = req.body;

  // Posting new job. Search specific tables to find job ids when posting. 
  // baseQuery = `
  // INSERT INTO job_listing (commitment_id, created_on, seniority_id, remote_id, title, url, salary, city_id, description, posting_date)
  // VALUES 
  //   (
  //     (SELECT commitment._id FROM commitment WHERE commitment.description = '${commitment}'), 
  //     '2021-08-12', 
  //     (SELECT seniority._id FROM seniority WHERE seniority.description = '${seniority}'), 
  //     (SELECT remote._id FROM remote WHERE remote.description = '${workLocation}'), 
  //     '${title}', 
  //     '${url}',
  //     '${salary}',
  //     (SELECT city._id FROM city WHERE city.city_name = '${city}'),
  //     '${description}',
  //     '${postingDate}'
  //   );`
  const baseQuery = `
    INSERT INTO job_listing (commitment_id, created_on, seniority_id, remote_id, title, url, salary, city_id)
    VALUES 
      ((SELECT commitment._id FROM commitment WHERE commitment.description = '${commitment}'), 
      '2021-05-15', 
      (SELECT seniority._id FROM seniority WHERE seniority.description = '${seniority}'), 
      (SELECT remote._id FROM remote WHERE remote.description = '${workLocation}'), 
      '${title}', 
      '${url}',
      '${salary}',
      (SELECT city._id FROM city WHERE city.city_name = '${city}')
      );`
  console.log(baseQuery)

  db.query(baseQuery)
  .then(results => {
    console.log(results)
    res.locals.jobs = results["rows"];
    next();
  })
  .catch(err => next({err}))
}

module.exports = jobController;

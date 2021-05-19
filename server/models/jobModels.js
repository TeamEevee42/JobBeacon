const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const PG_URI = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: (text, params, callback) =>
    // console.log('executed query', text);
    pool.query(text, params, callback)
  ,
};

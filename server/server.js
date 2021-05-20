const dotenv = require('dotenv').config();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const jobRouter = require('./routes/job');
const cors = require('cors');

const app = express();

/* We might need this static /dist thing later later.. */
// app.use(express.static(path.resolve(__dirname, '../dist')));


app.use(cors());

// Parsing Stuff Here
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

// Route handlers
app.use('/job', jobRouter);

// 404 Handler
app.use((req, res) => res.status(404).send('404 - Requested resource not found'));

// Glober Error Handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = { ...defaultErr, ...err };
  console.error(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// set port & start listening
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

/* eslint-disable linebreak-style */
import React from 'react';
import Button from '@material-ui/core/Button';
import { PageContext } from '../App';
// contains all of the created jobs
export default function JobListContainer() {
  const { page, setPage } = React.useContext(PageContext);
  // fetch data from database and create a new job for each job
  // return the list of jobs
  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => setPage('create')}>
        Add Job
      </Button>
    </div>
  );
}

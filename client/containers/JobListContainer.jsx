/* eslint-disable linebreak-style */
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import axios from 'axios'

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function createData(job, url, seniority, workLocation, city, status, description) {
  return {
    job,
    url,
    seniority,
    workLocation,
    city,
    status,
    description,
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  // fetch data from database and create a new job for each job
  // return the list of jobs
  return (
    <>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">{row.job}</TableCell>
        <TableCell align="right">{row.url}</TableCell>
        <TableCell align="right">{row.seniority}</TableCell>
        <TableCell align="right">{row.workLocation}</TableCell>
        <TableCell align="right">{row.city}</TableCell>
        <TableCell align="right">{row.status}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Description
              </Typography>
              <p>
                {row.description}
              </p>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    job: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    seniority: PropTypes.string,
    workLocation: PropTypes.string,
    city: PropTypes.string,
    status: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};

//DUMMY DATA
// const rows = [
//   createData('Software Engineer - Google', 'Mid-level', 'Remote', 'Los Angeles', 'Applied', 'Cool description'),
//   createData('Software Engineer - Facebook', 'Mid-level', 'Remote', 'Los Angeles', 'Applied', 'Another cool description'),
//   createData('Software Engineer - Amazon', 'Mid-level', 'Remote', 'Los Angeles', 'Applied', 'A different cool description'),
//   createData('Software Engineer - Apple', 'Mid-level', 'Remote', 'Los Angeles', 'Applied', 'Yet another cool description'),
//   createData('Software Engineer - Netflix', 'Mid-level', 'Remote', 'Los Angeles', 'Applied', 'Too many cool descriptions'),
// ];


export default function JobListContainer(props) {
  const [rows, setRows] = useState([])



  useEffect(() => {
    const filterObj = props.filters;
    console.log('hello')

    const localRows = [];
    axios.get('http://localhost:3000/job', filterObj)
    .then(result => {
      result["data"]["jobs"].forEach((job) => 
      localRows.push(createData(job.title, job.url, job.seniority, job.workLocation, job.city, job.status, job.description)));
    })
    .then(() => setRows(localRows))
    .catch(error => console.log(error));
  })
   

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Job</TableCell>
            <TableCell align="right">URL</TableCell>
            <TableCell align="right">Seniority</TableCell>
            <TableCell align="right">Work Location</TableCell>
            <TableCell align="right">City</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.job} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

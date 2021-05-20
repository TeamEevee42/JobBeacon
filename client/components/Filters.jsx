/* eslint-disable linebreak-style */
import React, {useEffect, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import axios from 'axios'


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1.5),
    minWidth: 120,
  },
  filterButton: {
    margin: theme.spacing(1.5),
    marginTop: 25,
  },
}));

export default function Filters(props) {
  const classes = useStyles();
  const [commitment, setCommitment] = React.useState('');
  const [seniority, setSeniority] = React.useState('');
  const [tech, setTech] = React.useState('');
  const [workLocation, setWorkLocation] = React.useState('');
  const [city, setCity] = React.useState('');
  const [status, setStatus] = React.useState('');

  useEffect(() => {
    console.log('in useeffect')    
    // Iterate through filter states and push non-empty states to filter object
    const filterObj = {
      params: {commitment, seniority, tech, workLocation, city, status}
    }

    for(const prop in filterObj["params"]){
      if(filterObj["params"][prop].length<1) delete filterObj["params"][prop];
    }

    props.action(filterObj);

  }, [])

  const filter = () => {   
    // Iterate through filter states and push non-empty states to filter object
    const filterObj = {
      params: {commitment, seniority, tech, workLocation, city, status}
    }

    for(const prop in filterObj["params"]){
      if(filterObj["params"][prop].length<1) delete filterObj["params"][prop];
    }
    console.log(filterObj)

    props.action(filterObj);

  }

  



  return (
    <div id="FilterContainer">
      <FormControl className={classes.formControl}>
        <InputLabel id="commitment">Commitment</InputLabel>
        <Select
          labelId="commitment"
          id="_commitment"
          value={commitment}
          onChange={(event) => setCommitment(event.target.value)}
          autoWidth
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="full-time">Full-Time</MenuItem>
          <MenuItem value="part-time">Part-Time</MenuItem>
          <MenuItem value="contract">Contract</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="seniority">Seniority</InputLabel>
        <Select
          labelId="seniority"
          id="_seniority"
          value={seniority}
          onChange={(event) => setSeniority(event.target.value)}
          autoWidth
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="intern">Intern</MenuItem>
          <MenuItem value="mid-level">Mid-Level</MenuItem>
          <MenuItem value="senior">Senior</MenuItem>
          <MenuItem value="staff">Staff</MenuItem>
          <MenuItem value="CTO">CTO</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="tech">Technology</InputLabel>
        <Select
          labelId="tech"
          id="_tech"
          value={tech}
          onChange={(event) => setTech(event.target.value)}
          autoWidth
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="javascript">Javascript</MenuItem>
          <MenuItem value="react">React</MenuItem>
          <MenuItem value="node">Node</MenuItem>
          <MenuItem value="express">Express</MenuItem>
          <MenuItem value="sql">SQL</MenuItem>
          <MenuItem value="mongoDB">MongoDB</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="Work-Location">Work Location</InputLabel>
        <Select
          labelId="Work-Location"
          id="_workLocation"
          value={workLocation}
          onChange={(event) => setWorkLocation(event.target.value)}
          autoWidth
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="in-person">In-Person</MenuItem>
          <MenuItem value="remote">Remote</MenuItem>
          <MenuItem value="COVID-remote">Remote (COVID)</MenuItem>
          <MenuItem value="hybrid">Hybrid</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="City">City</InputLabel>
        <Select
          labelId="City"
          id="_city"
          value={city}
          onChange={(event) => setCity(event.target.value)}
          autoWidth
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="LA">Los Angeles</MenuItem>
          <MenuItem value="NYC">New York</MenuItem>
          <MenuItem value="SD">San Diego</MenuItem>
          <MenuItem value="SF">San Francisco</MenuItem>
          <MenuItem value="Seattle">Seattle</MenuItem>
          <MenuItem value="Chicago">Chicago</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="Status">Status</InputLabel>
        <Select
          labelId="Status"
          id="_status"
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          autoWidth
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="Not applied">Not Applied</MenuItem>
          <MenuItem value="Applied">Applied</MenuItem>
          <MenuItem value="1st interview">1st Interview</MenuItem>
          <MenuItem value="2nd interview">2nd Interview</MenuItem>
          <MenuItem value="3rd interview">3rd Interview</MenuItem>
          <MenuItem value="4th interview">4th Interview</MenuItem>
          <MenuItem value="Offered">Offered</MenuItem>
          <MenuItem value="Denied">Denied</MenuItem>
          <MenuItem value="Accepted">Accepted</MenuItem>
        </Select>
      </FormControl>
      <Button className={classes.filterButton} variant="contained" color="default" onClick = {() => filter()}>
        Filter
      </Button>
    </div>
  );
}

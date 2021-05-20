import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function AddModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const saveToDB = (data) => {
    console.log(data);
    axios.post('http://localhost:3000/job', data)
      .then((response) => {
        console.log(response);
        handleClose();
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const defaultForm = {

    };
    // TODO: commitment, seniority, workLocation, salary, city_id are hardcoded
    // ... with dummy values. add to form.
    const formData = {
      title: e.target.title.value,
      description: e.target.description.value,
      postingDate: e.target.postingDate.value,
      url: e.target.url.value,
      commitment: 'full-time',
      seniority: 'mid',
      workLocation: 'remote',
      salary: '$105,000',
      city: 'SF',
    };
    saveToDB(formData);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add Job
      </Button>
      <Modal
        aria-labelledby="inputDetailsTitle"
        aria-describedby="details"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Input Job Details</h2>
            <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
              <TextField id="title" label="Job Title" />
              {/* <TextField id="description" label="Job Description" /> */}
              <TextareaAutosize id="description" aria-label="description" rowsMin={3} placeholder="Job Description" />
              <TextField
                id="postingDate"
                label="Job Posting Date"
                type="date"
                defaultValue="2021-05-20"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField id="url" label="URL" />

              {/* <InputLabel id="select-commitment">Commitment</InputLabel>
              <Select
                labelId="select-commitment"
                id="commitment"
                //value={age}
                //onChange={handleChange}
              >
                <MenuItem value="full-time">Full-Time</MenuItem>
                <MenuItem value="part-time">Part-Time</MenuItem>
                <MenuItem value="contract">Contract</MenuItem>
              </Select> */}
              <Button variant="contained" color="primary" type="submit">
                Save
              </Button>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

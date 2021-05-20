/* eslint-disable linebreak-style */
import React, {Component} from 'react';
import FilterContainer from './FilterContainer';
import JobListContainer from './JobListContainer';
import AddModal from '../components/AddModal';
import { TransferWithinAStationRounded } from '@material-ui/icons';
// main container to be used in pages

export default class MainContainer extends Component {

  constructor(props){
    super(props)
    this.state = {
      filters: {}
    }
  }

  filterJobs(value){
    this.setState({filters: value})
  }
  
  render(){

    return(
      <main>
          <header>
            <h1 id="heading">
              Job Beacon
            </h1>
          </header>
          <FilterContainer action = {(value) => this.filterJobs(value)}/>
          <div>
            <AddModal />
          </div>
          <JobListContainer filters={this.state.filters}/>
        </main>
      )
  }
}

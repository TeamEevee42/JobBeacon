/* eslint-disable linebreak-style */
import React, {useState} from 'react';
import FilterContainer from './FilterContainer';
import JobListContainer from './JobListContainer';
import AddModal from '../components/AddModal';
// main container to be used in pages

export default function MainContainer() {
  const [filters, setFilters] = useState({});
  


  return (
    <main>
      <header>
        <h1 id="heading">
          Job Beacon
        </h1>
      </header>
      <FilterContainer action = {(value) => setFilters(value)}/>
      <div>
        <AddModal />
      </div>
      <JobListContainer filters={filters}/>
    </main>
  );
}

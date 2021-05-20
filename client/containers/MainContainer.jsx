/* eslint-disable linebreak-style */
import React from 'react';
import FilterContainer from './FilterContainer';
import JobListContainer from './JobListContainer';
import AddModal from '../components/AddModal';
// main container to be used in pages

export default function MainContainer() {
  return (
    <main>
      <header>
        <h1 id="heading">
          Job Beacon
        </h1>
      </header>
      <FilterContainer />
      <div>
        <AddModal />
      </div>
      <JobListContainer />
    </main>
  );
}

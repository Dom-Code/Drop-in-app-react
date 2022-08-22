import React from 'react';
import Provider from './Provider';
import FindBox from './FindBox';

function Search({ click }) {
  return (
    <div>
      <h2>View our trusted providers</h2>
      <FindBox />
        <Provider click={click} />
    </div>
  );
}

// click will capture the target provider and send back to main.js.

export default Search;

/* eslint-disable max-len, react/jsx-filename-extension */
import React from 'react';
import Provider from './Provider';
import Scroll from './Scroll';
import FindBox from './FindBox';

const Search = ({ click }) => {

  return (
    <div>
      <h2>View our trusted providers</h2>
      <FindBox />
      <Scroll>
        <Provider click={click}/>
      </Scroll>
    </div>
  );
}

// click will capture the target provider and send back to main.js.

export default Search;

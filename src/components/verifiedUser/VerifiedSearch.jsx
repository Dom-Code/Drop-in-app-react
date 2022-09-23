/* eslint-disable max-len, react/jsx-filename-extension */
import React from 'react';
import VerifiedProvider from './VerifiedProvider';
import Scroll from '../Scroll';
import FindBox from '../FindBox';

function VerifiedSearch({ click }) {
  return (
    <div>
      <h2>View our trusted providers</h2>
      <FindBox />
      <Scroll>
        <VerifiedProvider click={click} />
      </Scroll>
    </div>
  );
}

export default VerifiedSearch;

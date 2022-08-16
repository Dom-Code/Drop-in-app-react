/* eslint-disable max-len, react/jsx-filename-extension */
import React from 'react';
import VerifiedProvider from './VerifiedProvider';
import Scroll from '../Scroll';
import FindBox from '../FindBox';

const VerifiedSearch = (props) => {
  const { newSearch } = props;
  return (
    <div>
      <h2>View our trusted providers</h2>
      <FindBox newSearch={(event) => newSearch(event)} />
      <Scroll>
        <VerifiedProvider/>
      </Scroll>
    </div>
  );
}

export default VerifiedSearch;

/* eslint-disable max-len, react/jsx-filename-extension */
import React from 'react';
import Provider from './Provider';
import Scroll from './Scroll';
import FindBox from './FindBox';

function Search(props) {
  const { persons } = props;
  const { newSearch } = props;
  return (
    <div>
      <h2>View our trusted providers</h2>
      <FindBox newSearch={(event) => newSearch(event)} />
      <Scroll>
        {persons.map((person) => <div className="di" key={person.id}><Provider name={person.name} specialty={person.specialty} /></div>)}
      </Scroll>
    </div>
  );
}

export default Search;

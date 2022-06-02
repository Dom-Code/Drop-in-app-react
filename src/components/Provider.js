/* eslint-disable react/destructuring-assignment, react/jsx-filename-extension */
import React from 'react';
import doc from '../doc.jpg';

function Provider(person) {
  const styles = {
    marginTop: '20px',
    height: 'auto',
    width: '200px',
  };

  return (
    <div key={person.id} className="bg-light-blue dib br3 pa3 ma2 grow tc bw2 shadow-5" style={styles}>
      <img alt="provider" src={doc} />
      <div>
        <h3>{person.name}</h3>
        <p>{person.specialty}</p>
      </div>
    </div>
  );
}

export default Provider;

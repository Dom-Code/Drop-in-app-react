/* eslint-disable jsx-a11y/label-has-associated-control, react/jsx-filename-extension */
import React from 'react';
import './findBox.css';

function FindBox({ newSearch }) {
  return (
    <form id="findbox-form">
      <div>
        <label htmlFor="user-input">
          Search:
          <input
            onChange={(event) => newSearch(event)}
            onKeyDown={(event) => {
              if (event.key === 'Backspace') {
                return newSearch(event);
              }
              return null;
            }}
            id="user-input"
          />
        </label>
      </div>
    </form>
  );
}

export default FindBox;

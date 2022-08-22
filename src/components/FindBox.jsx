import React from 'react';
import '../component-css/main.css';

import useText from './hooks/useText';

function FindBox() {
  const { text, changeText } = useText();

  function newSearch(event) {
    if (event.key) {
      changeText(text.slice(0, text.length - 1));
    } else {
      changeText(event.target.value);
    }
  }

// the text context is updated when a change occurs in the search bar.
// Since backspace is not recognized by on change, i used `onKeyDown` 
// and passed the event to newSearch if a backspace occurs.

  return (
    <form
      id="findbox-form"
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <div>
        <label htmlFor="user-input">
          Search:
          <input
            onChange={(event) => newSearch(event)}
            onKeyDown={(event) => {
              if (event.key === 'Backspace') {
                newSearch(event);
              }
            }}
            id="user-input"
          />
        </label>
      </div>
    </form>
  );
}

export default FindBox;

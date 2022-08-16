import React from 'react';
import '../component-css/findBox.css';

import { useText } from './Contexts/textProvider';

function FindBox(props) {
  const { text, changeText } = useText();

  function newSearch(event) {
    if (event.key) {
      changeText(text.slice(0, text.length - 1));
    } else {
      changeText(event.target.value);
    }
  }

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

import React, { useContext, useEffect } from 'react';
import '../component-css/findBox.css';
// import { useProviders } from './Contexts/ProvidersContext';
import ProvidersContext from './Contexts/ProvidersContext';
// import { TextProvider } from './Contexts/textProvider';
import { useText } from './Contexts/textProvider';

function FindBox(props) {

  const {text, changeText} = useText();


  function newSearch(event) {
    if (event.key) {
      changeText(text.slice(0, text.length - 1));
    } else {
      changeText(event.target.value);
    }
  }

  useEffect(() => {
    // console.log(text)
  }, [text])

  return (
    <form id="findbox-form">
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
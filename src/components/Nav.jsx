import React from 'react';
import '../component-css/main.css';

function Nav({ click }) {
  return (
    <nav>
      <a className="db dtc-c v-mid mid-gray link dim w-100 w-25-l tc tl-c mb2 mb0-l" href="/Drop-in-app-react" title="Home">
        <img src="http://tachyons.io/img/logo.jpg" className="dib w2 h2 br-100" alt="Site Name" />
      </a>
      <div id="all-nav-items">
        <p className="link dim dark-gray f6 f5-l dib mr3 mr4-l" title="Home" onClick={click}>Home</p>
        <p className="link dim dark-gray f6 f5-l dib mr3 mr4-l" title="How" onClick={click}>How it Works</p>
        <p className="link dim dark-gray f6 f5-l dib mr3 mr4-l" title="Search" onClick={click}>Search Providers</p>
        <p className="link dim dark-gray f6 f5-l dib mr3 mr4-l" title="Account" onClick={click}>Account</p>
      </div>
    </nav>
  );
}

/*
  The Nav component has several onClicks that capture the click event and passes it back to
  main.js. main.js will then take that info and adjust accordingly.
*/

export default Nav;

// this will return the event after a target has been clicked.

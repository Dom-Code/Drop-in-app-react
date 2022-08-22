import React from 'react';
import '../component-css/main.css';

function Home({ click }) {
  return (
    <>
      <h2>Welcome to Drop-In</h2>
      <div id="account-buttons">
        <a id="login" className="button" href="/" title="Login" onClick={click}>Login</a>
        <a id="create" className="button" href="/" title="CreateUser" onClick={click}>Create New Account</a>
      </div>
    </>
  // When the user clicks on login or create, the event is passed 
  // to main and the id is used to identify which screen to change it to.
  );
}

export default Home;

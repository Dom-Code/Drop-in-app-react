import React from 'react';
import '../component-css/home.css';

function Home({ click }) {
  return (

    <>
      <h2>Welcome to Drop-In</h2>
      <div id="account-buttons">
        <a id="login" className="button" href="/" title="Login" onClick={click}>Login</a>
        <a id="create" className="button" href="/" title="CreateUser" onClick={click}>Create New Account</a>
      </div>
    </>

  );
}

export default Home;

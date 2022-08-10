import React from 'react';
import '../component-css/home.css'

const Account = ({click}) => {
  return (
    <div id="account-buttons">
    <a id='login' className="button" href="/" title="Login" onClick={click}>Login</a>
    <a id='create' className="button" href="/" title="CreateUser" onClick={click}>Create New Account</a>
  </div>
  )  
}

export default Account;

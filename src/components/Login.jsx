import React, { useRef, useState } from 'react';
import '../component-css/main.css';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

const LOGIN_URL = '/api/auth';

function Login({ click }) {
  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  async function LogInUser(event) {
    event.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email, pw }),
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          // 'withCredentials': true,
          },
        },
      );

      const { accessToken } = response.data;
      const { refreshToken } = response.data;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);


      // if database accepts the login data, access and refresh
      // tokens are saved in local storage.

      setEmail('');
      setPw('');
      setSuccess(true);
      navigate('/Drop-in-app-react/user');

      // email and password contexts are set to an empty string.
      
    } catch (err) {
      if (!err.response) {
        setErrMsg('No Server Response');
      } else {
        setErrMsg(err.response.data.message);
      }
    }
  }

  return (
    <div>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            <a href="/">Sign In</a>
          </p>
        </section>
      ) : (
        <div id="signin">
          <p
            ref={errRef}
            className={errMsg ? 'errmsg' : 'offscreen'}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <div className="pa4 black-8 measure center" id="signin-view">
            <div id="sign_in" className="ba b--transparent ph0 mh0">
              <h2>Log in</h2>
              <form onSubmit={LogInUser} noValidate>
                <div className="mb2">
                  <label className="db fw6 lh-copy f6 tl" htmlFor="email">
                    Email
                    {' '}
                    <input
                      className="pa2 input-reset ba bg-transparent hover-bg-light-gray hover-black w-100 br2"
                      type="text"
                      id="email"
                      ref={userRef}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />

                  </label>

                </div>
                <div className="mb2">
                  <label className="db fw6 lh-copy f6 tl" htmlFor="pw">
                    Password
                    {' '}
                    <input
                      className="pa2 input-reset ba bg-transparent hover-bg-light-gray hover-black w-100 br2"
                      onChange={(e) => setPw(e.target.value)}
                      type="password"
                      id="pw"
                    />

                  </label>
                  <p id="password-error" />

                </div>
                {/* <div className="tl">
                  <input type="checkbox" className="" htmlFor="remember" />
                  <label className="pl1 lh-copy f6 pointer">Remember Me</label>
                </div> */}
                <div className="tl">
                  <button className="button" type="submit" value="Sign in">Sign in</button>
                </div>
              </form>
              <div className="mt0 tl">
                <div className="f6 black db">
                  Dont have an account yet?
                  {' '}
                  <a href="/#" title="CreateUser" className="sign-in-link hover-light-blue" onClick={click}>Sign up</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;

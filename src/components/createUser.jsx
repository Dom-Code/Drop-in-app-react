import React, { useRef, useState, useEffect } from 'react';
import '../component-css/main.css';
import axios from '../api/axios';

function CreateUser({ click }) {
  const userRef = useRef();
  const errRef = useRef();

  const [firstName, setFirstName] = useState('');
  const [validFirstName, setValidFirstName] = useState(null);
  const [firstNameFocus, setFirstNameFocus] = useState(false);

  const [lastName, setLastName] = useState('');
  const [validLastName, setValidLastName] = useState(null);
  const [lastNameFocus, setLastNameFocus] = useState(false);

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(null);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pw, setPw] = useState('');
  const [validPw, setValidPw] = useState(null);
  const [pwFocus, setPwFocus] = useState(false);

  const [confirmPw, setConfirmPw] = useState('');
  const [validConfirmPw, setValidConfirmPw] = useState(null);
  const [confirmPwFocus, setConfirmPwFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState('');

  const regName = /^[A-Za-z]{2,15}$/;
  const regEmail = /^[A-Za-z0-9.?_?]+@[A-Za-z0-9]+\.[a-zA-z]{3}$/;
  const regPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
  const CREATEUSERURL = '/api/register';


  useEffect(() => {
      if (firstName.length === 0) {
        setValidFirstName(null)
      } else {
        const result = regName.test(firstName);
        setValidFirstName(result);
      }
  }, [firstName]);

  useEffect(() => {
    if (lastName.length === 0) {
      setValidLastName(null)
    } else {
      const result = regName.test(lastName);
      setValidLastName(result);
    }
  }, [lastName]);

  useEffect(() => {
    if (email.length === 0) {
      setValidEmail(null);
    } else {
      const result = regEmail.test(email);
      setValidEmail(result);
    }
  }, [email]);

  useEffect(() => {
    if (pw.length === 0) {
      setValidPw(null);
    } else {
      const result = regPassword.test(pw);
      setValidPw(result);
    }
  }, [pw]);

  useEffect(() => {
    if (confirmPw.length === 0) {
      setValidConfirmPw(null);
    } else {
      const result = validPw && (confirmPw === pw);
      setValidConfirmPw(result);
    }
  }, [confirmPw]);


  function validColor(item) {
    if (item === null) {
      return 'ba'
    } else if (!item) {
      return 'ba b--red bw2'
    } else {
      return 'ba b--green bw2'
    }
  }


  async function submitUser(e) {
    e.preventDefault();

    const u1 = regName.test(firstName);
    const u2 = regName.test(lastName);
    const u3 = regEmail.test(email);
    const u4 = regPassword.test(pw);

    if (!u1 || !u2 || !u3 || !u4) {
      setErrMsg('Invalid Entry');
      return;
    }
    
    // if any of the entries fail, "Invalid entry" will appear
    try {
      await axios.post(
        CREATEUSERURL,
        JSON.stringify({
          firstName, lastName, email, pw,
        }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: false,
        },
      );
      setSuccess(true);
      setFirstName('');
      setLastName('');
      setEmail('');
      setPw('');
      // set states to empty srings.
    } catch (err) {
      if (!err.response) {
        setErrMsg('No Server Response');
      } else if (err.response.status === 409) {
        setErrMsg('Email already exists');
      } else {
        setErrMsg('Registration Failed');
        console.log(err)
      }
      errRef.current.focus();
    }
  }

  return (
    <div>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            <a title="Login" href="/#" className="f6 blue underline link dib pl1 hover-light-blue" onClick={(click)}>Sign In</a>
          </p>
        </section>
  // If user registration is completed, success and login link will appear.
  // If user registration fails, location of invalid entry will appear.
      ) : (
        <section id="signup-view">
          <p
            ref={errRef}
            className={errMsg ? 'errmsg' : 'offscreen'}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <div className="pa0 black-8">
            <form className="measure center pa4" onSubmit={submitUser}>
              <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <h2>Sign up</h2>
                <div className="mb2">
                  <label
                    className="db fw6 lh-copy f6 tl"
                    htmlFor="first_name"
                  >
                    First Name
                    <input
                      type="text"
                      id="first_name"
                      ref={userRef}
                      className={`${validColor(validFirstName)} pa2 input-reset bg-transparent hover-bg-light-gray hover-black w-100 br2`}
                      autoComplete="off"
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      aria-invalid={validFirstName ? 'false' : 'true'}
                      aria-describedby="first-name-note"
                      onFocus={() => setFirstNameFocus(true)}
                      onBlur={() => setFirstNameFocus(false)}
                    />
                  </label>

                  <p
                    id="first-name-note"
                    className={`note ${firstNameFocus && !validFirstName ? 'instructions' : 'offscreen'}`}
                  >
                    First name must have 2 to 16 characters.
                    <br />
                    Must be only letters.
                    <br />
                  </p>
                </div>
                <div className="mb2">
                  <label className="db fw6 lh-copy f6 tl" htmlFor="last_name">
                    Last Name
                    {' '}
                    <input
                      className={`${validColor(validLastName)} pa2 input-reset bg-transparent hover-bg-light-gray hover-black w-100 br2`}
                      type="text"
                      id="last_name"
                      ref={userRef}
                      autoComplete="off"
                      required
                      onChange={(e) => setLastName(e.target.value)}
                      aria-invalid={validLastName ? 'false' : 'true'}
                      aria-describedby="last-name-note"
                      onFocus={() => setLastNameFocus(true)}
                      onBlur={() => setLastNameFocus(false)}
                    />

                  </label>

                  <p
                    id="last-name-note"
                    className={`note ${lastNameFocus && !validLastName ? 'instructions' : 'offscreen'}`}
                  >
                    Last name must have 2 to 16 characters.
                    <br />
                    Must be only letters.
                    <br />
                  </p>
                </div>
                <div className="mb2">
                  <label className="db fw6 lh-copy f6 tl" htmlFor="email">
                    Email
                    <input
                      className={`${validColor(validEmail)} pa2 input-reset ba bg-transparent hover-bg-light-gray hover-black w-100 br2`}
                      type="email"
                      id="email"
                      ref={userRef}
                      autoComplete="off"
                      required
                      onChange={(e) => setEmail(e.target.value)}
                      aria-invalid={validEmail ? 'false' : 'true'}
                      aria-describedby="email-note"
                      onFocus={() => setEmailFocus(true)}
                      onBlur={() => setEmailFocus(false)}
                    />
                  </label>

                  <p
                    id="email-note"
                    className={`note ${emailFocus && !validEmail ? 'instructions' : 'offscreen'}`}
                  >
                    Must be formatted correctly. John@Dropin.com
                    <br />
                  </p>
                </div>
                <div className="mb2">
                  <label className="db fw6 lh-copy f6 tl" htmlFor="pw">
                    Create Password
                    <input
                      className={`${validColor(validPw)} pa2 input-reset ba bg-transparent hover-bg-light-gray hover-black w-100 br2`}
                      type="password"
                      id="pw"
                      ref={userRef}
                      required
                      onChange={(e) => setPw(e.target.value)}
                      aria-invalid={validPw ? 'false' : 'true'}
                      aria-describedby="pw-note"
                      onFocus={() => setPwFocus(true)}
                      onBlur={() => setPwFocus(false)}
                    />
                  </label>

                  <p
                    id="pw-note"
                    className={`note ${pwFocus && !validPw ? 'instructions' : 'offscreen'}`}
                  >
                    8 to 16 characters long.
                    <br />
                    Must include letters and at least 1 number.
                    <br />
                    Must at least 1 uppercase letter.
                    <br />
                    Must include 1 special character.
                    <br />
                  </p>
                </div>
                <div className="mb2">
                  <label className="db fw6 lh-copy f6 tl" htmlFor="pw_confirm">
                    Confirm Password
                    <input
                      className={`${validColor(validConfirmPw)} pa2 input-reset ba bg-transparent hover-bg-light-gray hover-black w-100 br2`}
                      type="password"
                      id="pw-confirm"
                      ref={userRef}
                      required
                      onChange={(e) => setConfirmPw(e.target.value)}
                      aria-invalid={validConfirmPw ? 'false' : 'true'}
                      aria-describedby="cPw-note"
                      onFocus={() => setConfirmPwFocus(true)}
                      onBlur={() => setConfirmPwFocus(false)}
                    />
                  </label>

                  <p
                    id="cPw-note"
                    className={`note ${confirmPwFocus && !validConfirmPw ? 'instructions' : 'offscreen'}`}
                  >
                    Must match Password
                    <br />
                  </p>
                </div>
                <div className="tl">
                  <button
                    className="button"
                    type="submit"
                    disabled={!!(!validFirstName
                    || !validLastName
                    || !validEmail
                    || !validPw
                    || !validConfirmPw)}
                  >
                    Sign up
                  </button>
                </div>
              </fieldset>
            </form>
            <div className="">
              <p id="login-options" className="f6 black dib">Already Have an account?</p>
              <a id="login-option-link" title="Login" href="/#" className="f6 blue underline link dib pl1 hover-light-blue" onClick={click}>Sign in</a>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default CreateUser;

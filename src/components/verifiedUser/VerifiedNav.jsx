import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import logo from '../../images/logo.png';

function Nav({ click }) {
  const navigate = useNavigate();

  const logout = async () => {
    const refreshToken = localStorage.getItem('refreshToken');

    try {
      await axios.get('/api/logout', {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      });

      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      navigate('/Drop-in-app-react');
    } catch (err) {
      console.log(err);
      navigate('/Drop-in-app-react');
    }
  };

  function onClick(e) {
    click(e.target.title);
  }

  /*
    The refresh token is taken from our localStorage and is assigned to the
    Authorization header. We then send this request to the servers API.
    the accessToken and refreshToken are then removed from the localStorage.
    We are then navigated back to the home screen.

    On the backend, the users refreshToken is entered into a blacklisted database
    and can no longer be used to gain access.
  */

  function handleRefresh(e) {
    e.preventDefault();
    const home = document.querySelector('#verified-home');
    home.click();
  }

  return (
    <nav>
      <a className="db dtc-c v-mid mid-gray link dim w-100 w-25-l tc tl-c mb4 mb0-l" href="/" onClick={handleRefresh} title="Home">
        <img src={logo} className="dib w3 br-0" alt="Site Name" />
      </a>
      <div id="all-nav-items">
        <p id="verified-home" className="link dim dark-gray f6 f5-l dib mr3 mr4-l" title="Home" onClick={onClick}>Home</p>
        <p className="link dim dark-gray f6 f5-l dib mr3 mr4-l" title="How" onClick={onClick}>How it Works</p>
        <p className="link dim dark-gray f6 f5-l dib mr3 mr4-l" title="Search" onClick={onClick}>Search Providers</p>
        <p className="link dim dark-gray f6 f5-l dib mr3 mr4-l" title="Logout" onClick={logout}>Logout</p>
      </div>
    </nav>
  );
}

export default Nav;

// this will return the event after a target has been clicked.

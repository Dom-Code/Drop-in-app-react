import React from 'react';
import '../../component-css/nav.css'
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';


function Nav({ click }) {
  const navigate = useNavigate();

  const logout = async (e) => {
    const refreshToken = localStorage.getItem('refreshToken');
  
    try {
      await axios.get('/api/logout', {
        headers: {
          Authorization: `Bearer ${refreshToken}`
        }
      })
  
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      navigate('/Drop-in-app-react')
  
    } catch(err) {
      console.log(err)
      navigate('/Drop-in-app-react')
    }
  };

  /*
    The refresh token is taken from our localStorage and is assigned to the 
    Authorization header. We then send this request to the servers API. 
    the accessToken and refreshToken are then removed from the localStorage. 
    We are then navigated back to the home screen. 

    On the backend, the users refreshToken is entered into a blacklisted database
    and can no longer be used to gain access.
  */
  
  return (
    <nav className="db dt-l w-100 border-box pa3 ph5-l">
      <a className="db dtc-l v-mid mid-gray link dim w-100 w-25-l tc tl-l mb2 mb0-l" href="/#" title="Home">
        <img src="http://tachyons.io/img/logo.jpg" className="dib w2 h2 br-100" alt="Site Name" />
      </a>
      <div className="db dtc-l v-mid w-100 w-75-l tc tr-l">
        <p className="link dim dark-gray f6 f5-l dib mr3 mr4-l" title="Home" onClick={click}>Home</p>
        <p className="link dim dark-gray f6 f5-l dib mr3 mr4-l" title="How" onClick={click}>How it Works</p>
        <p className="link dim dark-gray f6 f5-l dib mr3 mr4-l" title="Search" onClick={click}>Search Providers</p>
        <p className="link dim dark-gray f6 f5-l dib mr3 mr4-l" title="SignOut" onClick={logout}>Sign Out</p>
      </div>
    </nav>
  );
}

export default Nav;

// this will return the event after a target has been clicked.

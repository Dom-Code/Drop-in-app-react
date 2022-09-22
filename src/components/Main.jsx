import React, { useState, useEffect } from 'react';
import Nav from './Nav';
import Home from './Home';
import How from './How';
import Footer from './Footer';
import Search from './Search';
import Login from './Login';
import CreateUser from './CreateUser';
import Account from './Account';
import '../component-css/main.css';
import axios from '../api/axios';
import Spinner from './Spinner';

import useText from './hooks/useText';
import useProviders from './hooks/useProviders';

function Main() {
  const [currentWindow, changeWindow] = useState('Home');
  const [prevList, setPrevList] = useState([]);
  const [loading, setLoading] = useState(false);

  const { changeProviders } = useProviders()
  const { text, changeText } = useText();

  function switchView(event) {
    event.preventDefault();
    const windowName = event.target.title;

    if (windowName === currentWindow) {
      changeWindow(currentWindow);
    } else {
      changeWindow(windowName);
    }
    const userInput = document.querySelector('#user-input');
    if (userInput) {
      userInput.value = '';
    }
    changeText('');
    changeProviders(prevList);
  }

  /*
    We have created the state 'currentWindow' and assigned it to 'Home' to start,
    since our starting page will be the home page.

    The switchView function will extract the title of the window from the event
    passed to it and assign it to the variable windowName.

      If the the windowName(the window user has clicked) is already the current window,
      we then change the state to currentWindow to simulate a refresh.

      If the windowName and currentWindow are not the same, the state of currentWindow
      is changed to windowName
  */

  async function fetchProviders() {
    try {
      const response = await axios.get(
        '/api/partial-providers',
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (response.data) {
        setLoading(true);
        setPrevList(response.data);
        changeProviders(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  /*
    After fetching the the partial providers, we assign the array to the state providers.
    We also assign it to 'setPrevList' which will store the provider list. We can refer
    back to this list when the providers state is changed and we want to the original list.
    This prevents us from sending several GET requests when searching through providers.
  */

  function showView() {
    switch (currentWindow) {
      case 'Home':
        return <Home click={(event) => switchView(event)} />;
      case 'How':
        return <How />;
      case 'Search':
        return <Search click={(event) => switchView(event)} />
      case 'Account':
        return <Account click={(event) => switchView(event)} />;
      case 'Login':
        return <Login click={(event) => switchView(event)} />;
      case 'CreateUser':
        return <CreateUser click={(event) => switchView(event)} />;
      default:
    }
  }

  // showView modifies view and passes information to Search component(providers and search event)

  useEffect(() => {
    fetchProviders();
  }, []);

  // partial information about providers are fetched at start

  useEffect(() => {
    const lowerText = text.toLowerCase();
    if (lowerText.length === 0) {
      changeProviders(prevList);
    } else {
      // eslint-disable-next-line array-callback-return, consistent-return
      changeProviders(prevList.filter((p) => {
        if (p.specialty.toLowerCase().includes(lowerText)
          || p.first_name.toLowerCase().includes(lowerText)
          || p.last_name.toLowerCase().includes(lowerText)) {
          return true;
        }
      }));
    }
  }, [text, prevList]);

  /*
    After each input in the text box, providers state is updated.
  */

  return (
    <>
      <div id="main">
        <div id="nav-container">
          <Nav click={(event) => switchView(event)} />
        </div>
        <div id="content">
          {loading ? showView() : <Spinner />}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Main;

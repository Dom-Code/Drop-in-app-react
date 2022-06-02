import React, { useState, useEffect } from 'react';
import persons from '../seed-data';
import Nav from './Nav';
import Home from './Home';
import How from './How';
import Footer from './Footer';
import Search from './Search';
import Login from './Login';
import ErrorBoundary from './ErrorBoundary';

function Main() {
  const [currentWindow, changeWindow] = useState('Home');
  const [providers, changeProviders] = useState(persons);
  const [text, changeText] = useState('');

  function switchView(event) {
    const windowName = event.target.title;
    changeWindow(windowName);
  }

  function getProviders() {
    const lowerText = text.toLowerCase();
    // console.log(providers);
    const filteredList = providers.filter((p) => {
      if (p.specialty.toLowerCase().includes(lowerText)
      || p.name.toLowerCase().includes(lowerText)) {
        return true;
      }
      return false
    });
    if (text.length > 0) {
      changeProviders(filteredList);
    } else {
      changeProviders(persons);
    }
  }

  const changeInput = (event) => {
    if (event.key) {
      changeProviders(persons);
      changeText(event.target.value);
    } else {
      changeText(event.target.value);
    }
  };

  function showView() {
    switch (currentWindow) {
      case 'Home':
        return <Home />;
      case 'How':
        return <How />;
      case 'Search':
        return <Search persons={providers} newSearch={(event) => changeInput(event)} />;
      case 'Login':
        return <Login />;
      default:
    }
  }

  useEffect(() => {
    getProviders();
    // console.log(providers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  // useEffect(() => {
  //   // console.log(providers);
  // }, [providers]);

  return (
    <div id="main">
      <div id="nav-container">
        <Nav click={(event) => switchView(event)} />
      </div>
      <div id="content" className="tc">
        <ErrorBoundary>
          {showView()}
        </ErrorBoundary>
      </div>
      <div id="footer-container">
        <Footer />
      </div>
    </div>
  );
}

export default Main;

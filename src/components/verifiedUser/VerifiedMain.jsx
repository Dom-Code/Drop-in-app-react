import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer';
import VerifiedNav from './VerifiedNav';
import VerfiedHome from './verifiedHome';
import How from '../How';
import VerifiedSearch from './VerifiedSearch';
import VerifiedMessage from './VerifiedMessage';
import Spinner from '../Spinner';

import useAxiosPrivate from '../hooks/useAxiosPrivate';
import useText from '../hooks/useText';
import useProviders from '../hooks/useProviders';
import useScroll from '../hooks/useScroll';
import '../../component-css/main.css';
import RequestSubmitted from './RequestSubmitted';

function VerifiedMain() {
  const [currentWindow, changeWindow] = useState('Home');
  const [loading, setLoading] = useState(false);
  const [prevList, setPrevList] = useState([]);
  const [chosenProvider, setChosenProvider] = useState('');
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const { changeProviders } = useProviders();
  const { text, changeText } = useText();
  const { scroll } = useScroll();

  const switchView = (windowName, providerId) => {
    setChosenProvider(providerId || null);
    if (windowName !== currentWindow) {
      changeWindow(windowName);
    }
    const userInput = document.querySelector('#user-input');
    if (userInput) {
      userInput.value = '';
    }
    changeText('');
  };

  const fetchProviders = async () => {
    try {
      const response = await axiosPrivate.get('/api/full-providers');
      setPrevList(response.data);
      changeProviders(response.data);
      setLoading(true);
    } catch (err) {
      console.log(err);
      navigate('/Drop-in-app-react');
    }
  };

  const showView = () => {
    switch (currentWindow) {
      case 'Home':
        return <VerfiedHome />;
      case 'How':
        return <How />;
      case 'Search':
        return (
          <VerifiedSearch click={(e, id) => switchView(e, id)} />
        );
      case 'message':
        return <VerifiedMessage chosen={chosenProvider} switchView={switchView} />;
      case 'Submitted':
        return <RequestSubmitted />;
      default:
    }
  };

  useEffect(() => {
    const lowerText = text.toLowerCase();
    if (lowerText.length === 0) {
      changeProviders(prevList);
    } else {
      changeProviders(prevList.filter((p) => {
        if (p.specialty.toLowerCase().includes(lowerText)
          || p.first_name.toLowerCase().includes(lowerText)
          || p.last_name.toLowerCase().includes(lowerText)) {
          return true;
        }
      }));
    }
  }, [text, changeProviders, prevList]);

  useEffect(() => {
    fetchProviders();
  }, []);

  return (
    <div id="main">
      <div id="nav-container">
        <VerifiedNav click={(event) => switchView(event)} />
      </div>
      <div id="content" className={scroll ? 'can-scroll' : 'cannot-scroll'}>
        {loading ? showView() : <Spinner />}
      </div>
      <div id="footer-container">
        <Footer />
      </div>
    </div>
  );
}

export default VerifiedMain;

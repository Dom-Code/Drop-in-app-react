import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import Footer from '../Footer';
import VerifiedNav from './VerifiedNav';
import VerfiedHome from './verifiedHome';
import How from '../How';
import VerifiedSearch from './VerifiedSearch';
import useProviders from '../hooks/useProviders';
import Spinner from '../Spinner';
import { useText } from '../Contexts/textProvider';

function VerifiedMain() {
  const [currentWindow, changeWindow] = useState('Home');
  const { changeProviders } = useProviders();
  const { text, changeText } = useText();
  const [loading, setLoading] = useState(false);
  const [prevList, setPrevList] = useState([]);
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const switchView = (event) => {
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
          <VerifiedSearch values={{ text, changeText }} />
        );
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
      <div id="content" className="tc">
        {loading ? showView() : <Spinner />}
      </div>
      <div id="footer-container">
        <Footer />
      </div>
    </div>
  );
}

export default VerifiedMain;

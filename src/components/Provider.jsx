import React, { useState } from 'react';
import doc from '../images/doc.png';
import '../component-css/main.css';
import DisplayProviders from './DisplayProviders';

import useProviders from './hooks/useProviders';
import useScroll from './hooks/useScroll';

function Provider({ click }) {
  const { providers } = useProviders();
  const { setScroll } = useScroll();
  const [cardVisibility, setCardVisibility] = useState(false);
  const [currentProvider, setCurrentProvider] = useState('');

  const providerClick = (e) => {
    e.preventDefault();
    const providerId = e.target.closest('section').getAttribute('id');

    const data = providers.filter((provider) => provider.id === providerId)[0];

    setCurrentProvider(data);
    setCardVisibility(true);
    setScroll(false);
  };

  // providerClick uses the event passed after the user clicks on a provider.
  // The id is used to locate the provider in the providers array.

  const hideCard = (e) => {
    if (e.target.id === 'modal') {
      setCardVisibility(false);
      setCurrentProvider('');
      setScroll(true)
    }
  };

  /*
    hideCard will be invoked when the user clicks on the modal-wall, which is on the outside
    of the provider card. The card is hidden and the current provider variable is set to
    and empty string. 
  */

  return (
    <div>
      <div
        id="modal"
        className={`modal-wall ${cardVisibility ? 'show' : 'offscreen'}`}
        onClick={(e) => hideCard(e)}
      >
        <section className="card-box">
          <div><img id="doc-image" alt="provider" src={doc} /></div>
          <div className="provider_data">
            <p id="provider-name">{`${currentProvider.first_name} ${currentProvider.last_name} MD`}</p>
            <p className='provider-details'>{currentProvider.specialty} </p>
            <p className='provider-details'>{currentProvider.city} </p>
            <p className='provider-details'>
              <a className="display-links" title="Login" href="/" onClick={click}>Sign in</a>
              {' '}
              or
              <a className="display-links" id="create" href="/" title="CreateUser" onClick={click}>Create an Account</a>
              {' '}
              to contact this provider
            </p>
          </div>
        </section>
      </div>
      <DisplayProviders click={providerClick} />
    </div>
  );
}

/*
  the className for the modal-wall element by default is set to offscreen, hiding the modal.
  When the user clicks on a provider, the className for modal wall will be set to 'show',
  and bring the modal-wall element to the front of the app.

*/

export default Provider;

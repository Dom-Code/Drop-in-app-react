import React, { useContext, useState } from 'react';
import doc from '../images/doc.png';
import ProvidersContext from './Contexts/ProvidersContext';
import DisplayProviders from './DisplayProviders';
import '../component-css/providers.css';

const Provider = ({click}) => {
  const { providers } = useContext(ProvidersContext);
  const [cardVisibility, setCardVisibility] = useState(false);
  const [currentProvider, setCurrentProvider] = useState('');

  const providerClick = (e) => {
    e.preventDefault();
    let providerId = e.target.closest('section').getAttribute('id')
   

    let data = providers.filter(provider => {
      return provider.id === providerId
    })[0];

    setCurrentProvider(data);
    setCardVisibility(true);
  }

  // providerClick uses the event passed after the user clicks on a provider.
  // The id is used to locate the provider in the providers array. 

  const hideCard = (e) => {
    if (e.target.id === 'modal-wall') {
      setCardVisibility(false)
      setCurrentProvider('')
    }
  }

  /*
    hideCard will be invoked when the user clicks on the modal-wall, which is on the outside 
    of the provider card. The card is hidden and the current provider variable is set to 
    and empty string.
  */

  return (
    <div>
      <div id='modal-wall'
        className={ cardVisibility ? 'show' : 'offscreen' }
        onClick={e => hideCard(e)}>
        <div id='card-box'>
          <h3>{`${currentProvider.first_name} ${currentProvider.last_name} MD`}</h3>
          <img alt="provider" src={doc} />
          <div id='provider_data' className='tl pa4'>
            <p>Location: {currentProvider.city}</p>
            <p>Specialty: {currentProvider.specialty}</p>
            <p><a className='display-links' title="Login" href="/" onClick={click} >Sign in</a> or <a className="display-links" id="create" href="/" title="CreateUser" onClick={click}>Create an Account</a> to contact this provider</p>
          </div>
        </div>
      </div>
      <DisplayProviders click={providerClick}/> 
    </div>
  )
}

/* 
  the className for the modal-wall element by default is set to offscreen, hiding the modal.
  When the user clicks on a provider, the className for modal wall will be set to 'show', 
  and bring the modal-wall element to the front of the app. 
  
*/ 

export default Provider;

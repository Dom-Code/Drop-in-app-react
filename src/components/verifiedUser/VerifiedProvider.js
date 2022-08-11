/* eslint-disable react/destructuring-assignment, react/jsx-filename-extension */
import React, { useState } from 'react';
import doc from '../../images/doc.png';
import '../../component-css/providers.css';
import useProviders from '../hooks/useProviders';


const VerifiedProvider = (person) => {
  const { providers } = useProviders();
  const [cardVisibility, setCardVisibility] = useState(false);
  const [currentProvider, setCurrentProvider] = useState('');


  const providerClick = (e) => {
    let providerId = e.target.closest('section').getAttribute('id')
   
    let data = providers.filter(provider => {
      return provider.id === +providerId
    })[0];
    setCurrentProvider(data);
    setCardVisibility(true);
  }


  const hideCard = (e) => {
    if (e.target.id === 'modal-wall') {
      setCardVisibility(false)
      setCurrentProvider('')
    }
  }

  return (
    <>
      <div>
        <div id='modal-wall'
          className={ cardVisibility ? 'show' : 'offscreen' }
          onClick={e => hideCard(e)}>

          <div id='card-box'>
          <h3>{`${currentProvider.first_name} ${currentProvider.last_name} MD`}</h3>
          <img alt="provider" src={doc} />
          <div id='provider_data'>
            <h5>{currentProvider.city}, CA</h5>
            <h5>{currentProvider.specialty}</h5>
            <h5>Sorry, the provider you have selected is not currently accepting new patients.</h5>
          </div>
        </div>
    </div>
      </div>
      {providers.map((person) => {
        return (
          <section
            key={person.id} 
            id={person.id}
            className="bg-light-blue dib br3 pa3 ma2 grow tc bw2 shadow-5 person" 
            onClick={providerClick}>
            <img alt="provider" src={doc} />
            <div>
              <h3>
                {`${person.first_name} ${person.last_name} MD`}
              </h3>
              <p>{person.specialty}</p>
            </div>
          </section>
          )
        })
      }
    </>  
  )
}


export default VerifiedProvider;



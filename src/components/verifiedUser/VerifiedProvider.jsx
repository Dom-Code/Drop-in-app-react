/* eslint-disable react/destructuring-assignment, react/jsx-filename-extension */
import React, { useState } from 'react';
import doc from '../../images/doc.png';
import '../../component-css/main.css';
import useProviders from '../hooks/useProviders';
import useScroll from '../hooks/useScroll';

function VerifiedProvider() {
  const { providers } = useProviders();
  const [cardVisibility, setCardVisibility] = useState(false);
  const [currentProvider, setCurrentProvider] = useState('');
  const { setScroll } = useScroll()

  const providerClick = (e) => {
    const providerId = e.target.closest('section').getAttribute('id');

    const data = providers.filter((provider) => provider.id === +providerId)[0];
    setCurrentProvider(data);
    setCardVisibility(true);
    setScroll(false);
  };

  const hideCard = (e) => {
    if (e.target.id === 'modal-wall') {
      setCardVisibility(false);
      setCurrentProvider('');
      setScroll(true)
    }
  };

  // setScroll argument is passed back to parent which ends in main. 

  return (
    <>
      <div>
        <div
          id="modal-wall"
          className={cardVisibility ? 'show' : 'offscreen'}
          onClick={(e) => hideCard(e)}
        >

          <div id="card-box">
            <img id="doc-image" alt="provider" src={doc} />
              <div id="provider_data">
                <p id="provider-name">{`${currentProvider.first_name} ${currentProvider.last_name} MD`}</p>
                <p className='provider-details'>{currentProvider.specialty} </p>
                <p className='provider-details'>{currentProvider.city} </p> 
                <br/>
                <p className='provider-details'>This provider is currently accepting patients.    
                {" "}
                <a href="/">Proceed with this provider?</a>
                </p> 
              </div>
          </div>
        </div>
      </div>
      {providers.map((person) => (
        <section
          key={person.id}
          id={person.id}
          className="bg-light-blue dib br3 pa3 ma2 grow tc bw2 shadow-5 person"
          onClick={providerClick}
        >
          <img alt="provider" src={doc} />
          <div>
            <p id="provider-name-all-cards">
              {`${person.first_name} ${person.last_name} MD`}
            </p>
            <p>{person.specialty}</p>
          </div>
        </section>
      ))}
    </>
  );
}

export default VerifiedProvider;

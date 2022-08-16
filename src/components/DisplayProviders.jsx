import React, { useContext } from 'react';
import doc from '../images/doc.png';
import ProvidersContext from './Contexts/ProvidersContext';

function DisplayProviders({ click }) {
  const { providers } = useContext(ProvidersContext);
  const styles = {
    marginTop: '20px',
    height: 'auto',
    width: '200px',
  };

  return providers.map((person) => (
    <section
      key={person.id}
      id={person.id}
      className="bg-light-blue dib br3 pa3 ma2 grow tc bw2 shadow-5 "
      style={styles}
      onClick={click}
    >
      <img alt="provider" src={doc} />
      <div id="all-providers">
        <p id="provider-name-all-cards">
          {`${person.first_name} ${person.last_name} MD`}
        </p>
        <p className="provider-data-all-cards">{person.specialty}</p>
        <p className="provider-data-all-cards">{person.city}</p>
      </div>
    </section>
  ));
}

export default DisplayProviders;

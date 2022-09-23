import React, { useState } from 'react';
import useProviders from '../hooks/useProviders';
import { axiosPrivate } from '../../api/axios';
import useUser from '../hooks/useUser';

function Message(props) {
  const { chosen, switchView } = props;
  const { providers } = useProviders();
  const { id } = useUser();
  const [insurance, setInsurance] = useState('');
  const [insuranceNbr, setInsuranceNbr] = useState('');
  const [msg, setMsg] = useState('');

  const chosenProvider = providers.filter((prov) => {
    if (prov.id === chosen) {
      return prov;
    }
  })[0];

  const send = (e) => {
    e.preventDefault();

    const json = {
      userId: id,
      providerId: chosenProvider.id,
      insurance,
      insuranceNbr,
      msg,
    };

    axiosPrivate.post(
      '/api/sendMsg',
      JSON.stringify(json),
    ).then((res) => {
      console.log(res.data.msg);
      switchView('Submitted');
    })
      .catch((err) => console.log(err.msg));
  };

  return (
    <>
      <h3>{`Contacting Dr. ${chosenProvider.last_name}`}</h3>
      <form
        id="msg-form"
        style={{
          marginLeft: 'auto', marginRight: 'auto', marginTop: '10%', width: '400px', fontSize: '.90em',
        }}
      >
        <div style={{
          display: 'flex', justifyContent: 'space-between', textAlign: 'right', padding: '2px',
        }}
        >
          <label htmlFor="insurance">Type of insurance:</label>
          <input onChange={(e) => setInsurance(e.target.value)} type="text" id="insurance" style={{ width: '60%' }} />
        </div>
        <div style={{
          display: 'flex', justifyContent: 'space-between', textAlign: 'right', padding: '2px',
        }}
        >
          <label htmlFor="insurance-number">Insurance Number:</label>
          <input onChange={(e) => setInsuranceNbr(e.target.value)} type="text" id="insurance-number" style={{ width: '60%' }} />
        </div>
        <div id="message-box">
          <label htmlFor="event">
            Please describe the issues you are having and any other related information.
          </label>
          <textarea onChange={(e) => setMsg(e.target.value)} type="text" rows="12" maxLength="300" style={{ marginTop: '10px', width: '90%', marginBottom: '15px' }} />
        </div>
        <button type="submit" onClick={send} style={{ width: '100px', borderRadius: '10px' }}>Send</button>
      </form>
    </>
  );
}

export default Message;

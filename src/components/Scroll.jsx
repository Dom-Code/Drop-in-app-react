import React from 'react';

function Scroll(props) {
  const { children } = props;
  return (
    <div style={{ overflowY: 'scroll', height: '900px' }}>
      {children}
    </div>
  );
}

export default Scroll;

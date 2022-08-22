import React, { createContext, useState } from 'react';

const ScrollContext = createContext({});

export function ScrollProvider({ children }) {
  const [scroll, setScroll] = useState(true);

  return (
    <ScrollContext.Provider value={{ scroll, setScroll }}>
      {children}
    </ScrollContext.Provider>
  );
}

export default ScrollContext;

import React, { createContext, useState } from 'react';

const ProviderContext = createContext({});

export function ProviderFunc({ children }) {
  const [providers, changeProviders] = useState();

  return (
    <ProviderContext.Provider value={{ providers, changeProviders }}>
      {children}
    </ProviderContext.Provider>
  );
}

export default ProviderContext;

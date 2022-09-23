import React, { createContext, useState } from 'react';

const UserContext = createContext({});

export function User({ children }) {
  const [id, setId] = useState('');

  return (
    <UserContext.Provider value={{ id, setId }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;

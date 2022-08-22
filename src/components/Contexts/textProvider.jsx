import React, { createContext, useState } from 'react';

const TextContext = createContext({});

export function TextProvider({ children }) {
  const [text, changeText] = useState('');

  return (
    <TextContext.Provider value={{ text, changeText }}>
      {children}
    </TextContext.Provider>
  );
}



export default TextContext;
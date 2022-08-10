
import React, {createContext, useContext, useState} from "react";

const TextContext = createContext({})

const TextProvider = ({children}) => {
  const [text, changeText] = useState('');

  const value = {text, changeText};

  return (
    <TextContext.Provider value={value}>
      {children}
    </TextContext.Provider>
  )
}


const TextConsumer = ({children}) => {
  return (
      <TextContext.Consumer>
          {(context) => {
              if (context === undefined) {
                  throw new Error('TextConsumer must be used within TemplateProvider');
              }
              return children(context)
          }}
      </TextContext.Consumer>
  )
}


const useText = () => {
  const context = useContext(TextContext);
  if (!context) throw new Error('Something Happened.')
  return context;
}

export {TextProvider, TextConsumer, useText}
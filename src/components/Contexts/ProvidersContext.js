
import React, {createContext, useContext, useState} from "react";

const ProviderContext = createContext({})

export const ProviderFunc = ({children}) => {
  const [providers, changeProviders] = useState();


  return (
    <ProviderContext.Provider value={{providers, changeProviders}}>
      {children}
    </ProviderContext.Provider>
  )
}

export default ProviderContext


// const ProviderConsumer = ({children}) => {
//   return (
//       <ProviderContext.Consumer>
//           {(context) => {
//               if (context === undefined) {
//                   throw new Error('ProviderConsumer must be used within TemplateProvider');
//               }
//               return children(context)
//           }}
//       </ProviderContext.Consumer>
//   )
// }


// const useProviders = () => {
//   const context = useContext(ProviderContext);
//   if (!context) throw new Error('Something Happened.')
//   return context;
// }

// export {ProviderFunc, ProviderConsumer, useProviders}

// import { createContext } from "react";

// const ProvidersContext = createContext({})

// export default ProvidersContext;
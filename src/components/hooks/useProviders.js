import { useContext } from "react";
import ProviderFunc from "../Contexts/ProvidersContext";


const useProviders = () => {
  return useContext(ProviderFunc)
}


export default useProviders;
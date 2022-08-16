import { useContext } from 'react';
import ProviderFunc from '../Contexts/ProvidersContext';

const useProviders = () => useContext(ProviderFunc);

export default useProviders;

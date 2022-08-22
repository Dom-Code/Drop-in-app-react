import { useContext } from 'react';
import TextProvider  from '../Contexts/TextProvider';

const useText = () => useContext(TextProvider);

export default useText;

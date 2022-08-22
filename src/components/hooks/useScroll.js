import { useContext } from 'react';
import ScrollProvider from '../Contexts/ScrollProvider';

const useScroll = () => useContext(ScrollProvider);

export default useScroll;

import { useContext } from 'react';
import User from '../Contexts/UserData';

const useUser = () => useContext(User);

export default useUser;

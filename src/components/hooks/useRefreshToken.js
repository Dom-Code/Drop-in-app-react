import axios from '../../api/axios';
// import useAuth from './useAuth';

const useRefreshToken = () => {
  // const { setAuth } = useAuth();

  const refresh = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    const response = await axios.get('/api/refresh', {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });
    return response;
  };
  return refresh;
};

export default useRefreshToken;

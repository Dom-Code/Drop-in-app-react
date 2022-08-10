import axios from '../../api/axios';

const VerifiedUsedRefreshToken = () => {

  const refresh = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      const response = await axios.get('/api/refresh',{
        headers: {
          Authorization: `Bearer ${refreshToken}`
        }
      })
      return response
    } catch (err) {
      console.log(err)
    }

  }
  return refresh;
}

export default VerifiedUsedRefreshToken;

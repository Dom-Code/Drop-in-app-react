import { axiosPrivate  } from "../../api/axios";
import { useEffect } from "react";
import useRefreshToken from './useRefreshToken';
import { useNavigate } from 'react-router-dom';

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const accessToken = localStorage.getItem("accessToken")
  const navigate = useNavigate();

  useEffect(() => {
    
    const requestIntercept = axiosPrivate.interceptors.request.use(
      config => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        config.withCredentials = false;
        return config;
      }, (err) => Promise.reject(err)
    )

    const responseIntercept = axiosPrivate.interceptors.response.use(
      response => response,
      async (err) => {
        const prevReq = err?.config;
        if (err?.response.status === 403 && !prevReq?.sent) {
          prevReq.sent = true;
          const newAccessToken = await refresh();

          prevReq.headers['Authorization'] = `Bearer ${newAccessToken.data.accessToken}`
          return axiosPrivate(prevReq);
        } 
        console.log(err)
        return Promise.reject(err);
      }
    );
    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    }
  }, [refresh])

  return axiosPrivate;
}

export default useAxiosPrivate
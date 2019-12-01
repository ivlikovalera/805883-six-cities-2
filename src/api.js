import axios from 'axios';

export const createAPI = (dispatch) => {
  const api = axios.create({
    baseURL: `https://htmlacademy-react-2.appspot.com/six-cities`,
    timeout: 5000,
    withCredentials: true,
  });

  const onSuccess = (response) => response;

  const onFail = () => {
    dispatch();
    return;
  };

  api.interceptors.response.use(onSuccess, onFail);
  return api;
};

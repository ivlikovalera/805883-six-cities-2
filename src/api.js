import axios from 'axios';
import {ActionCreator as UserActionCreator} from './reducer/user/reducer.js';

export const createAPI = (dispatch) => {
  const api = axios.create({
    baseURL: `https://htmlacademy-react-2.appspot.com/six-cities`,
    timeout: 5000,
    withCredentials: true,
  });

  const onSuccess = (response) => response;

  const onFail = (err) => {
    if (err.response.status === 401) {
      dispatch(UserActionCreator.unauthorazed());
      dispatch(UserActionCreator.authorizationRequired(true));
    }
    return err;
  };

  api.interceptors.response.use(onSuccess, onFail);
  return api;
};

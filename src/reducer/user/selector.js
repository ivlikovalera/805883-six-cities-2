import {NameSpace} from './../name-spaces.js';

export const getIsAuthorizationRequired = (state) => {
  return state[NameSpace.USER].isAuthorizationRequired;
};

export const getLogin = (state) => {
  return state[NameSpace.USER].login;
};

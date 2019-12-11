import {adapterUserData} from './../../adapter/adapter.js';
import {SIGN_IN} from './../../utils.js';

const initialState = {
  isAuthorizationRequired: true,
  user: {},
  login: SIGN_IN,
};

export const ActionType = {
  AUTHORIZATION_REQUIRED: `AUTHORIZATION_REQUIRED`,
  AUTHORIZATION: `AUTHORIZATION`,
  UNAUTHORAZED: `UNAUTHORIZED`
};

export const ActionCreator = {
  authorizationRequired: (status) => ({
    type: ActionType.AUTHORIZATION_REQUIRED,
    payload: status,
  }),

  authorization: (user) => ({
    type: ActionType.AUTHORIZATION,
    payload: user,
  }),

  unauthorazed: () => ({
    type: ActionType.UNAUTHORAZED,
  })
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.AUTHORIZATION_REQUIRED:
      return Object.assign({}, state, {
        isAuthorizationRequired: action.payload,
      });
    case ActionType.AUTHORIZATION:
      return Object.assign({}, state, {
        login: adapterUserData(action.payload).email,
        user: adapterUserData(action.payload),
      });
    case ActionType.UNAUTHORAZED:
      if (state.isAuthorizationRequired === false) {
        return Object.assign({}, state, {
          login: SIGN_IN,
          user: Object.assign({}, {}),
        });
      }
  }
  return state;
};

export const Operation = {
  authorizationStatus: () => (dispatch, _getState, api) => {
    return api.get(`/login`)
      .then((response) => {
        if (response.status === 200) {
          dispatch(ActionCreator.authorizationRequired(false));
        }
      });
  },
  authorization: (credentials) => (dispatch, _getState, api) => {
    return api.post(`/login`, credentials)
      .then((response) => {
        if (response.status === 200) {
          dispatch(ActionCreator.authorization(response.data));
          dispatch(ActionCreator.authorizationRequired(false));
        }
      });
  },
  checkAuthorization: () => (dispatch, _getState, api) => {
    return api.get(`/login`)
      .then((response) => {
        if (response.status === 200) {
          dispatch(ActionCreator.authorization(response.data));
          dispatch(ActionCreator.authorizationRequired(false));
        }
      });
  },
};

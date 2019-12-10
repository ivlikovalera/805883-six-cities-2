import {adapterUserData} from './../../adapter/adapter.js';

const initialState = {
  isFetching: false,
  isAuthorizationRequired: true,
  user: {},
  login: `Sign in`,
};

export const ActionType = {
  AUTHORIZATION_REQUIRED: `AUTHORIZATION_REQUIRED`,
  AUTHORIZATION: `AUTHORIZATION`,
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
        userData: adapterUserData(action.payload),
      });
    case ActionType.CHANGE_FETCHING:
      return Object.assign({}, state, {
        isFetching: action.payload,
      });
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

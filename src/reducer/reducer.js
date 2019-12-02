import {getUniqueCities} from './../utils.js';
import {adapter} from './../adapter/adapter.js';

const initialState = {
  activeCity: {},
  listOffer: [],
  uniqueCities: [],
  offers: [],
  isAuthorizationRequired: false,
};

const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  GET_LIST_OF_OFFERS: `GET_LIST_OF_OFFERS`,
  LOAD_OFFERS: `LOAD_OFFERS`,
  AUTHORIZATION: `AUTHORIZATION`,
};

export const ActionCreator = {
  changeCity: (name) => ({
    type: ActionType.CHANGE_CITY,
    payload: name,
  }),

  getOffers: () => ({
    type: ActionType.GET_LIST_OF_OFFERS,
  }),

  loadOffers: (offers) => ({
    type: ActionType.LOAD_OFFERS,
    payload: offers,
  }),

  authorization: () => ({
    type: ActionType.AUTHORIZATION,
  })
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return Object.assign({}, state, {
        activeCity: state.uniqueCities.find((city) => city.name === action.payload),
      });
    case ActionType.GET_LIST_OF_OFFERS:
      return Object.assign({}, state, {
        listOffer: state.offers.filter((offer) => offer.city.name === state.activeCity.name)
      });
    case ActionType.LOAD_OFFERS:
      const cities = getUniqueCities(action.payload);
      return Object.assign({}, state, {
        offers: action.payload.map((offer) => adapter(offer)),
        uniqueCities: cities,
        activeCity: cities[Math.floor(Math.random() * 5)],
      });
    case ActionType.AUTHORIZATION:
      return Object.assign({}, state, {
        isAuthorizationRequired: !state.isAuthorizationRequired,
      });
  }
  return state;
};

export const Operation = {
  loadOffers: () => (dispatch, _getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        const loadedOffers = response.data;
        dispatch(ActionCreator.loadOffers(loadedOffers));
        dispatch(ActionCreator.getOffers());
      });
  }
};

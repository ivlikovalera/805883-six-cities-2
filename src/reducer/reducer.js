import {getUniqueCities} from './../utils.js';
import {adapterOffers, adapterUserData, adapterReviewData} from './../adapter/adapter.js';

const initialState = {
  activeCity: {},
  listOffer: [],
  uniqueCities: [],
  offers: [],
  isAuthorizationRequired: true,
  user: {},
  login: `Sign in`,
  reviews: [],
};

export const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  GET_LIST_OF_OFFERS: `GET_LIST_OF_OFFERS`,
  LOAD_OFFERS: `LOAD_OFFERS`,
  AUTHORIZATION_REQUIRED: `AUTHORIZATION_REQUIRED`,
  AUTHORIZATION: `AUTHORIZATION`,
  CHANGE_FAVORITE: `CHANGE_FAVORITE`,
  GET_REVIEWS: `GET_REVIEWS`,
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

  authorizationRequired: (status) => ({
    type: ActionType.AUTHORIZATION_REQUIRED,
    payload: status,
  }),

  authorization: (user) => ({
    type: ActionType.AUTHORIZATION,
    payload: user,
  }),

  changeFavorite: (id) => ({
    type: ActionType.CHANGE_FAVORITE,
    payload: id,
  }),

  getReviews: (id, reviews) => ({
    type: ActionType.GET_REVIEWS,
    payload: {
      id,
      reviews,
    }
  })
};

export const reducer = (state = initialState, action) => {
  const findOfferIndexById = (id) => {
    return state.offers.findIndex((offer) => offer.id === id);
  };

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
        offers: action.payload.map((offer) => adapterOffers(offer)),
        uniqueCities: cities,
        activeCity: cities[Math.floor(Math.random() * 5)],
      });
    case ActionType.AUTHORIZATION_REQUIRED:
      return Object.assign({}, state, {
        isAuthorizationRequired: action.payload,
      });
    case ActionType.AUTHORIZATION:
      return Object.assign({}, state, {
        login: adapterUserData(action.payload).email,
        userData: adapterUserData(action.payload),
      });
    case ActionType.CHANGE_FAVORITE:
      const offerIndex = findOfferIndexById(action.payload);
      state.offers[offerIndex].isFavorite = !state.offers[offerIndex].isFavorite;
      return Object.assign({}, state);

    case ActionType.GET_REVIEWS:
      const reviews = action.payload.reviews.map((it) => adapterReviewData(it));
      return Object.assign({}, state, {
        reviews,
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
  },
  getReviews: (id) => (dispatch, _getState, api) => {
    return api.get(`/comments/${id}`)
      .then((response) => {
        if (response.status === 200) {
          dispatch(ActionCreator.getReviews(id, response.data));
        }
      });
  },
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
};

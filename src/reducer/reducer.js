import {getUniqueCities, selectFilter} from './../utils.js';
import {adapterOffers, adapterUserData, adapterReviewData} from './../adapter/adapter.js';

const initialState = {
  activeCity: {},
  isFetching: false,
  listOffer: [],
  uniqueCities: [],
  offers: [],
  isAuthorizationRequired: true,
  user: {},
  login: `Sign in`,
  reviews: [],
  activeOfferId: null,
};

export const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  GET_LIST_OF_OFFERS: `GET_LIST_OF_OFFERS`,
  LOAD_OFFERS: `LOAD_OFFERS`,
  AUTHORIZATION_REQUIRED: `AUTHORIZATION_REQUIRED`,
  AUTHORIZATION: `AUTHORIZATION`,
  CHANGE_FAVORITE: `CHANGE_FAVORITE`,
  GET_REVIEWS: `GET_REVIEWS`,
  CHANGE_FETCHING: `CHANGE_FETCHING`,
  SORT_OFFERS: `SORT_OFFERS`,
  CHANGE_ACTIVE: `CHANGE_ACTIVE`,
};

export const ActionCreator = {
  changeCity: (name) => ({
    type: ActionType.CHANGE_CITY,
    payload: name,
  }),

  getOffers: () => ({
    type: ActionType.GET_LIST_OF_OFFERS,
  }),

  loadOffers: (offers, uniqueCities) => ({
    type: ActionType.LOAD_OFFERS,
    payload: {
      offers,
      uniqueCities,
    }
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
  }),

  changeFetching: (status) => ({
    type: ActionType.CHANGE_FETCHING,
    payload: status,
  }),

  sortOffers: (filter) => ({
    type: ActionType.SORT_OFFERS,
    payload: filter,
  }),

  changeActive: (id) => ({
    type: ActionType.CHANGE_ACTIVE,
    payload: id,
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
      return Object.assign({}, state, {
        offers: action.payload.offers,
        uniqueCities: action.payload.uniqueCities,
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
      return Object.assign({}, state, {
        offers: state.offers.slice()
      });

    case ActionType.GET_REVIEWS:
      const reviews = action.payload.reviews.map((it) => adapterReviewData(it));
      return Object.assign({}, state, {
        reviews: reviews.slice(),
      });
    case ActionType.CHANGE_FETCHING:
      return Object.assign({}, state, {
        isFetching: action.payload,
      });
    case ActionType.SORT_OFFERS: {
      const filterOffers = state.listOffer;
      filterOffers.sort(selectFilter(action.payload));
      return Object.assign({}, state, {
        listOffer: filterOffers.slice(),
      });
    }
    case ActionType.CHANGE_ACTIVE: {
      return Object.assign({}, state, {
        activeOfferId: action.payload,
      });
    }
  }
  return state;
};

export const Operation = {
  loadOffers: () => (dispatch, _getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        const allOffers = response.data.map((offer) => adapterOffers(offer));
        const uniqueCities = getUniqueCities(allOffers);
        dispatch(ActionCreator.loadOffers(allOffers, uniqueCities));
        dispatch(ActionCreator.changeCity(uniqueCities[Math.floor(Math.random() * 5)].name));
        dispatch(ActionCreator.getOffers());
        dispatch(ActionCreator.changeFetching(false));
      });
  },
  loadOffersInOfferPage: (id) => (dispatch, _getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        const allOffers = response.data.map((offer) => adapterOffers(offer));
        const uniqueCities = getUniqueCities(allOffers);
        dispatch(ActionCreator.loadOffers(allOffers, uniqueCities));
        dispatch(ActionCreator.changeCity(allOffers[allOffers.findIndex(
            (it) => it.id === id)].city.name));
        dispatch(ActionCreator.getOffers());
        dispatch(Operation.getReviews(id));
        dispatch(ActionCreator.changeActive(id));
      });
  },
  getReviews: (id) => (dispatch, _getState, api) => {
    return api.get(`/comments/${id}`)
      .then((response) => {
        if (response.status === 200) {
          dispatch(ActionCreator.getReviews(id, response.data));
        }
        dispatch(ActionCreator.changeFetching(false));
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

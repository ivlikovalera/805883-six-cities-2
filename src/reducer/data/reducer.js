import moment from 'moment';
import {getUniqueCities, selectFilter, FilterType} from './../../utils.js';
import {adapterOffers, adapterReviewData} from './../../adapter/adapter.js';
import {NameSpace} from './../name-spaces.js';

const initialState = {
  activeCity: {},
  isFetching: false,
  listOffer: [],
  uniqueCities: [],
  offers: [],
  reviews: [],
  activeOfferId: null,
  favoritePlaces: [],
  selectedFilter: FilterType.POPULAR,
};

export const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  GET_LIST_OF_OFFERS: `GET_LIST_OF_OFFERS`,
  LOAD_OFFERS: `LOAD_OFFERS`,
  CHANGE_FAVORITE: `CHANGE_FAVORITE`,
  GET_REVIEWS: `GET_REVIEWS`,
  CHANGE_FETCHING: `CHANGE_FETCHING`,
  SORT_OFFERS: `SORT_OFFERS`,
  CHANGE_ACTIVE: `CHANGE_ACTIVE`,
  GET_FAVORITES: `GET_FAVORITES`,
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

  changeFavorite: (offer) => ({
    type: ActionType.CHANGE_FAVORITE,
    payload: offer,
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
  }),

  getFavorites: (places) => ({
    type: ActionType.GET_FAVORITES,
    payload: places,
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
        listOffer: state.offers.filter((offer) => offer.city.name === state.activeCity.name).slice(),
      });
    case ActionType.LOAD_OFFERS:
      return Object.assign({}, state, {
        offers: action.payload.offers,
        uniqueCities: action.payload.uniqueCities,
      });
    case ActionType.CHANGE_FAVORITE:
      const offerIndex = findOfferIndexById(action.payload.id);
      state.offers[offerIndex] = action.payload;
      return Object.assign({}, state, {
        offers: state.offers.slice()
      });

    case ActionType.GET_REVIEWS:
      const reviews = action.payload.reviews.map((it) => adapterReviewData(it))
        .sort((a, b) => moment(b.date).format(`x`) - moment(a.date).format(`x`));
      return Object.assign({}, state, {
        reviews: reviews.slice(0, 10),
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
        selectedFilter: action.payload,
      });
    }
    case ActionType.CHANGE_ACTIVE: {
      return Object.assign({}, state, {
        activeOfferId: action.payload,
      });
    }
    case ActionType.GET_FAVORITES: {
      return Object.assign({}, state, {
        favoritePlaces: action.payload,
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
        dispatch(ActionCreator.changeCity(uniqueCities[Math.
          floor(Math.random() * (uniqueCities.length - 1))].name));
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
  sendReview: (review, id) => (dispatch, _getState, api) => {
    return api.post(`/comments/${id}`, review)
      .then((response) => {
        if (response.status === 200) {
          dispatch(Operation.getReviews(id));
        }
      });
  },
  loadFavorites: () => (dispatch, _getState, api) => {
    return api.get(`/favorite`)
      .then((response) => {
        if (response.status === 200) {
          const favoritePlaces = response.data;
          dispatch(ActionCreator.getFavorites(favoritePlaces
            .map((place) => adapterOffers(place))));
        }
      });
  },
  changeFavorite: (id) => (dispatch, _getState, api) => {
    const status = !(_getState()[NameSpace.DATA].offers.find((it) => it.id === id).isFavorite);
    return api.post(`/favorite/${id}/${status ? 1 : 0}`).
      then((response) => {
        if (response.status === 200) {
          dispatch(ActionCreator.changeFavorite(adapterOffers(response.data)));
          dispatch(ActionCreator.getOffers());
          dispatch(Operation.loadFavorites());
        }
      });
  },
};

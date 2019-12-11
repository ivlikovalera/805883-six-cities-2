import moment from 'moment';
import {getUniqueCities, selectFilter, FilterType} from './../../utils.js';
import {adapterOffers, adapterReviewData} from './../../adapter/adapter.js';
import {NameSpace} from './../name-spaces.js';

const initialState = {
  activeCity: {},
  isFetching: false,
  listOffers: [],
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

  onLoadOffers: (offers, uniqueCities) => ({
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

  onGetReviews: (reviews) => ({
    type: ActionType.GET_REVIEWS,
    payload: reviews
  }),

  onChangeFetching: (status) => ({
    type: ActionType.CHANGE_FETCHING,
    payload: status,
  }),

  onSortOffers: (filter) => ({
    type: ActionType.SORT_OFFERS,
    payload: filter,
  }),

  onChangeActive: (id) => ({
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
        listOffers: state.offers.filter((offer) => offer.city.name === state.activeCity.name).slice(),
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
      const reviews = action.payload
        .sort((a, b) => moment(b.date).format(`x`) - moment(a.date).format(`x`));
      return Object.assign({}, state, {
        reviews: reviews.slice(0, 10),
      });
    case ActionType.CHANGE_FETCHING:
      return Object.assign({}, state, {
        isFetching: action.payload,
      });
    case ActionType.SORT_OFFERS: {
      return Object.assign({}, state, {
        offers: state.offers.sort(selectFilter(action.payload)).slice(),
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
  onLoadOffers: () => (dispatch, _getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        const allOffers = response.data.map((offer) => adapterOffers(offer));
        const uniqueCities = getUniqueCities(allOffers);
        dispatch(ActionCreator.onLoadOffers(allOffers, uniqueCities));
        dispatch(ActionCreator.changeCity(uniqueCities[Math.
          floor(Math.random() * (uniqueCities.length - 1))].name));
        dispatch(ActionCreator.getOffers());
        dispatch(ActionCreator.onChangeFetching(false));
      });
  },
  onLoadOffersInOfferPage: (id) => (dispatch, _getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        const allOffers = response.data.map((offer) => adapterOffers(offer));
        const uniqueCities = getUniqueCities(allOffers);
        dispatch(ActionCreator.onLoadOffers(allOffers, uniqueCities));
        dispatch(ActionCreator.changeCity(allOffers[allOffers.findIndex(
            (it) => it.id === id)].city.name));
        dispatch(ActionCreator.getOffers());
        dispatch(Operation.onGetReviews(id));
        dispatch(ActionCreator.onChangeActive(id));
      });
  },
  onGetReviews: (id) => (dispatch, _getState, api) => {
    return api.get(`/comments/${id}`)
      .then((response) => {
        if (response.status === 200) {
          dispatch(ActionCreator.onGetReviews(response.data.map((it) => adapterReviewData(it))));
        }
        dispatch(ActionCreator.onChangeFetching(false));
      });
  },
  onSendReview: (review, id) => (dispatch, _getState, api) => {
    return api.post(`/comments/${id}`, review)
      .then((response) => {
        if (response.status === 200) {
          dispatch(Operation.onGetReviews(id));
        }
      });
  },
  onLoadFavorites: () => (dispatch, _getState, api) => {
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
          dispatch(Operation.onLoadFavorites());
        }
      });
  },
};

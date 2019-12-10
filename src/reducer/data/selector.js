// import {createSelector} from 'reselect';

import {NameSpace} from './../name-spaces.js';

export const getActiveCity = (state) => {
  return state[NameSpace.DATA].activeCity;
};

export const getOffers = (state) => {
  return state[NameSpace.DATA].offers;
};

export const getCurrentReviews = (state) => {
  return state[NameSpace.DATA].reviews;
};

export const getFetching = (state) => {
  return state[NameSpace.DATA].isFetching;
};

export const getlistOffers = (state) => {
  return state[NameSpace.DATA].listOffers;
};

export const getUniqueCities = (state) => {
  return state[NameSpace.DATA].uniqueCities;
};

export const getActiveOfferId = (state) => {
  return state[NameSpace.DATA].activeOfferId;
};

export const getFavoritePlaces = (state) => {
  return state[NameSpace.DATA].favoritePlaces;
};

export const getSelectedFilter = (state) => {
  return state[NameSpace.DATA].selectedFilter;
};

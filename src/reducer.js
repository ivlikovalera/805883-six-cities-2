import {offers} from './mocks/offers.js';
import {namesOfUniqueCities} from './utils.js';

const initialState = {
  activeCity: namesOfUniqueCities[0],
  listOffer: offers.filter((offer) => offer.city.name === namesOfUniqueCities[0].name)
};

export const ActionCreator = {
  changeCity: (name) => ({
    type: `CHANGE_CITY`,
    payload: name,
  }),

  getOffers: () => ({
    type: `GET_LIST_OF_OFFERS`,
  }),


};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `CHANGE_CITY`:
      return Object.assign({}, state, {
        activeCity: namesOfUniqueCities.find((city) => city.name === action.payload),
      });
    case `GET_LIST_OF_OFFERS`:
      return Object.assign({}, state, {
        listOffer: offers.filter((offer) => offer.city.name === state.activeCity.name)
      });
  }
  return state;
};

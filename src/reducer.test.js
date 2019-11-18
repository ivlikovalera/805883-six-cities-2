import {offers} from './mocks/offers.js';
import {namesOfUniqueCities} from './utils.js';
import {reducer} from './reducer.js';

describe(`reducer`, () => {
  it(`should return the initial state`, () => {
    expect(reducer(undefined, {})).toEqual(
        {
          activeCity: namesOfUniqueCities[0],
          listOffer: offers.filter((offer) =>
            offer.city.name === namesOfUniqueCities[0].name),
        }
    );
  });

  it(`should handle CHANGE_CITY`, () => {
    expect(
        reducer(undefined, {
          type: `CHANGE_CITY`,
          payload: namesOfUniqueCities[3].name,
        })
    ).toEqual(
        {
          activeCity: namesOfUniqueCities[3],
          listOffer: offers.filter((offer) =>
            offer.city.name === namesOfUniqueCities[0].name),
        }
    );
  });

  it(`should handle GET_LIST_OF_OFFERS`, () => {
    expect(
        reducer(
            {
              activeCity: namesOfUniqueCities[2],
              listOffer: offers.filter((offer) =>
                offer.city.name === namesOfUniqueCities[0].name),
            },
            {
              type: `GET_LIST_OF_OFFERS`,
            }
        )
    ).toEqual(
        {
          activeCity: namesOfUniqueCities[2],
          listOffer: offers.filter((offer) =>
            offer.city.name === namesOfUniqueCities[2].name),
        }
    );
  });
});

import {Operation, reducer, ActionType} from './reducer.js';
import MockAdapter from 'axios-mock-adapter';
import {createAPI} from './../api.js';
// import {adapterOffers} from './../adapter/adapter.js';

const fakeOfferData = () => {
  return [{
    id: 1,
    city: {
      name: `Barnaul`,
      location: {
        latitude: 12,
        longitude: 5,
        zoom: 3
      },
    },
    previewImage: `localhost:1177/`,
    isPremium: false,
    isFavorite: true,
    price: 12,
    title: `Hotel`,
    type: `Palace`,
    rating: 3,
    images: [`/12.jpg`, `/15.jpg`],
    location: {
      latitude: 3.44,
      longitude: 16.55,
      zoom: 7,
    },
    description: `Description`,
    host: {
      id: `7`,
      name: `Vasya`,
      isPro: true,
      avatarUrl: `user1.jpg`,
    },
    numOfBedrooms: 3,
    goods: 2,
    maxAdults: 5,
  }];
};

describe(`reducer`, () => {
  it(`should return the initial state`, () => {
    expect(reducer(undefined, {})).toEqual(
        {
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
        }
    );
  });

  it(`should handle LOAD_OFFERS`, () => {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const offersLoader = Operation.loadOffers();

    apiMock
      .onGet(`/hotels`)
      .reply(200, fakeOfferData());

    return offersLoader(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(4);
        /* expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_OFFERS,
          payload: {
            offers: adapterOffers(fakeOfferData()),
            uniqueCities: adapterOffers(fakeOfferData())[0].city,
          },
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.CHANGE_CITY,
          payload: adapterOffers(fakeOfferData())[0].city.name
        }); */
      });
  });

  it(`should handle CHANGE_CITY`, () => {
    expect(
        reducer({
          activeCity: {},
          listOffer: [],
          offers: [
            {
              id: 1,
              city: {
                name: `Amsterdam`,
              },
            },
            {
              id: 2,
              city: {
                name: `Hamburg`,
              },
            }
          ],
          uniqueCities: [
            {
              name: `Hamburg`,
            },
            {
              name: `Amsterdam`,
            },
          ]
        },
        {
          type: ActionType.CHANGE_CITY,
          payload: `Hamburg`,
        })
    ).toEqual(
        {
          activeCity: {
            name: `Hamburg`,
          },
          listOffer: [],
          offers: [
            {
              id: 1,
              city: {
                name: `Amsterdam`,
              },
            },
            {
              id: 2,
              city: {
                name: `Hamburg`,
              },
            }
          ],
          uniqueCities: [
            {
              name: `Hamburg`,
            },
            {
              name: `Amsterdam`,
            },
          ]
        }
    );
  });

  it(`should handle GET_LIST_OF_OFFERS`, () => {
    expect(
        reducer({
          activeCity: {
            name: `Amsterdam`,
          },
          listOffer: [],
          offers: [
            {
              id: 3,
              city: {
                name: `Amsterdam`,
              },
            },
            {
              id: 4,
              city: {
                name: `Hamburg`,
              }
            },
            {
              id: 5,
              city: {
                name: `Amsterdam`,
              },
            },
          ],
          uniqueCities: [
            {
              name: `Hamburg`,
            },
            {
              name: `Amsterdam`,
            },
          ]
        },
        {
          type: ActionType.GET_LIST_OF_OFFERS,
        })
    ).toEqual(
        {
          activeCity: {
            name: `Amsterdam`,
          },
          listOffer: [
            {
              id: 3,
              city: {
                name: `Amsterdam`,
              },
            },
            {
              id: 5,
              city: {
                name: `Amsterdam`,
              }
            },
          ],
          offers: [
            {
              id: 3,
              city: {
                name: `Amsterdam`,
              },
            },
            {
              id: 4,
              city: {
                name: `Hamburg`,
              },
            },
            {
              id: 5,
              city: {
                name: `Amsterdam`,
              },
            }
          ],
          uniqueCities: [
            {
              name: `Hamburg`,
            },
            {
              name: `Amsterdam`,
            },
          ]
        }
    );
  });
});

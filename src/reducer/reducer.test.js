import {Operation, reducer, ActionType} from './reducer.js';
import MockAdapter from "axios-mock-adapter";
import {createAPI} from "./../api.js";

describe(`reducer`, () => {
  it(`should return the initial state`, () => {
    expect(reducer(undefined, {})).toEqual(
        {
          activeCity: {},
          listOffer: [],
          uniqueCities: [],
          offers: [],
          isAuthorizationRequired: true,
          userData: {},
          login: `Sign in`,
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
      .reply(200, [{fake: true}]);

    return offersLoader(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_OFFERS,
          payload: [{fake: true}],
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.GET_LIST_OF_OFFERS,
        });
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

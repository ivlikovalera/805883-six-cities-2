import moment from 'moment';
import {Operation, reducer, ActionType} from './reducer.js';
import MockAdapter from 'axios-mock-adapter';
import {createAPI} from './../../api.js';
import {FilterType} from './../../utils.js';
import {getMockReview, getMockOffer, getMockState} from './test-mock.js';
import {adapterOffers, adapterReviewData} from './../../adapter/adapter.js';

describe(`reducer`, () => {
  it(`should return the initial state`, () => {
    expect(reducer(undefined, {})).toEqual(
        {
          activeCity: {},
          isFetching: false,
          listOffers: [],
          uniqueCities: [],
          offers: [],
          reviews: [],
          activeOfferId: null,
          favoritePlaces: [],
          selectedFilter: FilterType.POPULAR,
        }
    );
  });

  it(`should handle CHANGE_CITY`, () => {
    expect(
        reducer({
          activeCity: {},
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
          listOffers: [],
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
        },
        {
          type: ActionType.GET_LIST_OF_OFFERS,
        })
    ).toEqual({
      activeCity: {
        name: `Amsterdam`,
      },
      listOffers: [
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
      ]
    }
    );
  });

  it(`should handle LOAD_OFFERS`, () => {
    expect(
        reducer({
          uniqueCities: [],
          offers: []
        },
        {
          type: ActionType.LOAD_OFFERS,
          payload: {
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
            ],
          }
        })
    ).toEqual(
        {
          uniqueCities: [
            {
              name: `Hamburg`,
            },
            {
              name: `Amsterdam`,
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
        }
    );
  });

  it(`should handle CHANGE_FAVORITE`, () => {
    expect(
        reducer({
          offers: [
            {
              id: 3,
              isFavorite: false,
            },
            {
              id: 4,
              isFavorite: false
            },
          ]
        },
        {
          type: ActionType.CHANGE_FAVORITE,
          payload: {
            id: 4,
            isFavorite: true,
          },
        })
    ).toEqual(
        {
          offers: [
            {
              id: 3,
              isFavorite: false,
            },
            {
              id: 4,
              isFavorite: true
            },
          ]
        }
    );
  });

  it(`should handle GET_REVIEWS`, () => {
    expect(
        reducer({
          reviews: []
        },
        {
          type: ActionType.GET_REVIEWS,
          payload: getMockReview()
        })
    ).toEqual({
      reviews: getMockReview()
        .sort((a, b) => moment(b.date).format(`x`) - moment(a.date).format(`x`))
    }
    );
  });

  it(`should handle CHANGE_FETCHING`, () => {
    expect(
        reducer({
          isFetching: false,
        },
        {
          type: ActionType.CHANGE_FETCHING,
          payload: true
        })
    ).toEqual({
      isFetching: true,
    }
    );
  });

  it(`should handle SORT_OFFERS`, () => {
    expect(
        reducer({
          offers: [
            {
              id: 3,
              price: 20,
            },
            {
              id: 4,
              price: 5
            },
            {
              id: 5,
              price: 10,
            },
          ],
          selectedFilter: FilterType.POPULAR
        },
        {
          type: ActionType.SORT_OFFERS,
          payload: FilterType.PRICE
        })
    ).toEqual({
      offers: [
        {
          id: 4,
          price: 5
        },
        {
          id: 5,
          price: 10,
        },
        {
          id: 3,
          price: 20,
        },
      ],
      selectedFilter: FilterType.PRICE
    }
    );
  });

  it(`should handle CHANGE_ACTIVE`, () => {
    expect(
        reducer({
          activeOfferId: 2,
        },
        {
          type: ActionType.CHANGE_ACTIVE,
          payload: 5
        })
    ).toEqual({
      activeOfferId: 5,
    }
    );
  });

  it(`should handle GET_FAVORITES`, () => {
    expect(
        reducer({
          favoritePlaces: []
        },
        {
          type: ActionType.GET_FAVORITES,
          payload: [
            {
              id: 3,
            },
            {
              id: 4,
            },
          ],
        })
    ).toEqual(
        {
          favoritePlaces: [
            {
              id: 3,
            },
            {
              id: 4,
            },
          ],
        }
    );
  });
});

describe(`Operation`, () => {
  it(`should handle onLoadOffers`, () => {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const onLoadOffers = Operation.onLoadOffers();
    const mockOffer = adapterOffers(getMockOffer());
    apiMock
    .onGet(`/hotels`)
    .reply(200, [getMockOffer()]);

    return onLoadOffers(dispatch, jest.fn(), api)
    .then(() => {
      expect(dispatch).toHaveBeenCalledTimes(4);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.LOAD_OFFERS,
        payload: {
          offers: [mockOffer],
          uniqueCities: [mockOffer.city]
        },
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: ActionType.CHANGE_CITY,
        payload: `Ekaterinburg`,
      }
      );
      expect(dispatch).toHaveBeenNthCalledWith(3, {
        type: ActionType.GET_LIST_OF_OFFERS,
      }
      );
      expect(dispatch).toHaveBeenNthCalledWith(4, {
        type: ActionType.CHANGE_FETCHING,
        payload: false,
      });
    });
  });

  it(`should handle onLoadOffersInOfferPage`, () => {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const onLoadOffersInOfferPage = Operation.onLoadOffersInOfferPage(15);
    const mockOffer = adapterOffers(getMockOffer());

    apiMock
      .onGet(`/hotels`)
      .reply(200, [getMockOffer()]);

    return onLoadOffersInOfferPage(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(5);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_OFFERS,
          payload: {
            offers: [mockOffer],
            uniqueCities: [mockOffer.city]
          },
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.CHANGE_CITY,
          payload: `Ekaterinburg`,
        }
        );
        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: ActionType.GET_LIST_OF_OFFERS,
        }
        );
        expect(dispatch).toHaveBeenNthCalledWith(4, expect.any(Function));
        expect(dispatch).toHaveBeenNthCalledWith(5, {
          type: ActionType.CHANGE_ACTIVE,
          payload: 15,
        });
      });
  });

  it(`should handle onGetReviews`, () => {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const onGetReviews = Operation.onGetReviews(5);
    const mockReviews = getMockReview().map((it) => adapterReviewData(it));

    apiMock
      .onGet(`/comments/5`)
      .reply(200, getMockReview());

    return onGetReviews(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.GET_REVIEWS,
          payload: mockReviews
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.CHANGE_FETCHING,
          payload: false,
        });
      });
  });

  it(`should handle onSendReview`, () => {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const onSendReview = Operation.onSendReview({}, 5);

    apiMock
      .onPost(`/comments/5`)
      .reply(200, {});

    return onSendReview(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
      });
  });

  it(`should handle onLoadFavorites`, () => {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const onLoadFavorites = Operation.onLoadFavorites();

    apiMock
      .onGet(`/favorite`)
      .reply(200, [getMockOffer()]);

    return onLoadFavorites(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.GET_FAVORITES,
          payload: [adapterOffers(getMockOffer())],
        });
      });
  });

  it(`should handle changeFavorite`, () => {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const changeFavorite = Operation.changeFavorite(15);

    apiMock
      .onPost(`/favorite/15/0`)
      .reply(200, getMockOffer());

    return changeFavorite(dispatch, getMockState, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.CHANGE_FAVORITE,
          payload: adapterOffers(getMockOffer())
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.GET_LIST_OF_OFFERS,
        });
        expect(dispatch).toHaveBeenNthCalledWith(3, expect.any(Function));
      });
  });
});

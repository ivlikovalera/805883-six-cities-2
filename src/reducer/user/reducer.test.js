import {Operation, reducer, ActionType} from './reducer.js';
import MockAdapter from 'axios-mock-adapter';
import {createAPI} from './../../api.js';
import {SIGN_IN} from './../../utils.js';

describe(`reducer`, () => {
  it(`should return the initial state`, () => {
    expect(reducer(undefined, {})).toEqual(
        {
          isAuthorizationRequired: true,
          user: {},
          login: SIGN_IN,
        }
    );
  });

  it(`should handle AUTHORIZATION_REQUIRED`, () => {
    expect(
        reducer({
          isAuthorizationRequired: true,
          user: {},
          login: SIGN_IN,
        },
        {
          type: ActionType.AUTHORIZATION_REQUIRED,
          payload: false,
        })
    ).toEqual(
        {
          isAuthorizationRequired: false,
          user: {},
          login: SIGN_IN,
        }
    );
  });

  it(`should handle AUTHORIZATION`, () => {
    expect(
        reducer({
          isAuthorizationRequired: true,
          user: {},
          login: SIGN_IN
        },
        {
          type: ActionType.AUTHORIZATION,
          payload: {
            id: 0,
            email: `johndoe@mail.com`,
          }
        })
    ).toEqual(
        {
          isAuthorizationRequired: true,
          user: {
            id: 0,
            email: `johndoe@mail.com`
          },
          login: `johndoe@mail.com`
        }
    );
  });

  it(`should handle UNAUTHORAZED`, () => {
    expect(
        reducer({
          isAuthorizationRequired: false,
          user: {
            id: 0,
            email: `johndoe@mail.com`
          },
          login: `johndoe@mail.com`,
        },
        {
          type: ActionType.UNAUTHORAZED,
        })
    ).toEqual(
        {
          isAuthorizationRequired: false,
          user: {},
          login: SIGN_IN,
        }
    );
  });
});

describe(`Operation`, () => {
  it(`should handle authorizationStatus`, () => {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const authorizationStatus = Operation.authorizationStatus();

    apiMock
    .onGet(`/login`)
    .reply(200);

    return authorizationStatus(dispatch, jest.fn(), api)
    .then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.AUTHORIZATION_REQUIRED,
        payload: false,
      });
    });
  });
});

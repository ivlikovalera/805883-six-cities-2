import React from 'react';
import renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';
import {PageOfPlace} from './page-of-place.jsx';

jest.mock(`../header/header.jsx`);
jest.mock(`../list-of-reviews/list-of-reviews.jsx`);
jest.mock(`../map/map.jsx`);

it(`Page of place correctly renders after relaunch`, () => {

  const pageOfPlaceComponent = renderer
  .create(<BrowserRouter>
    <PageOfPlace
      match={{params: {id: `0`}}}
      onFavoriteClick={() => {}}
      offers={[{
        id: 0,
        title: ``,
        isPremium: true || false,
        isFavorite: true || false,
        host: {},
        type: ``,
        rating: 0,
        price: 0,
        maxAdults: 0,
        numOfBedrooms: 0,
        images: [``],
        goods: [``],
        location: {
          latitude: 0,
          longitude: 0,
          zoom: 0
        },
        description: ``,
      }]}
      isAuthorizationRequired={false}
    />
  </BrowserRouter>)
  .toJSON();

  expect(pageOfPlaceComponent).toMatchSnapshot();
});

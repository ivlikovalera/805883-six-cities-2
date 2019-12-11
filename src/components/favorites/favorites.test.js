import React from 'react';
import renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';
import {Favorites} from './favorites.jsx';

jest.mock(`../header/header.jsx`);
jest.mock(`../city/city.jsx`);
jest.mock(`../card-of-place/card-of-place.jsx`);

it(`Favorites page correctly renders after relaunch`, () => {

  const favoritesComponent = renderer
  .create(<BrowserRouter>
    <Favorites
      uniqueCities={[]}
      favoritePlaces={[]}
      isAuthorizationRequired={false}
    />
  </BrowserRouter>)
  .toJSON();

  expect(favoritesComponent).toMatchSnapshot();
});

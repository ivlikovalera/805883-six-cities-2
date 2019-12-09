import React from 'react';
import renderer from 'react-test-renderer';
import {App} from './app.jsx';
import {BrowserRouter} from 'react-router-dom';

jest.mock(`../map/map.jsx`);
it(`App correctly renders after relaunch`, () => {
  const appComponent = renderer
  .create(<BrowserRouter>
    <App
      uniqueCities={[]}
      activeCity={{}}
      chooseCityHandler={() => {}}
      listOffer={[]}
      offers={[]}
      favoriteClickHandler={() => {}}
      login={``}
      auth={() => {}}
      isAuthorizationRequired={true || false}
      isFetching={true || false}
    />
  </BrowserRouter>)
  .toJSON();

  expect(appComponent).toMatchSnapshot();
});

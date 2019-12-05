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
      favoriteClickHandler={() => {}}
      login={``}
      auth={() => {}}
      isAuthorizationRequired={true || false}
    />
  </BrowserRouter>)
  .toJSON();

  expect(appComponent).toMatchSnapshot();
});

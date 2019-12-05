import React from 'react';
import renderer from 'react-test-renderer';
import {MainPage} from './main-page.jsx';
import {BrowserRouter} from 'react-router-dom';

jest.mock(`../map/map.jsx`);

it(`Main page correctly renders after relaunch`, () => {
  const mainComponent = renderer
  .create(<BrowserRouter>
    <MainPage
      places={[]}
      pins={[]}
      uniqueCities={[]}
      activeCity={{}}
      chooseCityHandler={() => {}}
      isAuthorizationRequired={true || false}
      auth={() => {}}
      login={``}
      favoriteClickHandler={() => {}}
    />
  </BrowserRouter>)
  .toJSON();

  expect(mainComponent).toMatchSnapshot();
});

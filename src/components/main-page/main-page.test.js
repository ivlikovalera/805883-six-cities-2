import React from 'react';
import renderer from 'react-test-renderer';
import {MainPage} from './main-page.jsx';

jest.mock(`../map/map.jsx`);

it(`Main page correctly renders after relaunch`, () => {
  const mainComponent = renderer
  .create(<MainPage
    places={[]}
    pins={[]}
    uniqueCities={[]}
    activeCity={{}}
    chooseCityHandler={() => {}}
    isAuthorizationRequired={true || false}
    auth={() => {}}
    login={``}
  />)
  .toJSON();

  expect(mainComponent).toMatchSnapshot();
});

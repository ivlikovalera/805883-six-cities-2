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
  />)
  .toJSON();

  expect(mainComponent).toMatchSnapshot();
});

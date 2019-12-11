import React from 'react';
import renderer from 'react-test-renderer';
import {MainPage} from './main-page.jsx';
import {BrowserRouter} from 'react-router-dom';

jest.mock(`../list-of-cities/list-of-cities.jsx`);
jest.mock(`../sorting-options/sorting-options.jsx`);
jest.mock(`../header/header.jsx`);
jest.mock(`../map/map.jsx`);

it(`Main page correctly renders after relaunch`, () => {
  const mainPageComponent = renderer
  .create(<BrowserRouter>
    <MainPage
      places={[]}
      isCities={true || false}
      activeCity={{}}
    />
  </BrowserRouter>)
  .toJSON();

  expect(mainPageComponent).toMatchSnapshot();
});

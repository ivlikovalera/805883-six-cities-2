import React from 'react';
import renderer from 'react-test-renderer';
import {MainPage} from './main-page.jsx';

it(`Main page correctly renders after relaunch`, () => {
  const mainComponent = renderer
  .create(<MainPage
    places={[]}
  />)
  .toJSON();

  expect(mainComponent).toMatchSnapshot();
});

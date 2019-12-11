import React from 'react';
import renderer from 'react-test-renderer';
import {EmptyMainPage} from './empty-main-page.jsx';

it(`Empty main page correctly renders after relaunch`, () => {

  const emptyMainPageComponent = renderer
  .create(<EmptyMainPage />)
  .toJSON();

  expect(emptyMainPageComponent).toMatchSnapshot();
});

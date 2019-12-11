import React from 'react';
import renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';
import {Header} from './header.jsx';

it(`Header correctly renders after relaunch`, () => {

  const headerComponent = renderer
  .create(<BrowserRouter>
    <Header
      login={``}
      onChangeActive={() => {}}
      isAuthorizationRequired={true || false}
      onLoadFavorites={() => {}}
    />
  </BrowserRouter>)
  .toJSON();

  expect(headerComponent).toMatchSnapshot();
});

import React from 'react';
import renderer from 'react-test-renderer';
import {App} from './app.jsx';

it(`App correctly renders after relaunch`, () => {
  const appComponent = renderer
  .create(<App
    places={[]}
  />)
  .toJSON();

  expect(appComponent).toMatchSnapshot();
});

import React from 'react';
import renderer from 'react-test-renderer';
import {CardOfPlace} from './card-of-place.jsx';
import {namesOfPlaces} from '../main-page/main-page.jsx';

it(`Card correctly renders after relaunch`, () => {

  const cardComponent = renderer
  .create(<CardOfPlace
    nameOfPlace={namesOfPlaces}
  />)
  .toJSON();

  expect(cardComponent).toMatchSnapshot();
});

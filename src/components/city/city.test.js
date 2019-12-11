import React from 'react';
import renderer from 'react-test-renderer';
import {City} from './city.jsx';

it(`City correctly renders after relaunch`, () => {

  const cityComponent = renderer
  .create(<City
    name={``}
    onCityClick={() => {}}
    activeCity={{}}
    isFavorite={true || false}
  />)
  .toJSON();

  expect(cityComponent).toMatchSnapshot();
});

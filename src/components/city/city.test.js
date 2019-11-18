import React from 'react';
import renderer from 'react-test-renderer';
import {City} from './city.jsx';

it(`City correctly renders after relaunch`, () => {

  const cityComponent = renderer
  .create(<City
    name={``}
    onCityClick={() => {}}
    activeCity={{}}
  />)
  .toJSON();

  expect(cityComponent).toMatchSnapshot();
});

import React from 'react';
import renderer from 'react-test-renderer';
import {ListOfCities} from './list-of-cities.jsx';

it(`List correctly renders after relaunch`, () => {

  const listComponent = renderer
  .create(<ListOfCities
    names={[]}
    activeCity={{}}
    chooseCityHandler={() => {}}
  />)
  .toJSON();

  expect(listComponent).toMatchSnapshot();
});

import React from 'react';
import renderer from 'react-test-renderer';
import {ListOfCities} from './list-of-cities.jsx';

it(`List of cities correctly renders after relaunch`, () => {

  const listOfCitiesComponent = renderer
  .create(<ListOfCities
    uniqueCities={[]}
  />)
  .toJSON();

  expect(listOfCitiesComponent).toMatchSnapshot();
});

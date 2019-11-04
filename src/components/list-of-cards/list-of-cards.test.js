import React from 'react';
import renderer from 'react-test-renderer';
import ListOfCards from './list-of-cards.jsx';

it(`List correctly renders after relaunch`, () => {

  const listComponent = renderer
  .create(<ListOfCards
    places={[]}
  />)
  .toJSON();

  expect(listComponent).toMatchSnapshot();
});

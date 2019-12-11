import React from 'react';
import renderer from 'react-test-renderer';
import {ListOfCards} from './list-of-cards.jsx';
import {WhichPage} from './../../utils.js';

it(`List of cards correctly renders after relaunch`, () => {

  const listOfCardsComponent = renderer
  .create(<ListOfCards
    places={[]}
    isCities={true || false}
    currentPage={WhichPage.MAINPAGE || WhichPage.PAGEOFPLACE || WhichPage.FAVORITES}
  />)
  .toJSON();

  expect(listOfCardsComponent).toMatchSnapshot();
});

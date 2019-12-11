import React from 'react';
import renderer from 'react-test-renderer';
import {SortingOptions} from './sorting-options.jsx';
import {FilterType} from './../../utils.js';

it(`Sorting correctly renders after relaunch`, () => {

  const sortingOptionsComponent = renderer
  .create(<SortingOptions
    onSortOffers={() => {}}
    selectedFilter={FilterType.POPULAR || FilterType.PRICE || FilterType.PRICEDESC || FilterType.RATED}
    isOpen={true || false}
    onChangeFilter={() => {}}
    onOpenCloseFilter={() => {}}
  />)
  .toJSON();

  expect(sortingOptionsComponent).toMatchSnapshot();
});

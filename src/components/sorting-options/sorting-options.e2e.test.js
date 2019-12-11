import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {SortingOptions} from './sorting-options.jsx';
import {FilterType} from './../../utils.js';

Enzyme.configure({adapter: new Adapter()});

describe(`Check select filter`, () => {
  it(`When you change on email,
    the processor gets the correct information
    about the object`, () => {
    const changeFilterHandler = jest.fn();
    const onSortOffersHandler = jest.fn();
    const sortingOptions = shallow(<SortingOptions
      onSortOffers={onSortOffersHandler}
      selectedFilter={FilterType.POPULAR || FilterType.PRICEDESC || FilterType.RATED}
      isOpen={true}
      onChangeFilter={changeFilterHandler}
      onOpenCloseFilter={() => {}}
    />);
    const filter = sortingOptions.find(`li`).at(1);
    filter.simulate(`click`);
    expect(changeFilterHandler).toBeCalledWith(FilterType.PRICE);
    expect(onSortOffersHandler).toBeCalledWith(FilterType.PRICE);
  });
});

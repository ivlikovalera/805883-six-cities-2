import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {CardOfPlace} from './card-of-place.jsx';
import {namesOfPlaces} from '../main-page/main-page.jsx';

Enzyme.configure({adapter: new Adapter()});

it(`Card is correctly rendered after relaunch`, () => {
  const clickHandler = jest.fn();
  const card = shallow(<CardOfPlace
    nameOfPlace={namesOfPlaces}
    onTitleClick={clickHandler}
  />);
  const title = card.find(`h2`);
  title.simulate(`click`);
  expect(clickHandler).toHaveBeenCalledTimes(1);
});

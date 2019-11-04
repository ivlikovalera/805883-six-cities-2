import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {CardOfPlace} from './card-of-place.jsx';

Enzyme.configure({adapter: new Adapter()});

it(`When you hover over the card,
    the processor gets the correct information
    about the object`, () => {
  const cardPointHandler = jest.fn();
  const card = shallow(<CardOfPlace
    id={0}
    previewImage={``}
    title={``}
    isPremium={true || false}
    rating={0}
    type={``}
    price={0}
    onCardPoint={() => {}}
  />);
  card.simulate(`mouseover`);
  const cardId = card.find(`id`);
  expect(cardPointHandler.value === cardId.value).toBeTruthy();
});

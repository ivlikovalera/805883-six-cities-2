import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {City} from './city.jsx';

Enzyme.configure({adapter: new Adapter()});

it(`When you click on city in main page,
    the processor gets the correct information
    about the object`, () => {
  const cityClickHandler = jest.fn();
  const name = `Ekaterinburg`;
  const event = {
    preventDefault() {}
  };
  const city = shallow(<City
    name={name}
    onCityClick={cityClickHandler}
    activeCity={{}}
    isFavorite={false}
  />);
  city.simulate(`click`, event);
  expect(cityClickHandler).toBeCalledWith(name);
});

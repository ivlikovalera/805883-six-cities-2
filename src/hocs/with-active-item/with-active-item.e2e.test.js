import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import withActiveItem from './with-active-item.js';

configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const MockComponentWrapped = withActiveItem(MockComponent);

it(`No cards selected`, () => {
  const wrapper = mount(<MockComponentWrapped />);

  expect(wrapper.state().isActiveCard).toEqual(-1);
});

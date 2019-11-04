import React from 'react';
import renderer from 'react-test-renderer';
import {CardOfPlace} from './card-of-place.jsx';

it(`Card correctly renders after relaunch`, () => {

  const cardComponent = renderer
  .create(<CardOfPlace
    id={0}
    previewImage={``}
    title={``}
    isPremium={true || false}
    rating={0}
    type={``}
    price={0}
    onCardPoint={() => {}}
  />)
  .toJSON();

  expect(cardComponent).toMatchSnapshot();
});

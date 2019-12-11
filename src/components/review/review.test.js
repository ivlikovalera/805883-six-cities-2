import React from 'react';
import renderer from 'react-test-renderer';
import {Review} from './review.jsx';

it(`Review correctly renders after relaunch`, () => {

  const reviewComponent = renderer
  .create(<Review
    id={0}
    name={``}
    avatarUrl={``}
    rating={0}
    comment={``}
    date={``}
  />)
  .toJSON();

  expect(reviewComponent).toMatchSnapshot();
});

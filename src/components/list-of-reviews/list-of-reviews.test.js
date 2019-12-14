import React from 'react';
import renderer from 'react-test-renderer';
import {ListOfReviews} from './list-of-reviews.jsx';

jest.mock(`../comment-form/comment-form.jsx`);

it(`List of reviews correctly renders after relaunch`, () => {

  const listOfReviewsComponent = renderer
  .create(<ListOfReviews
    id={0}
    reviews={[]}
    isAuthorizationRequired={true || false}
  />)
  .toJSON();

  expect(listOfReviewsComponent).toMatchSnapshot();
});

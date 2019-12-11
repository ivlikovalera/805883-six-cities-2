import React from 'react';
import renderer from 'react-test-renderer';
import {CommentForm} from './comment-form.jsx';

it(`Comment form correctly renders after relaunch`, () => {

  const commentFormComponent = renderer
  .create(<CommentForm
    id={0}
    onSendReview={() => {}}
    onChangeFetching={() => {}}
    isFetching={true || false}
    rating={0}
    comment={``}
    onChangeRating={() => {}}
    onChangeComment={() => {}}
  />)
  .toJSON();

  expect(commentFormComponent).toMatchSnapshot();
});

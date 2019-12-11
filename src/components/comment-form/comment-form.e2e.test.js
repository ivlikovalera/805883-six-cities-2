import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {CommentForm} from './comment-form.jsx';

Enzyme.configure({adapter: new Adapter()});

describe(`Check comment form`, () => {
  it(`When you click on star,
    the processor gets the correct information
    about the object`, () => {
    const changeRatingHandler = jest.fn();
    const commentForm = shallow(<CommentForm
      id={0}
      onSendReview={() => {}}
      onChangeFetching={() => {}}
      isFetching={true || false}
      rating={0}
      comment={``}
      onChangeRating={changeRatingHandler}
      onChangeComment={() => {}}
    />);
    const threeStarRating = commentForm.find(`[id="3-stars"]`);
    threeStarRating.simulate(`click`);
    expect(changeRatingHandler).toBeCalledWith(3);
  });

  it(`When you enter text on textarea,
    the processor gets the correct information
    about the object`, () => {
    const changeCommentHandler = jest.fn();
    const text = `123`;
    const commentForm = shallow(<CommentForm
      id={0}
      onSendReview={() => {}}
      onChangeFetching={() => {}}
      isFetching={false}
      rating={0}
      comment={``}
      onChangeRating={() => {}}
      onChangeComment={changeCommentHandler}
    />);
    const textArea = commentForm.find(`textarea`);
    textArea.simulate(`change`, {target: {value: text}});
    expect(changeCommentHandler).toBeCalledWith(text);
  });
});

describe(`Send review`, () => {
  it(`When you send review,
    the processor gets the correct information
    about the object`, () => {
    const text = `Lorem ipsum dolor sit amet, consectetur adipiscing e`;
    const rating = 5;
    const id = 14;
    const onSendReviewHandler = jest.fn();
    const event = {
      preventDefault() {}
    };

    const commentForm = shallow(<CommentForm
      id={id}
      onSendReview={onSendReviewHandler}
      onChangeFetching={() => {}}
      isFetching={false}
      rating={rating}
      comment={text}
      onChangeRating={() => {}}
      onChangeComment={() => {}}
    />);
    const submitButton = commentForm.find(`.reviews__submit`);
    submitButton.simulate(`click`, event);
    expect(onSendReviewHandler).toBeCalledWith({rating, comment: text}, id);
  });
});

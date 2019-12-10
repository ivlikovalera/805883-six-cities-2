import React from 'react';
import {PropTypes as pt} from 'prop-types';
import {Review} from './../review/review.jsx';
import {CommentForm} from './../comment-form/comment-form.jsx';

export const ListOfReviews = (props) => {
  const {id, reviews, sendReview, isFetching, changeFetching} = props;
  return <section className="property__reviews reviews">
    <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
    <ul className="reviews__list">
      {reviews.map((review) => <Review
        key={review.id}
        id={review.id}
        name={review.user.name}
        avatarUrl={review.user.avatarUrl}
        isPro={review.user.isPro}
        rating={review.rating}
        comment={review.comment}
        date={review.date}
      />)}
    </ul>
    <CommentForm
      id={id}
      sendReview={sendReview}
      isFetching={isFetching}
      changeFetching={changeFetching}
    />
  </section>;
};

ListOfReviews.propTypes = {
  id: pt.number,
  reviews: pt.array,
  sendReview: pt.func,
  isFetching: pt.bool,
  changeFetching: pt.func,
};

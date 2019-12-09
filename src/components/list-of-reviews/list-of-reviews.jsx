import React from 'react';
import {PropTypes as pt} from 'prop-types';
import {Review} from './../review/review.jsx';
import {GetCommentForm} from './../get-comment-form/get-comment-form.jsx';

export const ListOfReviews = (props) => {
  const {id, reviews, sendReview} = props;
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
    <GetCommentForm
      id={id}
      sendReview={sendReview}
    />
  </section>;
};

ListOfReviews.propTypes = {
  id: pt.number,
  reviews: pt.array,
  sendReview: pt.func,
};

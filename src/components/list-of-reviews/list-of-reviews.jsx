import React from 'react';
import {PropTypes as pt} from 'prop-types';
import {connect} from 'react-redux';
import {Review} from './../review/review.jsx';
import CommentForm from './../comment-form/comment-form.jsx';
import {getCurrentReviews} from './../../reducer/data/selector.js';
import withCommentForm from './../../hocs/with-comment-form/with-comment-form.js';
import {getIsAuthorizationRequired} from './../../reducer/user/selector.js';

const CommentFormWrapped = withCommentForm(CommentForm);

export const ListOfReviews = (props) => {
  const {id, reviews, isAuthorizationRequired} = props;
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
    {isAuthorizationRequired ? null : <CommentFormWrapped
      id={id}
    />}
  </section>;
};

ListOfReviews.propTypes = {
  id: pt.number.isRequired,
  reviews: pt.arrayOf(pt.shape({
    id: pt.number,
    name: pt.string,
    avatarUrl: pt.string,
    isPro: pt.bool,
    comment: pt.string,
    date: pt.string,
  })),
  isAuthorizationRequired: pt.bool,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  reviews: getCurrentReviews(state),
  isAuthorizationRequired: getIsAuthorizationRequired(state),
});

export default connect(mapStateToProps)(ListOfReviews);

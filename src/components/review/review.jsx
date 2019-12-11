import React from 'react';
import {PropTypes as pt} from 'prop-types';
import {connect} from 'react-redux';
import moment from 'moment';
import {getFetching} from './../../reducer/data/selector.js';

export const Review = (props) => {
  const {
    name,
    avatarUrl,
    rating,
    id,
    comment,
    date
  } = props;
  return <li className="reviews__item" id={id}>
    <div className="reviews__user user">
      <div className="reviews__avatar-wrapper user__avatar-wrapper">
        <img className="reviews__avatar user__avatar" src={avatarUrl} width="54" height="54" alt="Reviews avatar"/>
      </div>
      <span className="reviews__user-name">
        {name}
      </span>
    </div>
    <div className="reviews__info">
      <div className="reviews__rating rating">
        <div className="reviews__stars rating__stars">
          <span style={{width: `${rating / 5 * 100}%`}}></span>
          <span className="visually-hidden">{rating}</span>
        </div>
      </div>
      <p className="reviews__text">
        {comment}
      </p>
      <time className="reviews__time" dateTime={moment(date).format(`YYYY-MM-DD`)}>{moment(date).format(`MMMM YYYY`)}</time>
    </div>
  </li>;
};

Review.propTypes = {
  id: pt.number.isRequired,
  name: pt.string.isRequired,
  avatarUrl: pt.string.isRequired,
  rating: pt.number.isRequired,
  comment: pt.string.isRequired,
  date: pt.string.isRequired,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  isFetching: getFetching(state),
});

export default connect(mapStateToProps)(Review);

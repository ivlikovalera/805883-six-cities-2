import React from 'react';
import {PropTypes as pt} from 'prop-types';
import moment from 'moment';

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
  id: pt.number,
  name: pt.string,
  avatarUrl: pt.string,
  isPro: pt.bool,
  rating: pt.number,
  comment: pt.string,
  date: pt.string,
};

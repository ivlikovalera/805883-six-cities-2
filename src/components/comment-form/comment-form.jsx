import React from "react";
import {PropTypes as pt} from 'prop-types';
import {connect} from 'react-redux';
import {ActionCreator as DataActionCreator, Operation as DataOperation} from '../../reducer/data/reducer.js';
import {getFetching} from './../../reducer/data/selector.js';
import {RatingInt, MIN_COMMENT_LENGTH} from './../../utils.js';

export const CommentForm = (props) => {
  const {
    isFetching,
    id,
    sendReview,
    changeFetching,
    rating,
    comment,
    onChangeRating,
    onChangeComment,
  } = props;

  return <form className="reviews__form form" action="#" method="post">
    <label className="reviews__label form__label" htmlFor="review">Your review</label>
    <div className="reviews__rating-form form__rating">
      <input className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio"
        onClick={() => {
          onChangeRating(RatingInt.FIVE);
        }
        }/>
      <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>

      <input className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio"
        onClick={() => {
          onChangeRating(RatingInt.FOUR);
        }
        }/>
      <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>

      <input className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio"
        onClick={() => {
          onChangeRating(RatingInt.THREE);
        }
        }/>
      <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>

      <input className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio"
        onClick={() => {
          onChangeRating(RatingInt.TWO);
        }
        }/>
      <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>

      <input className="form__rating-input visually-hidden" name="rating" value="1" id="1-star" type="radio"
        onClick={() => {
          onChangeRating(RatingInt.ONE);
        }
        }/>
      <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>
    </div>
    <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved" maxLength="300"
      value={comment} onChange={(evt) => {
        onChangeComment(evt.target.value);
      }} disabled={isFetching}></textarea>
    <div className="reviews__button-wrapper">
      <p className="reviews__help">
To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
      </p>
      <button className="reviews__submit form__submit button" type="submit" disabled={checkForm(comment, rating, isFetching)} onClick={(evt) => {
        evt.preventDefault();
        changeFetching(true);
        sendReview({
          rating,
          comment,
        }, id);
        onChangeComment(``);
      }
      }>Submit</button>
    </div>
  </form>;
};

const checkForm = (comment, rating, isFetching) => comment.length < MIN_COMMENT_LENGTH || rating === RatingInt.NONE || isFetching;

CommentForm.propTypes = {
  id: pt.number,
  sendReview: pt.func,
  changeFetching: pt.func,
  isFetching: pt.bool,
  rating: pt.number,
  comment: pt.string,
  onChangeRating: pt.func,
  onChangeComment: pt.func,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  isFetching: getFetching(state),
});

const mapDispatchToProps = (dispatch) => ({
  changeFetching: (status) => {
    dispatch(DataActionCreator.changeFetching(status));
  },
  sendReview: (review, id) => {
    dispatch(DataOperation.sendReview(review, id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);

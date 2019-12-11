import React from "react";
import {connect} from 'react-redux';
import {PropTypes as pt} from 'prop-types';
import {Link} from 'react-router-dom';
import {ActionCreator as DataActionCreator, Operation as DataOperation} from '../../reducer/data/reducer.js';
import {PicSize, WhichPage, getBlock} from './../../utils.js';

export const CardOfPlace = (props) => {
  const {
    id,
    previewImage,
    title,
    isPremium,
    isFavorite,
    rating,
    type,
    price,
    onFavoriteClick,
    onGetReviews,
    currentPage,
    onChangeActive,
  } = props;
  return <article className={`${getBlock(currentPage)}${currentPage === WhichPage.MAINPAGE ? `__place-card` : `__card`} place-card`} id={id} onMouseOver={() => {
    if (currentPage === WhichPage.MAINPAGE) {
      onChangeActive(id);
    }
  }
  } onMouseOut={() => {
    if (currentPage === WhichPage.MAINPAGE) {
      onChangeActive();
    }
  }
  }>
    {isPremium ? <div className="place-card__mark">
      <span>Premium</span>
    </div> : null}
    <div className={`${getBlock(currentPage)}__image-wrapper place-card__image-wrapper`}>
      <a href="#">
        <img className="place-card__image" src={previewImage} width={currentPage === WhichPage.FAVORITES
          ? PicSize.FAVORITE.width : PicSize.OTHER.width} height={currentPage === WhichPage.FAVORITES
          ? PicSize.FAVORITE.height : PicSize.OTHER.height} alt="Place image"/>
      </a>
    </div>
    <div className="place-card__info">
      <div className="place-card__price-wrapper">
        <div className="place-card__price">
          <b className="place-card__price-value">&euro;{price}</b>
          <span className="place-card__price-text">&#47;&nbsp;night</span>
        </div>
        <button className={isFavorite ? `place-card__bookmark-button place-card__bookmark-button--active button`
          : `place-card__bookmark-button button`} type="button" onClick={(evt) => {
          evt.preventDefault();
          onFavoriteClick(id);
        }}>
          <svg className="place-card__bookmark-icon" width="18" height="19">
            <use xlinkHref="#icon-bookmark"></use>
          </svg>
          <span className="visually-hidden">To bookmarks</span>
        </button>
      </div>
      <div className="place-card__rating rating">
        <div className="place-card__stars rating__stars">
          <span style={{width: `${Math.round(Math.round(rating) / 5 * 100)}%`}}></span>
          <span className="visually-hidden">Rating{rating}</span>
        </div>
      </div>
      <h2 className="place-card__name">
        <Link to={`/offer/${id}`} className="place-card_title" onClick={() => {
          onGetReviews(id);
          onChangeActive(id);
        }}>{title}</Link>
      </h2>
      <p className="place-card__type">{type}</p>
    </div>
  </article>;
};

CardOfPlace.propTypes = {
  id: pt.number.isRequired,
  onFavoriteClick: pt.func,
  onGetReviews: pt.func,
  previewImage: pt.string.isRequired,
  title: pt.string.isRequired,
  isPremium: pt.bool,
  isFavorite: pt.bool,
  rating: pt.number,
  type: pt.string,
  price: pt.number.isRequired,
  onChangeActive: pt.func,
  currentPage: pt.oneOf([WhichPage.MAINPAGE, WhichPage.PAGEOFPLACE, WhichPage.FAVORITES]).isRequired,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {});

const mapDispatchToProps = (dispatch) => ({
  onGetReviews: (id) => {
    dispatch(DataOperation.onGetReviews(id));
  },
  onFavoriteClick: (id) => {
    dispatch(DataOperation.changeFavorite(id));
  },
  onChangeActive: (id = null) => {
    dispatch(DataActionCreator.onChangeActive(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CardOfPlace);

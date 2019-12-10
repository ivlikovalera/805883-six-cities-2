import React from "react";
import {PropTypes as pt} from 'prop-types';
import {Link} from 'react-router-dom';
import {PicSize, WhichPage} from './../../utils.js';

export const CardOfPlace = (props) => {
  const {id,
    previewImage,
    title,
    isPremium,
    isFavorite,
    rating,
    type,
    price,
    onFavoriteClick,
    getReviews,
    currentPage,
    changeActive,
    whichBlock,
  } = props;
  return <article className={`${whichBlock}${currentPage === WhichPage.MAINPAGE ? `__place-card` : `__card`} place-card`} id={id} onMouseOver={() => {
    if (currentPage === WhichPage.MAINPAGE) {
      changeActive(id);
    }
  }
  } onMouseOut={() => {
    if (currentPage === WhichPage.MAINPAGE) {
      changeActive();
    }
  }
  }>
    {isPremium ? <div className="place-card__mark">
      <span>Premium</span>
    </div> : null}
    <div className={`${whichBlock}__image-wrapper place-card__image-wrapper`}>
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
          getReviews(id);
          changeActive(id);
        }}>{title}</Link>
      </h2>
      <p className="place-card__type">{type}</p>
    </div>
  </article>;
};

CardOfPlace.propTypes = {
  id: pt.number.isRequired,
  onCardPoint: pt.func,
  onFavoriteClick: pt.func,
  getReviews: pt.func,
  previewImage: pt.string.isRequired,
  title: pt.string.isRequired,
  isPremium: pt.bool,
  isFavorite: pt.bool,
  rating: pt.number.isRequired,
  type: pt.string.isRequired,
  price: pt.number.isRequired,
  isCities: pt.bool,
  changeActive: pt.func,
  whichBlock: pt.string,
  currentPage: pt.string,
};

import React from "react";
import {PropTypes as pt} from 'prop-types';

export const CardOfPlace = (props) => {
  const {id,
    previewImage,
    title,
    isPremium,
    rating,
    type,
    price,
    onCardPoint} = props;
  return <article className="cities__place-card place-card" id={id} onMouseOver={() => onCardPoint(id)}>
    {isPremium ? <div className="place-card__mark">
      <span>Premium</span>
    </div> : null}
    <div className="cities__image-wrapper place-card__image-wrapper">
      <a href="#">
        <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place image"/>
      </a>
    </div>
    <div className="place-card__info">
      <div className="place-card__price-wrapper">
        <div className="place-card__price">
          <b className="place-card__price-value">&euro;{price}</b>
          <span className="place-card__price-text">&#47;&nbsp;night</span>
        </div>
        <button className="place-card__bookmark-button button" type="button">
          <svg className="place-card__bookmark-icon" width="18" height="19">
            <use xlinkHref="#icon-bookmark"></use>
          </svg>
          <span className="visually-hidden">To bookmarks</span>
        </button>
      </div>
      <div className="place-card__rating rating">
        <div className="place-card__stars rating__stars">
          <span style={{width: `93%`}}></span>
          <span className="visually-hidden">Rating{rating}</span>
        </div>
      </div>
      <h2 className="place-card__name">
        <a href="#">{title}</a>
      </h2>
      <p className="place-card__type">{type}</p>
    </div>
  </article>;
};

CardOfPlace.propTypes = {
  id: pt.number.isRequired,
  onCardPoint: pt.func,
  previewImage: pt.string.isRequired,
  title: pt.string.isRequired,
  isPremium: pt.bool,
  rating: pt.number.isRequired,
  type: pt.string.isRequired,
  price: pt.number.isRequired,
};

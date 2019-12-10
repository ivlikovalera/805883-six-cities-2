import React from 'react';
import {PropTypes as pt} from 'prop-types';
import {CardOfPlace} from '../card-of-place/card-of-place.jsx';
import {WhichPage} from './../../utils.js';

export const ListOfCards = (props) => {
  const {
    places,
    favoriteClickHandler,
    getReviews,
    isCities,
    changeActive,
    whichBlock,
  } = props;

  return <div className={isCities ? `cities__places-list places__list tabs__content` : `near-places__list places__list`}>
    {places.map((it) => <CardOfPlace
      key={it.id}
      id={it.id}
      previewImage={it.previewImage}
      title={it.title}
      isPremium={it.isPremium}
      isFavorite={it.isFavorite}
      rating={it.rating}
      type={it.type}
      price={it.price}
      onFavoriteClick={favoriteClickHandler}
      getReviews={getReviews}
      isCities={isCities}
      changeActive={changeActive}
      whichBlock={whichBlock}
      currentPage={WhichPage.MAINPAGE}
    />)}
  </div>;
};

ListOfCards.propTypes = {
  cardPointHandler: pt.func,
  favoriteClickHandler: pt.func,
  getReviews: pt.func,
  places: pt.array.isRequired,
  isCities: pt.bool,
  changeActive: pt.func,
  whichBlock: pt.string,
  offer: pt.shape({
    previewImage: pt.string,
    title: pt.string,
    isPremium: pt.bool,
    isFavorite: pt.bool,
    rating: pt.number,
    type: pt.string,
    price: pt.number,
  })
};

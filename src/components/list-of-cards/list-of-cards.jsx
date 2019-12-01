import React from 'react';
import {PropTypes as pt} from 'prop-types';
import {CardOfPlace} from '../card-of-place/card-of-place.jsx';

export const ListOfCards = (props) => {
  const {places, cardPointHandler} = props;

  return <div className="cities__places-list places__list tabs__content">
    {places.map((it) => <CardOfPlace
      key={it.id}
      id={it.id}
      previewImage={it.previewImage}
      title={it.title}
      isPremium={it.isPremium}
      rating={it.rating}
      type={it.type}
      price={it.price}
      onCardPoint={cardPointHandler}
    />)}
  </div>;
};

ListOfCards.propTypes = {
  cardPointHandler: pt.func,
  places: pt.array.isRequired,
  offer: pt.shape({
    previewImage: pt.string,
    title: pt.string,
    isPremium: pt.bool,
    rating: pt.number,
    type: pt.string,
    price: pt.number,
  })
};

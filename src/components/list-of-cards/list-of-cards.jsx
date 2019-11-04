import React from "react";
import {PureComponent} from "react";
import {PropTypes as pt} from 'prop-types';
import {CardOfPlace} from '../card-of-place/card-of-place.jsx';

export default class ListOfCards extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {isActiveCard: null};
    this.cardPointHandler = this.cardPointHandle.bind(this);
  }

  cardPointHandle(id) {
    this.setState({
      isActiveCard: id
    });
  }

  render() {
    const {places} = this.props;
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
        onCardPoint={this.cardPointHandler}
      />)}
    </div>;
  }

}

ListOfCards.propTypes = {
  onCardPoint: pt.func,
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

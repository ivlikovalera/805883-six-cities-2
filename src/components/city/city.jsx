import React from "react";
import {PropTypes as pt} from 'prop-types';
import {connect} from 'react-redux';
import {getActiveCity} from './../../reducer/data/selector.js';
import {ActionCreator as DataActionCreator} from '../../reducer/data/reducer.js';

export const City = (props) => {
  const {name, onCityClick, activeCity, isFavorite} = props;
  return <a className={`locations__item-link ${isFavorite ? null : checkActiveCity(activeCity.name, name)}`
  } href="#" onClick={(evt) => {
    evt.preventDefault();
    if (!isFavorite) {
      onCityClick(name);
    }
  }
  }>
    <span>{name}</span>
  </a>;
};

const checkActiveCity = (activeName, name) => {
  if (activeName === name) {
    return `tabs__item tabs__item--active`;
  }
  return `tabs__item`;
};

City.propTypes = {
  name: pt.string.isRequired,
  onCityClick: pt.func,
  activeCity: pt.shape({
    name: pt.string,
  }),
  isFavorite: pt.bool,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  activeCity: getActiveCity(state),
});

const mapDispatchToProps = (dispatch) => ({
  onCityClick: (city) => {
    dispatch(DataActionCreator.changeCity(city));
    dispatch(DataActionCreator.getOffers());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(City);

import React from "react";
import {PropTypes as pt} from 'prop-types';

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
  name: pt.string,
  onCityClick: pt.func,
  activeCity: pt.object,
  isFavorite: pt.bool,
};

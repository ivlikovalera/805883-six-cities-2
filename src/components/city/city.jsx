import React from "react";
import {PropTypes as pt} from 'prop-types';

export const City = (props) => {
  const {name, onCityClick, activeCity} = props;
  return <li className="locations__item">
    <a className={(activeCity.name === name) ? `locations__item-link tabs__item tabs__item--active`
      : `locations__item-link tabs__item`} href="#" onClick={(evt) => {
      evt.preventDefault();
      onCityClick(name);
    }}>
      <span>{name}</span>
    </a>
  </li>;
};

City.propTypes = {
  name: pt.string,
  onCityClick: pt.func,
  activeCity: pt.object,
};

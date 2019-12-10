import React from "react";
import {City} from './../city/city.jsx';
import {PropTypes as pt} from 'prop-types';

export const ListOfCities = (props) => {
  const {uniqueCities, activeCity, chooseCityHandler} = props;
  return <section className="locations container">
    <ul className="locations__list tabs__list">
      {uniqueCities.map((it, i) => <li className="locations__item" key={i}>
        <City
          activeCity={activeCity}
          key={i}
          name={it.name}
          onCityClick={chooseCityHandler}
        />
      </li>)}
    </ul>
  </section>;
};

ListOfCities.propTypes = {
  uniqueCities: pt.array,
  chooseCityHandler: pt.func,
  activeCity: pt.object,
};

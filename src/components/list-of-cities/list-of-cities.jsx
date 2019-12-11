import React from "react";
import City from './../city/city.jsx';
import {PropTypes as pt} from 'prop-types';
import {connect} from 'react-redux';
import {getUniqueCities} from './../../reducer/data/selector.js';

export const ListOfCities = (props) => {
  const {uniqueCities} = props;
  return <section className="locations container">
    <ul className="locations__list tabs__list">
      {uniqueCities.map((it, i) => <li className="locations__item" key={i}>
        <City
          key={i}
          name={it.name}
        />
      </li>)}
    </ul>
  </section>;
};

ListOfCities.propTypes = {
  uniqueCities: pt.arrayOf(pt.shape({
    name: pt.string.isRequired,
  })),
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  uniqueCities: getUniqueCities(state),
});

export default connect(mapStateToProps)(ListOfCities);

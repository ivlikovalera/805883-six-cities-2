import React from "react";
import {connect} from 'react-redux';
import {ActionCreator} from './../../reducer.js';
import {PropTypes as pt} from 'prop-types';
import {MainPage} from './../main-page/main-page.jsx';

export const App = (props) => {
  const {
    names,
    activeCity,
    chooseCityHandler,
    listOffer,
  } = props;
  return <MainPage
    places={listOffer}
    pins={listOffer}
    names={names}
    activeCity={activeCity}
    chooseCityHandler={chooseCityHandler}
  />;
};

App.propTypes = {
  places: pt.arrayOf(pt.shape({place: pt.string})),
  pins: pt.arrayOf(pt.shape({
    location: pt.shape({
      latitude: pt.number,
      longtitude: pt.number,
    })
  })),
  names: pt.array,
  chooseCityHandler: pt.func,
  listOffer: pt.array,
  activeCity: pt.object,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  activeCity: state.activeCity,
  listOffer: state.listOffer,
});

const mapDispatchToProps = (dispatch) => ({
  chooseCityHandler: (city) => {
    dispatch(ActionCreator.changeCity(city));
    dispatch(ActionCreator.getOffers());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

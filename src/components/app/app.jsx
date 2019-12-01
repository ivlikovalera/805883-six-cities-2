import React from 'react';
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducer/reducer.js';
import {PropTypes as pt} from 'prop-types';
import {MainPage} from './../main-page/main-page.jsx';

export const App = (props) => {
  const {
    activeCity,
    chooseCityHandler,
    listOffer,
    uniqueCities,
  } = props;

  return <MainPage
    places={listOffer}
    pins={listOffer}
    uniqueCities={uniqueCities}
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
  uniqueCities: pt.array,
  chooseCityHandler: pt.func,
  listOffer: pt.array,
  activeCity: pt.object,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  activeCity: state.activeCity,
  listOffer: state.listOffer,
  uniqueCities: state.uniqueCities,
});

const mapDispatchToProps = (dispatch) => ({
  chooseCityHandler: (city) => {
    dispatch(ActionCreator.changeCity(city));
    dispatch(ActionCreator.getOffers());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

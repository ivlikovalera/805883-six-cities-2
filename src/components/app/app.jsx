import React from 'react';
import {connect} from 'react-redux';
import {ActionCreator, Operation} from '../../reducer/reducer.js';
import {PropTypes as pt} from 'prop-types';
import {MainPage} from './../main-page/main-page.jsx';

export const App = (props) => {
  const {
    activeCity,
    chooseCityHandler,
    listOffer,
    uniqueCities,
    isAuthorizationRequired,
    auth,
    login,
  } = props;

  return <MainPage
    places={listOffer}
    pins={listOffer}
    uniqueCities={uniqueCities}
    activeCity={activeCity}
    chooseCityHandler={chooseCityHandler}
    isAuthorizationRequired={isAuthorizationRequired}
    auth={auth}
    login={login}
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
  isAuthorizationRequired: pt.bool,
  auth: pt.func,
  login: pt.string,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  activeCity: state.activeCity,
  listOffer: state.listOffer,
  uniqueCities: state.uniqueCities,
  isAuthorizationRequired: state.isAuthorizationRequired,
  login: state.login,
});

const mapDispatchToProps = (dispatch) => ({
  chooseCityHandler: (city) => {
    dispatch(ActionCreator.changeCity(city));
    dispatch(ActionCreator.getOffers());
  },
  auth: (authData) => {
    dispatch(Operation.authorization(authData));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

import React from 'react';
import {connect} from 'react-redux';
import {ActionCreator, Operation} from '../../reducer/reducer.js';
import {getCurrentReviews} from '../../reducer/selector.js';
import {PropTypes as pt} from 'prop-types';
import {MainPage} from './../main-page/main-page.jsx';
import {SignIn} from '../sign-in/sign-in.jsx';
import {PageOfPlace} from './../page-of-place/page-of-place.jsx';
import {Switch, Route} from 'react-router-dom';


export const App = (props) => {
  const {
    activeCity,
    chooseCityHandler,
    favoriteClickHandler,
    listOffer,
    uniqueCities,
    isAuthorizationRequired,
    auth,
    login,
    getReviews,
    offers,
    loadOffers,
    reviews,
  } = props;

  return (
    <Switch>
      <Route path="/" exact render={() =>
        <MainPage
          places={listOffer}
          pins={listOffer}
          uniqueCities={uniqueCities}
          activeCity={activeCity}
          chooseCityHandler={chooseCityHandler}
          favoriteClickHandler={favoriteClickHandler}
          isAuthorizationRequired={isAuthorizationRequired}
          login={login}
          getReviews={getReviews}
        />}
      />
      <Route path="/login" exact render={() =>
        <SignIn
          auth={auth}
          login={login}
          isAuthorizationRequired={isAuthorizationRequired}
        />}/>
      <Route path="/offer/:id" exact render={(offerProps) => {
        if (offers.length === 0) {
          loadOffers();
          getReviews(parseInt(offerProps.match.params.id, 10));
          return <div>ОЖИДАЙТЕ</div>;
        }
        return <PageOfPlace
          offers={offers}
          onFavoriteClick={favoriteClickHandler}
          login={login}
          reviews={reviews}
          {...offerProps}
        />;
      }
      }/>
    </Switch>
  );
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
  favoriteClickHandler: pt.func,
  listOffer: pt.array,
  activeCity: pt.object,
  isAuthorizationRequired: pt.bool,
  auth: pt.func,
  login: pt.string,
  getReviews: pt.func,
  loadOffers: pt.func,
  offers: pt.array,
  reviews: pt.array,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  activeCity: state.activeCity,
  listOffer: state.listOffer,
  offers: state.offers,
  uniqueCities: state.uniqueCities,
  isAuthorizationRequired: state.isAuthorizationRequired,
  login: state.login,
  reviews: getCurrentReviews(state),
});

const mapDispatchToProps = (dispatch) => ({
  chooseCityHandler: (city) => {
    dispatch(ActionCreator.changeCity(city));
    dispatch(ActionCreator.getOffers());
  },
  favoriteClickHandler: (id) => {
    dispatch(ActionCreator.changeFavorite(id));
    dispatch(ActionCreator.getOffers());
  },
  auth: (authData) => {
    dispatch(Operation.authorization(authData));
  },
  getReviews: (id) => {
    dispatch(Operation.getReviews(id));
  },
  loadOffers: () => {
    dispatch(Operation.loadOffers());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

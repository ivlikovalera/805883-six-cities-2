import React from 'react';
import {connect} from 'react-redux';
import {Switch, Route, Redirect} from 'react-router-dom';
import {ActionCreator, Operation} from '../../reducer/reducer.js';
import {getCurrentReviews} from '../../reducer/selector.js';
import {PropTypes as pt} from 'prop-types';
import {MainPage} from './../main-page/main-page.jsx';
import {SignIn} from '../sign-in/sign-in.jsx';
import {PageOfPlace} from './../page-of-place/page-of-place.jsx';


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
    reviews,
    loadOffersInOfferPage,
    isFetching,
    changeFetching,
    loadOffers,
    sortOffers,
    changeActive,
    activeOfferId,
    sendReview,
  } = props;

  return (
    <Switch>
      <Route path="/" exact render={() => {
        if (offers.length === 0) {
          if (isFetching === false) {
            changeFetching(true);
            loadOffers();
          }
          return <div>ПОДОЖДИТЕ</div>;
        }
        return <MainPage
          places={listOffer}
          pins={listOffer}
          uniqueCities={uniqueCities}
          activeCity={activeCity}
          chooseCityHandler={chooseCityHandler}
          favoriteClickHandler={favoriteClickHandler}
          isAuthorizationRequired={isAuthorizationRequired}
          login={login}
          getReviews={getReviews}
          isCities={true}
          sortOffers={sortOffers}
          changeActive={changeActive}
          activeOfferId={activeOfferId}
        />;
      }
      }/>
      <Route path="/login" exact render={() =>
        <SignIn
          auth={auth}
          login={login}
          isAuthorizationRequired={isAuthorizationRequired}
          changeActive={changeActive}
        />}
      />
      <Route path="/offer/:id" exact render={(offerProps) => {
        if (isAuthorizationRequired) {
          return <Redirect to="/login" />;
        }
        if (listOffer.length === 0) {
          if (isFetching === false) {
            changeFetching(true);
            loadOffersInOfferPage(parseInt(offerProps.match.params.id, 10));
          }
          return <div>ПОДОЖДИТЕ</div>;
        }
        return <PageOfPlace
          onFavoriteClick={favoriteClickHandler}
          login={login}
          reviews={reviews}
          listOffer={listOffer}
          getReviews={getReviews}
          changeActive={changeActive}
          sendReview={sendReview}
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
  loadOffersInOfferPage: pt.func,
  offers: pt.array,
  reviews: pt.array,
  isFetching: pt.bool,
  changeFetching: pt.func,
  loadOffers: pt.func,
  sortOffers: pt.func,
  activeOfferId: pt.number,
  changeActive: pt.func,
  sendReview: pt.func,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  activeCity: state.activeCity,
  listOffer: state.listOffer,
  offers: state.offers,
  uniqueCities: state.uniqueCities,
  isAuthorizationRequired: state.isAuthorizationRequired,
  login: state.login,
  reviews: getCurrentReviews(state),
  isFetching: state.isFetching,
  activeOfferId: state.activeOfferId,
});

const mapDispatchToProps = (dispatch) => ({
  chooseCityHandler: (city) => {
    dispatch(ActionCreator.changeCity(city));
    dispatch(ActionCreator.getOffers());
  },
  favoriteClickHandler: (id) => {
    dispatch(ActionCreator.changeFavorite(id));
  },
  auth: (authData) => {
    dispatch(Operation.authorization(authData));
  },
  getReviews: (id) => {
    dispatch(Operation.getReviews(id));
  },
  loadOffersInOfferPage: (id) => {
    dispatch(Operation.loadOffersInOfferPage(id));
  },
  changeFetching: (status) => {
    dispatch(ActionCreator.changeFetching(status));
  },
  loadOffers: () => {
    dispatch(Operation.loadOffers());
  },
  sortOffers: (filter) => {
    dispatch(ActionCreator.sortOffers(filter));
  },
  changeActive: (id = null) => {
    dispatch(ActionCreator.changeActive(id));
  },
  sendReview: (review, id) => {
    dispatch(Operation.sendReview(review, id));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

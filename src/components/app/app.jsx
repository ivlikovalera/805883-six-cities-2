import React from 'react';
import {connect} from 'react-redux';
import {Switch, Route} from 'react-router-dom';
import {ActionCreator as DataActionCreator, Operation as DataOperation} from '../../reducer/data/reducer.js';
import {Operation as UserOperation} from '../../reducer/user/reducer.js';
import {PropTypes as pt} from 'prop-types';
import {MainPage} from './../main-page/main-page.jsx';
import {SignIn} from '../sign-in/sign-in.jsx';
import {PageOfPlace} from './../page-of-place/page-of-place.jsx';
import {Favorites} from './../favorites/favorites.jsx';
import {WAITING} from './../../utils.js';
import {getIsAuthorizationRequired, getLogin} from './../../reducer/user/selector.js';
import {
  getActiveCity,
  getOffers,
  getFetching,
  getListOffer,
  getUniqueCities,
  getActiveOfferId,
  getFavoritePlaces,
  getSelectedFilter,
  getCurrentReviews} from './../../reducer/data/selector.js';

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
    favoritePlaces,
    loadFavorites,
    selectedFilter,
  } = props;

  return (
    <Switch>
      <Route path="/" exact render={() => {
        if (offers.length === 0) {
          if (isFetching === false) {
            changeFetching(true);
            loadOffers();
          }
          return <div>{WAITING}</div>;
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
          whichBlock={`cities`}
          loadFavorites={loadFavorites}
          selectedFilter={selectedFilter}
        />;
      }
      }/>
      <Route path="/login" exact render={() =>
        <SignIn
          auth={auth}
          login={login}
          isAuthorizationRequired={isAuthorizationRequired}
          changeActive={changeActive}
          loadFavorites={loadFavorites}
        />}
      />
      <Route path="/offer/:id" exact render={(offerProps) => {
        if (listOffer.length === 0) {
          if (isFetching === false) {
            changeFetching(true);
            loadOffersInOfferPage(parseInt(offerProps.match.params.id, 10));
          }
          return <div>{WAITING}</div>;
        }
        return <PageOfPlace
          onFavoriteClick={favoriteClickHandler}
          login={login}
          reviews={reviews}
          offers={offers}
          getReviews={getReviews}
          changeActive={changeActive}
          sendReview={sendReview}
          isAuthorizationRequired={isAuthorizationRequired}
          loadFavorites={loadFavorites}
          isFetching={isFetching}
          changeFetching={changeFetching}
          {...offerProps}
        />;
      }
      }/>
      <Route path="/favorites" exact render={() => {
        if (offers.length === 0) {
          if (isFetching === false) {
            changeFetching(true);
            loadFavorites();
            loadOffers();
          }
          return <div>{WAITING}</div>;
        }
        return <Favorites
          uniqueCities={uniqueCities}
          favoritePlaces={favoritePlaces}
          getReviews={getReviews}
          favoriteClickHandler={favoriteClickHandler}
          login={login}
          isAuthorizationRequired={isAuthorizationRequired}
          changeActive={changeActive}
          loadFavorites={loadFavorites}
        />;
      }}
      />
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
  favoritePlaces: pt.array,
  loadFavorites: pt.func,
  selectedFilter: pt.string,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  activeCity: getActiveCity(state),
  listOffer: getListOffer(state),
  offers: getOffers(state),
  uniqueCities: getUniqueCities(state),
  isAuthorizationRequired: getIsAuthorizationRequired(state),
  login: getLogin(state),
  reviews: getCurrentReviews(state),
  isFetching: getFetching(state),
  activeOfferId: getActiveOfferId(state),
  favoritePlaces: getFavoritePlaces(state),
  selectedFilter: getSelectedFilter(state),
});

const mapDispatchToProps = (dispatch) => ({
  chooseCityHandler: (city) => {
    dispatch(DataActionCreator.changeCity(city));
    dispatch(DataActionCreator.getOffers());
  },
  favoriteClickHandler: (id) => {
    dispatch(DataOperation.changeFavorite(id));
  },
  auth: (authData) => {
    dispatch(UserOperation.authorization(authData));
  },
  getReviews: (id) => {
    dispatch(DataOperation.getReviews(id));
  },
  loadOffersInOfferPage: (id) => {
    dispatch(DataOperation.loadOffersInOfferPage(id));
  },
  changeFetching: (status) => {
    dispatch(DataActionCreator.changeFetching(status));
  },
  loadOffers: () => {
    dispatch(DataOperation.loadOffers());
  },
  sortOffers: (filter) => {
    dispatch(DataActionCreator.sortOffers(filter));
  },
  changeActive: (id = null) => {
    dispatch(DataActionCreator.changeActive(id));
  },
  sendReview: (review, id) => {
    dispatch(DataOperation.sendReview(review, id));
  },
  addFavorite: (id, status) => {
    dispatch(DataOperation.addFavorite(id, status));
  },
  loadFavorites: () => {
    dispatch(DataOperation.loadFavorites());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

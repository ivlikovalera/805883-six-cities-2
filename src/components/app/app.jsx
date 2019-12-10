import React from 'react';
import {connect} from 'react-redux';
import {Switch, Route} from 'react-router-dom';
import {ActionCreator as DataActionCreator, Operation as DataOperation} from '../../reducer/data/reducer.js';
import {PropTypes as pt} from 'prop-types';
import MainPage from './../main-page/main-page.jsx';
import SignIn from '../sign-in/sign-in.jsx';
import PageOfPlace from './../page-of-place/page-of-place.jsx';
import Favorites from './../favorites/favorites.jsx';
import {WAITING} from './../../utils.js';
import {getOffers, getFetching} from './../../reducer/data/selector.js';

export const App = (props) => {
  const {
    offers,
    loadOffersInOfferPage,
    isFetching,
    changeFetching,
    loadOffers,
    loadFavorites,
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
          isCities={true}
        />;
      }
      }/>
      <Route path="/login" exact component={SignIn}
      />
      <Route path="/offer/:id" exact render={(offerProps) => {
        if (offers.length === 0) {
          if (isFetching === false) {
            changeFetching(true);
            loadOffersInOfferPage(parseInt(offerProps.match.params.id, 10));
          }
          return <div>{WAITING}</div>;
        }
        return <PageOfPlace
          offers={offers}
          loadFavorites={loadFavorites}
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
        return <Favorites />;
      }}
      />
    </Switch>
  );
};

App.propTypes = {
  offers: pt.array,
  isFetching: pt.bool,
  loadOffersInOfferPage: pt.func,
  changeFetching: pt.func,
  loadOffers: pt.func,
  changeActive: pt.func,
  loadFavorites: pt.func,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  offers: getOffers(state),
  isFetching: getFetching(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadOffersInOfferPage: (id) => {
    dispatch(DataOperation.loadOffersInOfferPage(id));
  },
  changeFetching: (status) => {
    dispatch(DataActionCreator.changeFetching(status));
  },
  loadOffers: () => {
    dispatch(DataOperation.loadOffers());
  },
  changeActive: (id = null) => {
    dispatch(DataActionCreator.changeActive(id));
  },
  loadFavorites: () => {
    dispatch(DataOperation.loadFavorites());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

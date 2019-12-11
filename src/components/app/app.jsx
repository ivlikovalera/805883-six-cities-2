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
import withSignInScreen from './../../hocs/with-sign-in-screen/with-sign-in-screen.js';

export const App = (props) => {
  const {
    offers,
    onLoadOffersInOfferPage,
    isFetching,
    onChangeFetching,
    onLoadOffers,
    onLoadFavorites,
  } = props;

  const SignInWrapped = withSignInScreen(SignIn);

  return (
    <Switch>
      <Route path="/" exact render={() => {
        if (offers.length === 0) {
          if (isFetching === false) {
            onChangeFetching(true);
            onLoadOffers();
          }
          return <div>{WAITING}</div>;
        }
        return <MainPage
          isCities={true}
        />;
      }
      }/>
      <Route path="/login" exact component={SignInWrapped}
      />
      <Route path="/offer/:id" exact render={(offerProps) => {
        if (offers.length === 0) {
          if (isFetching === false) {
            onChangeFetching(true);
            onLoadOffersInOfferPage(parseInt(offerProps.match.params.id, 10));
          }
          return <div>{WAITING}</div>;
        }
        return <PageOfPlace
          offers={offers}
          onLoadFavorites={onLoadFavorites}
          {...offerProps}
        />;
      }
      }/>
      <Route path="/favorites" exact render={() => {
        if (offers.length === 0) {
          if (isFetching === false) {
            onChangeFetching(true);
            onLoadFavorites();
            onLoadOffers();
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
  offers: pt.arrayOf(pt.object.isRequired),
  isFetching: pt.bool.isRequired,
  onLoadOffersInOfferPage: pt.func.isRequired,
  onChangeFetching: pt.func.isRequired,
  onLoadOffers: pt.func.isRequired,
  onLoadFavorites: pt.func.isRequired,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  offers: getOffers(state),
  isFetching: getFetching(state),
});

const mapDispatchToProps = (dispatch) => ({
  onLoadOffersInOfferPage: (id) => {
    dispatch(DataOperation.onLoadOffersInOfferPage(id));
  },
  onChangeFetching: (status) => {
    dispatch(DataActionCreator.onChangeFetching(status));
  },
  onLoadOffers: () => {
    dispatch(DataOperation.onLoadOffers());
  },
  onChangeActive: (id = null) => {
    dispatch(DataActionCreator.onChangeActive(id));
  },
  onLoadFavorites: () => {
    dispatch(DataOperation.onLoadFavorites());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

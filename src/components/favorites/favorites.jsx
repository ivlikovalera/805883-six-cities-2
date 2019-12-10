import React from "react";
import {PropTypes as pt} from 'prop-types';
import CardOfPlace from './../card-of-place/card-of-place.jsx';
import City from './../city/city.jsx';
import Header from './../header/header.jsx';
import {WhichPage} from './../../utils.js';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {getUniqueCities, getFavoritePlaces} from './../../reducer/data/selector.js';
import {getIsAuthorizationRequired} from './../../reducer/user/selector.js';

export const Favorites = (props) => {
  const {uniqueCities, favoritePlaces, isAuthorizationRequired} = props;
  if (isAuthorizationRequired) {
    return <Redirect to="/login" />;
  }
  return <div className={`page ${favoritePlaces.length ? null : `page--favorites-empty`}`}>
    <Header />
    <main className={`page__main page__main--favorites ${favoritePlaces.length ? null : `page__main--favorites-empty`}`}>
      <div className="page__favorites-container container">
        {favoritePlaces.length ? <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
          <ul className="favorites__list">
            {getCityArray(uniqueCities, favoritePlaces)}
          </ul>
        </section> : <section className="favorites favorites--empty"> <h1 className="visually-hidden">Favorites (empty)</h1>
          <div className="favorites__status-wrapper">
            <b className="favorites__status">Nothing yet saved.</b>
            <p className="favorites__status-description">Save properties to narrow down search or plan yor future trips.</p>
          </div>
        </section>}
      </div>
    </main>
    <footer className="footer container">
      <a className="footer__logo-link" href="main.html">
        <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
      </a>
    </footer>
  </div>;
};

const getCityArray = (uniqueCities, favoritePlaces) => {
  return uniqueCities.map((city) => {
    if (favoritePlaces.find((favoritePlace) =>
      favoritePlace.city.name === city.name)) {
      return <li className="favorites__locations-items" key={city.name}>
        <div className="favorites__locations locations locations--current">
          <div className="locations__item">
            <City
              key={city.name}
              name={city.name}
              onCityClick={() => {}}
              isFavorite={true}
            />
          </div>
        </div>
        <div className="favorites__places">
          {favoritePlaces.map((favoritePlace) => {
            if (favoritePlace.city.name === city.name) {
              return <CardOfPlace
                key={favoritePlace.id}
                id={favoritePlace.id}
                previewImage={favoritePlace.previewImage}
                title={favoritePlace.title}
                isPremium={favoritePlace.isPremium}
                isFavorite={favoritePlace.isFavorite}
                rating={favoritePlace.rating}
                type={favoritePlace.type}
                price={favoritePlace.price}
                isCities={false}
                changeActive={() => {}}
                currentPage={WhichPage.FAVORITES}
              />;
            }
            return null;
          })}
        </div>
      </li>;
    }
    return null;
  });
};

Favorites.propTypes = {
  uniqueCities: pt.array,
  favoritePlaces: pt.array,
  isAuthorizationRequired: pt.bool,
  changeActive: pt.func,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  uniqueCities: getUniqueCities(state),
  isAuthorizationRequired: getIsAuthorizationRequired(state),
  favoritePlaces: getFavoritePlaces(state),
});

export default connect(mapStateToProps)(Favorites);


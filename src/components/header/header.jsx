import React from 'react';
import {Link} from 'react-router-dom';
import {PropTypes as pt} from 'prop-types';

export const Header = (props) => {
  const {login, changeActive, isAuthorizationRequired, loadFavorites} = props;
  return <header className="header">
    <div className="container">
      <div className="header__wrapper">
        <div className="header__left">
          <Link to="/" className="header__logo-link header__logo-link--active" onClick={() => {
            changeActive();
          }}>
            <img className="header__logo" src="/img/logo.svg" alt="6 cities logo" width="81" height="41"/>
          </Link>
        </div>
        <nav className="header__nav">
          <ul className="header__nav-list">
            <li className="header__nav-item user">
              <Link to={isAuthorizationRequired ? `/login` : `/favorites`} className="header__nav-link header__nav-link--profile" onClick={() => {
                if (!isAuthorizationRequired) {
                  loadFavorites();
                }
              }}>
                <div className="header__avatar-wrapper user__avatar-wrapper">
                </div>
                <span className="header__user-name user__name">{login}</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>;
};

Header.propTypes = {
  login: pt.string,
  changeActive: pt.func,
  isAuthorizationRequired: pt.bool,
  loadFavorites: pt.func,
};

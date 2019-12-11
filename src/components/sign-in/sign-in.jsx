import React from 'react';
import {Redirect} from 'react-router-dom';
import {PropTypes as pt} from 'prop-types';
import Header from './../header/header.jsx';
import {connect} from 'react-redux';
import {getIsAuthorizationRequired} from './../../reducer/user/selector.js';
import {Operation as UserOperation} from '../../reducer/user/reducer.js';

export const SignIn = (props) => {
  const {
    onAuth,
    email,
    password,
    isAuthorizationRequired,
    onChangeEmail,
    onChangePassword
  } = props;

  if (!isAuthorizationRequired) {
    return <Redirect to="/" />;
  } else {
    return (
      <div className='page page--gray page--login'>
        <Header />
        <main className='page__main page__main--login'>
          <h1 className="visually-hidden">Login</h1>
          <div className="page__login-container container">
            <section className="login">
              <h1 className="login__title">Sign in</h1>
              <form className="login__form form" action="#" method="post">
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden">E-mail</label>
                  <input className="login__input form__input" type="email" name="email" placeholder="Email" required="" value={email} onChange={(evt) => {
                    evt.preventDefault();
                    onChangeEmail(evt.target.value);
                  }
                  }/>
                </div>
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden">Password</label>
                  <input className="login__input form__input" type="password" name="password" placeholder="Password" required="" value={password} onChange={(evt) => {
                    evt.preventDefault();
                    onChangePassword(evt.target.value);
                  }
                  }/>
                </div>
                <button className="login__submit form__submit button" type="submit" onClick={(evt) => {
                  evt.preventDefault();
                  onAuth({
                    email,
                    password
                  });
                }}>Sign in</button>
              </form>
            </section>
            <section className="locations locations--login locations--current">
              <div className="locations__item">
                <a className="locations__item-link" href="#">
                  <span>Amsterdam</span>
                </a>
              </div>
            </section>
          </div>
        </main>
      </div>
    );
  }
};

SignIn.propTypes = {
  email: pt.string,
  password: pt.string,
  isAuthorizationRequired: pt.bool.isRequired,
  onAuth: pt.func.isRequired,
  onChangeEmail: pt.func.isRequired,
  onChangePassword: pt.func.isRequired,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  isAuthorizationRequired: getIsAuthorizationRequired(state),
});

const mapDispatchToProps = (dispatch) => ({
  onAuth: (authData) => {
    dispatch(UserOperation.authorization(authData));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

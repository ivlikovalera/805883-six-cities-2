import React from 'react';
import {PropTypes as pt} from 'prop-types';

export class SignIn extends React.PureComponent {
  constructor(props) {
    super(props);
    this.auth = this.props.auth;

    this.state = {
      email: ``,
      password: ``,
    };
  }

  render() {
    return <div className="page__login-container container">
      <section className="login">
        <h1 className="login__title">Sign in</h1>
        <form className="login__form form" action="#" method="post">
          <div className="login__input-wrapper form__input-wrapper">
            <label className="visually-hidden">E-mail</label>
            <input className="login__input form__input" type="email" name="email" placeholder="Email" required="" value={this.state.email} onChange={(evt) => {
              evt.preventDefault();
              this.setState({email: evt.target.value});
            }
            }/>
          </div>
          <div className="login__input-wrapper form__input-wrapper">
            <label className="visually-hidden">Password</label>
            <input className="login__input form__input" type="password" name="password" placeholder="Password" required="" value={this.state.password} onChange={(evt) => {
              evt.preventDefault();
              this.setState({password: evt.target.value});
            }
            }/>
          </div>
          <button className="login__submit form__submit button" type="submit" onClick={(evt) => {
            evt.preventDefault();
            this.auth(this.state);
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
    </div>;
  }
}

SignIn.propTypes = {
  auth: pt.func,
};
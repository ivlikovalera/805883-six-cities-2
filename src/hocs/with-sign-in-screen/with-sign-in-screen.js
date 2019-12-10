import React, {PureComponent} from 'react';

const withSignInScreen = (Component) => {
  class WithSignInScreen extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        email: ``,
        password: ``,
      };
    }

    _handleChangeEmail(value) {
      this.setState({
        email: value
      });
    }

    _handleChangePassword(value) {
      this.setState({
        password: value
      });
    }

    render() {
      return <Component
        {...this.props}
        email={this.state.email}
        password={this.state.password}
        onChangeEmail={this._handleChangeEmail.bind(this)}
        onChangePassword={this._handleChangePassword.bind(this)}
      />;
    }
  }
  return WithSignInScreen;
};

export default withSignInScreen;

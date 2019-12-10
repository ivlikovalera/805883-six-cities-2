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

    render() {
      return <Component
        {...this.props}
        email={this.state.email}
        password={this.state.password}
        onChangeEmail={this._changeEmailHandler.bind(this)}
        onChangePassword={this._changePasswordHandler.bind(this)}
      />;
    }

    _changeEmailHandler(value) {
      this.setState({
        email: value
      });
    }

    _changePasswordHandler(value) {
      this.setState({
        password: value
      });
    }
  }
  return WithSignInScreen;
};

export default withSignInScreen;

import React from 'react';
import {PureComponent} from 'react';

const withActiveItem = (Component) => {
  class WithActiveItem extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        isActiveCard: -1
      };
      this._cardPointHandler = this._cardPointHandler.bind(this);
    }
    render() {
      return <Component
        {...this.props}
        isActiveCard={this.state.isActiveCard}
        cardPointHandler={this._cardPointHandler}
      />;
    }
    _cardPointHandler(id) {
      this.setState({
        isActiveCard: id
      });
    }
  }
  return WithActiveItem;
};

export default withActiveItem;

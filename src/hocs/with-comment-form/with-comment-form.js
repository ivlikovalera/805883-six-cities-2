import React, {PureComponent} from 'react';

const withCommentForm = (Component) => {
  class WithCommentForm extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        comment: ``,
        rating: 0,
      };
    }

    render() {
      return <Component
        {...this.props}
        comment={this.state.comment}
        rating={this.state.rating}
        onChangeRating={this._changeRatingHandler.bind(this)}
        onChangeComment={this._changeCommentHandler.bind(this)}
      />;
    }

    _changeRatingHandler(value) {
      this.setState({
        rating: value
      });
    }

    _changeCommentHandler(value) {
      this.setState({
        comment: value
      });
    }
  }
  return WithCommentForm;
};

export default withCommentForm;

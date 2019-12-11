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

    _handleChangeRating(value) {
      this.setState({
        rating: value
      });
    }

    _handleChangeComment(value) {
      this.setState({
        comment: value
      });
    }

    render() {
      return <Component
        {...this.props}
        comment={this.state.comment}
        rating={this.state.rating}
        onChangeRating={this._handleChangeRating.bind(this)}
        onChangeComment={this._handleChangeComment.bind(this)}
      />;
    }
  }
  return WithCommentForm;
};

export default withCommentForm;

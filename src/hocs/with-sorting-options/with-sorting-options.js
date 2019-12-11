import React, {PureComponent} from 'react';
import {FilterType} from './../../utils.js';

const withSortingOptions = (Component) => {
  class WithSortingOptions extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isOpen: false,
        selectedFilter: FilterType.POPULAR,
      };
    }

    _handleOpenCloseFilter() {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }

    _handleChangeFilter(type) {
      this.setState({
        selectedFilter: type,
        isOpen: false,
      });
    }

    render() {
      return <Component
        isOpen={this.state.isOpen}
        selectedFilter={this.state.selectedFilter}
        onChangeFilter={this._handleChangeFilter.bind(this)}
        onOpenCloseFilter={this._handleOpenCloseFilter.bind(this)}
        {...this.props}
      />;
    }
  }

  return WithSortingOptions;
};

export default withSortingOptions;

import React from 'react';
import {connect} from 'react-redux';
import {FilterType} from './../../utils.js';
import {PropTypes as pt} from 'prop-types';
import {ActionCreator as DataActionCreator} from '../../reducer/data/reducer.js';
import {getSelectedFilter} from './../../reducer/data/selector.js';

export class SortingOptions extends React.PureComponent {
  constructor(props) {
    super(props);
    this.sortOffers = this.props.sortOffers;

    this.state = {
      isOpen: false,
      selectedFilter: this.props.selectedFilter,
    };
  }

  _changeFilter(type) {
    this.setState({
      selectedFilter: type,
      isOpen: false,
    });
    this.sortOffers(type);
  }

  render() {
    return (
      <form className="places__sorting" action="#" method="get">
        <span className="places__sorting-caption">Sort by&nbsp;</span>
        <span className="places__sorting-type" tabIndex="0" onClick={(evt) => {
          evt.preventDefault();
          this.setState({isOpen: !this.state.isOpen});
        }
        }>
          {this.state.selectedFilter}
          <svg className="places__sorting-arrow" width="7" height="4">
            <use xlinkHref="#icon-arrow-select"></use>
          </svg>
        </span>
        {this.state.isOpen ? <ul className="places__options places__options--custom places__options--opened">
          <li className={this.state.selectedFilter === FilterType.POPULAR ?
            `places__option places__option--active` : `places__option`} tabIndex="0" onClick={() => {
            this._changeFilter(FilterType.POPULAR);
          }
          }>Popular</li>
          <li className={this.state.selectedFilter === FilterType.PRICE ?
            `places__option places__option--active` : `places__option`} tabIndex="0" onClick={() => {
            this._changeFilter(FilterType.PRICE);
          }
          }>Price: low to high</li>
          <li className={this.state.selectedFilter === FilterType.PRICEDESC ?
            `places__option places__option--active` : `places__option`} tabIndex="0"onClick={() => {
            this._changeFilter(FilterType.PRICEDESC);
          }
          }>Price: high to low</li>
          <li className={this.state.selectedFilter === FilterType.RATED ?
            `places__option places__option--active` : `places__option`} tabIndex="0"onClick={() => {
            this._changeFilter(FilterType.RATED);
          }
          }>Top rated first</li>
        </ul> : null}
      </form>
    );
  }
}

SortingOptions.propTypes = {
  sortOffers: pt.func,
  selectedFilter: pt.string,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  selectedFilter: getSelectedFilter(state),
});

const mapDispatchToProps = (dispatch) => ({
  sortOffers: (filter) => {
    dispatch(DataActionCreator.sortOffers(filter));
    dispatch(DataActionCreator.getOffers());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SortingOptions);

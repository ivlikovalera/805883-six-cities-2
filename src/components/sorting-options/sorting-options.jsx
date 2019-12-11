import React from 'react';
import {connect} from 'react-redux';
import {PropTypes as pt} from 'prop-types';
import {ActionCreator as DataActionCreator} from '../../reducer/data/reducer.js';
import {getSelectedFilter} from './../../reducer/data/selector.js';
import {FilterType} from './../../utils.js';

export const SortingOptions = (props) => {
  const {
    onSortOffers,
    isOpen,
    selectedFilter,
    onChangeFilter,
    onOpenCloseFilter
  } = props;

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by&nbsp;</span>
      <span className="places__sorting-type" tabIndex="0" onClick={(evt) => {
        evt.preventDefault();
        onOpenCloseFilter();
      }
      }>
        {selectedFilter}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      {isOpen ? <ul className="places__options places__options--custom places__options--opened">
        <li className={selectedFilter === FilterType.POPULAR ?
          `places__option places__option--active` : `places__option`} tabIndex="0" onClick={() => {
          onChangeFilter(FilterType.POPULAR);
          onSortOffers(FilterType.POPULAR);
        }
        }>Popular</li>
        <li className={selectedFilter === FilterType.PRICE ?
          `places__option places__option--active` : `places__option`} tabIndex="0" onClick={() => {
          onChangeFilter(FilterType.PRICE);
          onSortOffers(FilterType.PRICE);
        }
        }>Price: low to high</li>
        <li className={selectedFilter === FilterType.PRICEDESC ?
          `places__option places__option--active` : `places__option`} tabIndex="0"onClick={() => {
          onChangeFilter(FilterType.PRICEDESC);
          onSortOffers(FilterType.PRICEDESC);
        }
        }>Price: high to low</li>
        <li className={selectedFilter === FilterType.RATED ?
          `places__option places__option--active` : `places__option`} tabIndex="0"onClick={() => {
          onChangeFilter(FilterType.RATED);
          onSortOffers(FilterType.RATED);
        }
        }>Top rated first</li>
      </ul> : null}
    </form>
  );
};

SortingOptions.propTypes = {
  onSortOffers: pt.func,
  selectedFilter: pt.oneOf([FilterType.POPULAR, FilterType.PRICE, FilterType.PRICEDESC, FilterType.RATED]).isRequired,
  isOpen: pt.bool,
  onChangeFilter: pt.func.isRequired,
  onOpenCloseFilter: pt.func,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  selectedFilter: getSelectedFilter(state),
});

const mapDispatchToProps = (dispatch) => ({
  onSortOffers: (filter) => {
    dispatch(DataActionCreator.onSortOffers(filter));
    dispatch(DataActionCreator.getOffers());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SortingOptions);

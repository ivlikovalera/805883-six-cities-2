import React from 'react';
import renderer from 'react-test-renderer';
import {CardOfPlace} from './card-of-place.jsx';
import {BrowserRouter} from 'react-router-dom';
import {WhichPage} from './../../utils.js';

it(`Card correctly renders after relaunch`, () => {

  const cardComponent = renderer
  .create(<BrowserRouter>
    <CardOfPlace
      id={0}
      onFavoriteClick={() => {}}
      onGetReviews={() => {}}
      previewImage={``}
      title={``}
      isPremium={true || false}
      isFavorite={true || false}
      rating={0}
      type={``}
      price={0}
      onChangeActive={() => {}}
      currentPage={WhichPage.MAINPAGE || WhichPage.PAGEOFPLACE || WhichPage.FAVORITES}
    />
  </BrowserRouter>)
  .toJSON();

  expect(cardComponent).toMatchSnapshot();
});

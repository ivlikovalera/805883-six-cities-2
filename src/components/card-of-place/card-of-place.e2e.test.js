import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {CardOfPlace} from './card-of-place.jsx';
import {WhichPage} from './../../utils.js';

Enzyme.configure({adapter: new Adapter()});

describe(`Check active card`, () => {
  it(`When you hover over the card,
    the processor gets the correct information
    about the object`, () => {
    const cardPointHandler = jest.fn();
    const id = 22;
    const card = shallow(<CardOfPlace
      id={id}
      onFavoriteClick={() => {}}
      onGetReviews={() => {}}
      previewImage={``}
      title={``}
      isPremium={true || false}
      isFavorite={true || false}
      rating={0}
      type={``}
      price={0}
      onChangeActive={cardPointHandler}
      currentPage={WhichPage.MAINPAGE || WhichPage.PAGEOFPLACE || WhichPage.FAVORITES}
    />);
    card.simulate(`mouseover`);
    expect(cardPointHandler).toBeCalledWith(id);
  });

  it(`When you hover out the card,
    the processor gets the correct information
    about the object`, () => {
    const cardPointHandler = jest.fn();
    const id = 22;
    const card = shallow(<CardOfPlace
      id={22}
      onFavoriteClick={() => {}}
      onGetReviews={() => {}}
      previewImage={``}
      title={``}
      isPremium={true || false}
      isFavorite={true || false}
      rating={0}
      type={``}
      price={0}
      onChangeActive={cardPointHandler}
      currentPage={WhichPage.MAINPAGE || WhichPage.PAGEOFPLACE || WhichPage.FAVORITES}
    />);
    card.simulate(`mouseover`);
    card.simulate(`mouseout`);
    expect(cardPointHandler.value !== id).toBeTruthy();
  });
});

describe(`Check favorite button`, () => {
  it(`When you click favorite button on unfavorite object,
    the processor gets the correct information
    about the object`, () => {
    const favoriteButtonClickHandler = jest.fn();
    const id = 22;
    const event = {
      preventDefault() {}
    };
    const card = shallow(<CardOfPlace
      id={id}
      onFavoriteClick={favoriteButtonClickHandler}
      onGetReviews={() => {}}
      previewImage={``}
      title={``}
      isPremium={true || false}
      isFavorite={false}
      rating={0}
      type={``}
      price={0}
      onChangeActive={() => {}}
      currentPage={WhichPage.MAINPAGE || WhichPage.PAGEOFPLACE || WhichPage.FAVORITES}
    />);
    const favoriteButton = card.find(`.place-card__bookmark-button`);
    favoriteButton.simulate(`click`, event);
    expect(favoriteButtonClickHandler).toBeCalledWith(id);
  });

  it(`When you click favorite button on favorite object,
    the processor gets the correct information
    about the object`, () => {
    const favoriteButtonClickHandler = jest.fn();
    const id = 22;
    const event = {
      preventDefault() {}
    };
    const card = shallow(<CardOfPlace
      id={id}
      onFavoriteClick={favoriteButtonClickHandler}
      onGetReviews={() => {}}
      previewImage={``}
      title={``}
      isPremium={true || false}
      isFavorite={true}
      rating={0}
      type={``}
      price={0}
      onChangeActive={() => {}}
      currentPage={WhichPage.MAINPAGE || WhichPage.PAGEOFPLACE || WhichPage.FAVORITES}
    />);
    const favoriteButton = card.find(`.place-card__bookmark-button`);
    favoriteButton.simulate(`click`, event);
    expect(favoriteButtonClickHandler).toBeCalledWith(id);
  });
});

describe(`Check open page of place`, () => {
  it(`When you click on name,
    the processor gets the correct information
    about the object`, () => {
    const onGetReviewsHandler = jest.fn();
    const cardPointHandler = jest.fn();
    const id = 22;
    const card = shallow(<CardOfPlace
      id={id}
      onFavoriteClick={() => {}}
      onGetReviews={onGetReviewsHandler}
      previewImage={``}
      title={``}
      isPremium={true || false}
      isFavorite={true || false}
      rating={0}
      type={``}
      price={0}
      onChangeActive={cardPointHandler}
      currentPage={WhichPage.MAINPAGE || WhichPage.PAGEOFPLACE || WhichPage.FAVORITES}
    />);
    const nameLink = card.find(`.place-card_title`);
    nameLink.simulate(`click`);
    expect(onGetReviewsHandler).toBeCalledWith(id);
    expect(cardPointHandler).toBeCalledWith(id);
  });
});

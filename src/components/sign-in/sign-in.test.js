import React from 'react';
import renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';
import {SignIn} from './sign-in.jsx';

jest.mock(`../header/header.jsx`);

it(`Sign in page correctly renders after relaunch`, () => {

  const signInComponent = renderer
  .create(<BrowserRouter>
    <SignIn
      email={``}
      password={``}
      isAuthorizationRequired={true || false}
      onAuth={() => {}}
      onChangeEmail={() => {}}
      onChangePassword={() => {}}
    />
  </BrowserRouter>)
  .toJSON();

  expect(signInComponent).toMatchSnapshot();
});

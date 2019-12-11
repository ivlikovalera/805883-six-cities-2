import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {SignIn} from './sign-in.jsx';

Enzyme.configure({adapter: new Adapter()});

describe(`Check change inputs`, () => {
  it(`When you change on email,
    the processor gets the correct information
    about the object`, () => {
    const changeEmailHandler = jest.fn();
    const text = `johndoe@mail.com`;
    const event = {
      target: {
        value: text
      },
      preventDefault() {}
    };
    const signIn = shallow(<SignIn
      email={``}
      password={``}
      isAuthorizationRequired={true}
      onAuth={() => {}}
      onChangeEmail={changeEmailHandler}
      onChangePassword={() => {}}
    />);
    const emailInput = signIn.find(`[name="email"]`);
    emailInput.simulate(`change`, event);
    expect(changeEmailHandler).toBeCalledWith(text);
  });

  it(`When you change on password,
  the processor gets the correct information
  about the object`, () => {
    const changePasswordHandler = jest.fn();
    const text = `123123`;
    const event = {
      target: {
        value: text
      },
      preventDefault() {}
    };

    const signIn = shallow(<SignIn
      email={``}
      password={``}
      isAuthorizationRequired={true}
      onAuth={() => {}}
      onChangeEmail={() => {}}
      onChangePassword={changePasswordHandler}
    />);
    const passwordInput = signIn.find(`[name="password"]`);
    passwordInput.simulate(`change`, event);
    expect(changePasswordHandler).toBeCalledWith(text);
  });

});

describe(`Send review`, () => {
  it(`When you authorize,
    the processor gets the correct information
    about the object`, () => {
    const authHandler = jest.fn();
    const event = {
      preventDefault() {}
    };
    const email = `johndoe@mail.com`;
    const password = `123123`;
    const signIn = shallow(<SignIn
      email={email}
      password={password}
      isAuthorizationRequired={true}
      onAuth={authHandler}
      onChangeEmail={() => {}}
      onChangePassword={() => {}}
    />);
    const submitButton = signIn.find(`.login__submit`);
    submitButton.simulate(`click`, event);
    expect(authHandler).toBeCalledWith({email, password});
  });
});

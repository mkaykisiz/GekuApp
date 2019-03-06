import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Logo from './Components/Logo';
import Form from './Components/Form';
import Wallpaper from './Components/Wallpaper';
import ButtonSubmit from './Components/ButtonSubmit';
import SignupSection from './Components/SignupSection';

export default class LoginScreen extends Component {
  render() {
    return (
      <Wallpaper>
        <Logo />
        <Form />
        <ButtonSubmit />
        <SignupSection />
      </Wallpaper>
    );
  }
}
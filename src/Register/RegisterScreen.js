import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Logo from './Components/Logo';
import Form from './Components/Form';
import Wallpaper from './Components/Wallpaper';
import ButtonSubmit from './Components/ButtonSubmit';
import ButtonLoginRedirect from './Components/ButtonLoginRedirect';
import SignupSection from './Components/SignupSection';
import {Animated, Text} from "react-native";

export default class RegisterScreen extends Component {
    constructor() {
        super();
    }

    state = {
        email: "",
        username: "",
        password: "",
    };


    getEmail(value) {
        this.setState({email: value})
    };

    getUsername(value) {
        this.setState({username: value})
    };

    getPassword(value) {
        this.setState({password: value})
    };

    render() {
        return (
            <Wallpaper>
                <Logo/>
                <Form
                    getEmail={this.getEmail.bind(this)}
                    getUsername={this.getUsername.bind(this)}
                    getPassword={this.getPassword.bind(this)}
                />
                <ButtonSubmit
                    email={this.state.email}
                    username={this.state.username}
                    password={this.state.password}
                />
                <ButtonLoginRedirect/>
            </Wallpaper>
        );
    }
}
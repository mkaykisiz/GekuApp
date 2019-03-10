import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Logo from './Components/Logo';
import Form from './Components/Form';
import Wallpaper from './Components/Wallpaper';
import ButtonSubmit from './Components/ButtonSubmit';
import SignupSection from './Components/SignupSection';

export default class LoginScreen extends Component {
    constructor() {
        super();
    }

    state = {
        email: "",
        password: "",
    };


    getEmail(value) {
        this.setState({email: value})
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
                    getPassword={this.getPassword.bind(this)}
                />
                <ButtonSubmit
                    email={this.state.email}
                    password={this.state.password}
                />
                <SignupSection/>
            </Wallpaper>
        );
    }
}
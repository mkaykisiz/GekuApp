import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
import {
    StyleSheet,
    KeyboardAvoidingView,
    View,
    ActivityIndicator,
    TouchableOpacity,
    Image, TextInput,
} from 'react-native';

import UserInput from './UserInput';

import usernameImg from '../../../images/username.png';
import emailImg from '../../../images/email.png';
import passwordImg from '../../../images/password.png';
import eyeImg from '../../../images/eye_black.png';
import {Body} from "native-base";

export default class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPass: true,
            press: false,
        };
        this.showPass = this.showPass.bind(this);
    }

    showPass() {
        this.state.press === false
            ? this.setState({showPass: false, press: true})
            : this.setState({showPass: true, press: false});
    }

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>

                <UserInput
                    source={emailImg}
                    placeholder="email"
                    autoCapitalize={'none'}
                    returnKeyType={'done'}
                    autoCorrect={false}
                    getValue={this.props.getEmail}
                    keyboardType="email-address"
                />
                <UserInput
                    source={usernameImg}
                    placeholder="Username"
                    autoCapitalize={'none'}
                    returnKeyType={'done'}
                    autoCorrect={false}
                    getValue={this.props.getUsername}
                />
                <UserInput
                    source={passwordImg}
                    secureTextEntry={this.state.showPass}
                    placeholder="Password"
                    returnKeyType={'done'}
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    getValue={this.props.getPassword}
                />
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.btnEye}
                    onPress={this.showPass}>
                    <Image source={eyeImg} style={styles.iconEye}/>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        );
    }
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    btnEye: {
        position: 'absolute',
        top: 23,
        right: 28,
    },
    iconEye: {
        width: 25,
        height: 25,
        top: 73,
        tintColor: 'rgba(0,0,0,0.2)',
    },
});
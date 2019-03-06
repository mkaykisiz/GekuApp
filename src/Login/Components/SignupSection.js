import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    Animated
} from 'react-native';
import spinner from "../../../images/loading.gif";
import {Actions} from "react-native-router-flux";

export default class SignupSection extends Component {
    render() {
        return (
            <View style={styles.container}>

                <TouchableOpacity
                    style={styles.button}
                    onPress={Actions.registerScreen}
                    activeOpacity={1}>
                    <Text style={styles.text}>Create Account</Text>
                </TouchableOpacity>
                <Text style={styles.text}>Forgot Password?</Text>
            </View>
        );
    }
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        top: 65,
        width: DEVICE_WIDTH,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    text: {
        color: 'white',
        backgroundColor: 'transparent',
    },
});
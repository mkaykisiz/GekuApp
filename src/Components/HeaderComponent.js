import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {View, Text, TouchableOpacity, Platform, StyleSheet} from "react-native";
import {Icon} from "native-base";
import {Actions} from 'react-native-router-flux';

class HeaderComponent extends PureComponent {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        title: PropTypes.string.isRequired,
    };

    render = () => {
        return (
            <View style={styles.view}>
                <View style={styles.iconView}>
                    <TouchableOpacity onPress={() => Actions.pop()}>
                        <Icon name='arrow-back'/>
                    </TouchableOpacity>
                </View>
                <View style={styles.titleView}>
                    <Text style={styles.titleText}>{this.props.title}</Text>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    view: {
        marginTop:Platform.OS === 'ios' ? 24 : 0,
        height: 50,
        width: '100%',
        elevation: 0,
        flexDirection: 'row'
    },
    viewIOS: {
        height: 50,
        width: '100%',
        elevation: 0,
        flexDirection: 'row'
    },
    iconView: {

        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width: 40
    },
    titleView: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        paddingRight: 40
    },
    titleTex: {
        fontSize: 20
    }


});

export default HeaderComponent;
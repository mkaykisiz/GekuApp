import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from "react-native";

class HeaderComponent extends PureComponent{
    constructor(props){
        super(props);
    }

    static propTypes = {
        title: PropTypes.string.isRequired,
    };

    render = () => {
        return(
            <View style={{marginTop:50, height:50, alignContent:'center', justifyContent:'center'}}>
                <Text style={{alignSelf:'left', fontSize:30}}>
                    {this.props.title}
                </Text>
            </View>
        );
    }
}

export default HeaderComponent;
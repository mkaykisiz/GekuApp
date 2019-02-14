import React, {PureComponent} from 'react';
import {View, ActivityIndicator} from "react-native";

class LoadingComponent extends PureComponent{
    constructor(props){
        super(props);
    }

    render = () => {
        return(
            <View style={{flex: 1}}>
                <ActivityIndicator size="small" color="#00ff00"/>
            </View>
        );
    }
}

export default LoadingComponent;

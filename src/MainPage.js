/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {View, Fab, Button, Icon} from 'native-base';
import Loading from "./Components/LoadingComponent";
import DeckSwiperCard from "./Components/DeckSwiperCards";

export default class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            dataSource: [],
            showContent: false,
        };
        this.pageNo = 1;
        this.resultCount = 5;
        this.index = 0;
    }

    getPosts(resultCount, pageNumber) {
        return fetch('https://randomuser.me/api/?results=' + resultCount + '&page=' + pageNumber)
            .then((response) => response.json())
            .then((responseJson) => {
                let results = responseJson.results;
                if (results.length > 0) {
                    this.setState({
                        dataSource: [...this.state.dataSource, ...results],
                        showContent: true,
                        isLoaded: true
                    });
                } else {
                    this.setState({
                        showContent: false
                    })
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    onSwipe = (direction) => {
        // set value
        this.index += 1;
        if (((this.resultCount * this.pageNo) - this.index) === 3) {
            this.pageNo = this.pageNo + 1;
            this.getPosts(this.resultCount, this.pageNo);
        }
    };

    componentDidMount() {
        this.getPosts(this.resultCount, this.pageNo);
    }

    render() {

        return (
            <View style={{flex: 1, backgroundColor: '#fff'}}>
                <View style={{flex: 1}}>
                    {!this.state.isLoaded ?
                        <Loading/>
                        :
                        <DeckSwiperCard
                            onSwipe={this.onSwipe}
                            dataSource={this.state.dataSource}
                            showContent={this.state.showContent}
                        />
                    }
                    <Fab
                        active={this.state.active}
                        direction="up"
                        containerStyle={{}}
                        style={{backgroundColor: '#8231f8'}}
                        position="bottomRight"
                        onPress={() => Actions.cretatePost()}>
                        <Icon type="FontAwesome" name="plus"/>
                    </Fab>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    centerScreen: {
        alignItems: 'center',
        justifyContent: 'center',
    }
});

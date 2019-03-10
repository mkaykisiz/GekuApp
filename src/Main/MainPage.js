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
import RNSharedConfig from 'react-native-shared-config';

import Loading from "../Components/LoadingComponent";
import DeckSwiperCard from "../Components/DeckSwiperCards";

import * as AllConstants from '../AllConstants.js';

export default class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            dataSource: [],
            showContent: false,
            user_token: null,
            user_id: null
        };
        this.pageNo = 1;
        this.resultCount = 5;
        this.index = 0;
    }

    componentDidMount() {
        RNSharedConfig.getItem('user_token').then((user_token) => {
            if (user_token === null) {
                Actions.loginScreen();
            } else {
                RNSharedConfig.getItem('user_id').then((user_id) => {
                    if (user_id === null) {
                        Actions.loginScreen();
                    } else {
                        this.setState({user_id: user_id});
                        this.setState({user_token: user_token});
                        this.getPosts(this.resultCount, this.pageNo);
                    }
                });
            }
        });
    }

    getPosts(resultCount, pageNumber) {
        return fetch(AllConstants.ENV_URL + '/posts/?page_number=' + pageNumber +
            '&per_page=' + resultCount + '&not_likes=["' + this.state.user_id +
            '"]&not_unlikes=["' + this.state.user_id+'"]', {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.state.user_token
            }
        }).then((response) => response.json())
            .then((results) => {
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
        let direction_type = direction === 'left' ? 'unlike' : 'like';
        console.log(direction_type);
        let post_id = this.state.dataSource[this.index]._id;
        console.log(post_id);
        const payload = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.state.user_token
            }
        };
        console.log(AllConstants.ENV_URL + '/posts/'+ post_id +'/' + direction_type);
        fetch(AllConstants.ENV_URL + '/posts/'+ post_id +'/' + direction_type, payload
        ).then((response) => {
            if (!response.ok) {
                alert("Login Error, Please try again later!");
                console.log(response)
            } else return response.json();
        }).catch(error => {
            console.log('Swipe error:', error);
            alert("Swipe Error, Please try again later!");
            this.setState({isLoading: false});
        });

        this.index += 1;
        if (((this.resultCount * this.pageNo) - this.index) === 3) {
            this.pageNo = this.pageNo + 1;
            this.getPosts(this.resultCount, this.pageNo);
        }
    };


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

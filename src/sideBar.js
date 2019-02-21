import React, { Component } from 'react';
import { StyleSheet, Image, TouchableOpacity} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { View, Content, List, ListItem, Text, Button } from 'native-base';


type Props = {};
export default class App extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            loading: false
        };
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <View style={{
                    flex: 2,
                    backgroundColor: '#8231f8',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <TouchableOpacity
                        onPress={() => Actions.profileNew({seed: 'something'})}>
                        <Image
                            style={{width: 130, height: 130, borderRadius: 65}}
                            source={{uri: this.state.photo}}/>
                        <Text style={{
                            color: '#fff',
                            fontSize: 22,
                            marginTop: 10,
                            fontWeight: 'bold',
                            alignSelf: 'center',
                        }}>{this.state.nameFirst} {this.state.nameLast}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flex: 3}}>
                    <Content>
                        <List>
                            <ListItem onPress={() => Actions.profileNew()}>
                                <Text style={{
                                    color: '#898989'
                                }}>
                                    Profile
                                </Text>
                            </ListItem>
                            <ListItem onPress={() => Actions.profileLists({
                                intState: 0,
                                comeUserId: this.state.userId
                            })}>
                                <Text style={{
                                    color: '#898989'
                                }}>
                                    My Communities
                                </Text>
                            </ListItem>
                            <ListItem onPress={() => Actions.followRequests()}>
                                <Text style={{
                                    color: '#898989'
                                }}>
                                    Follow Requests
                                </Text>
                            </ListItem>

                        </List>
                    </Content>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 250
    }
});

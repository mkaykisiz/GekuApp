/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {PureComponent} from 'react';
import {
    Image,
    PixelRatio,
    StyleSheet,
    TouchableOpacity, TextInput,
    KeyboardAvoidingView,
    View, Dimensions, ScrollView,
} from 'react-native';
import {
    Container,
    Card,
    CardItem,
    Thumbnail,
    Left,
    Text,
    Button,
    Body
} from 'native-base';

import ImagePicker from 'react-native-image-picker';
import HeaderCompanent from '../Components/HeaderComponent'
import Loading from "../Components/LoadingComponent";
import * as AllConstants from '../AllConstants.js';
import RNSharedConfig from 'react-native-shared-config';
import {Actions} from "react-native-router-flux";


const options = {
    title: 'Select Avatar',
    storageOptions: {
        skipBackup: true,
        path: 'images'
    },
};
const maxContentLength = AllConstants.POST_CONTENT_TEXT_LENGHT;
const dimensions = Dimensions.get('window');
const imageHeight = Math.round(dimensions.height * 4 / 10);

export default class CreatePost extends PureComponent {
    constructor(props) {
        super(props);
        var today = new Date();

    }

    state = {
        imageContent: null,
        imageName: null,
        imageType: null,
        text: "",
        textLength: maxContentLength,
        isLoading: null,
        username: null
    };

    componentDidMount() {
        const local_username = RNSharedConfig.getItem('username');
        const username = (local_username === null) ? local_username : "Anonim";
        this.setState({username: username});
    }

    changeProfileImage = () => {
        this.setState({isLoading: true});
        ImagePicker.showImagePicker(options, (responsePhoto) => {
            if (responsePhoto.didCancel) {
                console.log('User cancelled image picker');
            } else if (responsePhoto.error) {
                console.log('ImagePicker Error: ', responsePhoto.error);
            } else {
                this.setState({
                    imageContent: responsePhoto.uri,
                    imageName: responsePhoto.fileName,
                    imageType: responsePhoto.type,
                });
            }
            this.setState({isLoading: false});
        });
    };

    onChangePostContentText(text) {
        this.setState({
            textLength: maxContentLength - text.length,
            text: text
        });
    }

    uploadPost = () => {
        this.setState({isLoading: true});
        const payload = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                text: this.state.text
            })
        };
        fetch(AllConstants.ENV_URL + `/posts/`, payload
        ).then(response => response.json()).then(data => {
            const imageItem = {
                uri: this.state.imageContent,
                type: this.state.imageType,
                name: this.state.imageName,
            };
            const formData = new FormData();
            formData.append('file_item', imageItem);
            const payload = {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                body: formData
            };
            fetch(AllConstants.ENV_URL + '/posts/' + data._id.toString() + '/image', payload
            ).then(img_response => img_response.json()).then(img_data => {
                this.setState({isLoading: false});
                Actions.pop();
            }).catch(error => {
                console.log('uploadImage error:', error);
                this.setState({isLoading: false});
            })
        }).catch(error => {
            console.log('uploadImage error:', error);
            this.setState({isLoading: false});
        })
    };

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{flex: 1}}>
                    <HeaderCompanent title={"Share It"}/>
                    <Loading/>
                </View>
            )
        }
        return (
            <Container>

                <HeaderCompanent title={"Share It"}/>
                {this.state.imageContent === null ?
                    <View style={styles.container}>
                        <TouchableOpacity onPress={this.changeProfileImage}>
                            <View
                                style={[
                                    styles.avatar,
                                    styles.avatarContainer
                                ]}>
                                <Text>Select a Photo</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    : (
                        <ScrollView contentContainerStyle={styles.scrollView}>
                            <KeyboardAvoidingView style={{flex: 1}}
                                                  keyboardVerticalOffset={0}
                                                  behavior={"position"}>
                                <Card>
                                    <CardItem>
                                        <Left>
                                            <Thumbnail
                                                source={{uri: this.state.imageContent}}/>
                                            <Body>
                                            <TextInput
                                                style={{
                                                    fontWeight: 'bold',
                                                    height: 30
                                                }}
                                                maxLength={40}
                                                onChangeText={(username) => this.setState({username})}
                                                value={this.state.username}
                                            />

                                            <Text
                                                note>{new Date().toDateString()}</Text>
                                            </Body>
                                        </Left>
                                    </CardItem>
                                    <CardItem cardBody>
                                        <Image style={styles.imageContent}
                                               source={{uri: this.state.imageContent}}/>
                                    </CardItem>
                                    <TextInput style={styles.textContent}
                                               multiline={true}
                                               numberOfLines={5}
                                               onChangeText={this.onChangePostContentText.bind(this)}
                                               maxLength={maxContentLength}
                                               placeholder="Write Something"/>
                                    <Text style={styles.textContentLength}>
                                        {this.state.textLength}/{maxContentLength}
                                    </Text>
                                </Card>
                                <Button style={styles.sendButton}
                                        full
                                        onPress={this.uploadPost}
                                >
                                    <Text> Send </Text>
                                </Button>
                            </KeyboardAvoidingView>
                        </ScrollView>
                    )
                }
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: 'white'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    avatarContainer: {
        borderColor: '#9B9B9B',
        borderWidth: 1 / PixelRatio.get(),
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    avatar: {
        borderRadius: 75,
        width: 150,
        height: 150,
    },
    imageContent: {
        resizeMode: 'contain',
        height: imageHeight,
        flex: 1
    },
    textContent: {
        backgroundColor: '#fff',
        margin: 5,
        borderWidth: 1,
        borderColor: '#8231f8',
        borderRadius: 10,
        height: 100,
        padding: 10,
    },
    textContentLength: {
        fontSize: 10,
        textAlign: 'right'
    },
    sendButton: {
        backgroundColor: '#8231f8'
    }
});
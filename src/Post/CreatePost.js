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
    Text, KeyboardAvoidingView,
    View, Dimensions, ScrollView,
} from 'react-native';
import {
    Container,
    Card,
    CardItem,
    Thumbnail,
    Left,
    Body
} from 'native-base';

import ImagePicker from 'react-native-image-picker';

const options = {
    title: 'Select Avatar',
    storageOptions: {skipBackup: true, path: 'images',},
};
export default class CreatePost extends PureComponent {
    constructor(props) {
        super(props);
    }

    state = {
        avatarSource: null,
        videoSource: null,
    };

    changeProfileImage = () => {
        ImagePicker.showImagePicker(options, (responsePhoto) => {
            console.log('Response = ', responsePhoto);
            if (responsePhoto.didCancel) {
                console.log('User cancelled image picker');
            } else if (responsePhoto.error) {
                console.log('ImagePicker Error: ', responsePhoto.error);
            } else {
                console.log(responsePhoto.uri);
                this.setState({
                    avatarSource: responsePhoto.uri,
                    photoName: responsePhoto.fileName,
                    photoType: responsePhoto.type
                });
            }
        });
    };

    render() {

        const dimensions = Dimensions.get('window');
        const imageHeight = Math.round(dimensions.height * 4 / 10);
        return (
            <Container>
                {this.state.avatarSource === null ?
                    <View style={styles.container}>
                        <TouchableOpacity onPress={this.changeProfileImage}>
                            <View
                                style={[
                                    styles.avatar,
                                    styles.avatarContainer,
                                    {marginBottom: 20},
                                ]}>
                                <Text>Select a Photo</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    : (


                        <ScrollView contentContainerStyle={{
                            flex: 1,
                            backgroundColor: 'white'
                        }}
                        >
                            <KeyboardAvoidingView style={{flex: 1}}
                                                  keyboardVerticalOffset={0}
                                                  behavior={"position"}>
                                <Card>
                                    <CardItem>
                                        <Left>
                                            <Thumbnail
                                                source={{uri: this.state.avatarSource}}/>
                                            <Body>
                                            <Text>NativeBase</Text>
                                            <Text note>April 15, 2016</Text>
                                            </Body>
                                        </Left>
                                    </CardItem>
                                    <CardItem cardBody>
                                        <Image style={{
                                            resizeMode: 'contain',
                                            height: imageHeight,
                                            flex: 1
                                        }}
                                               source={{uri: this.state.avatarSource}}/>
                                    </CardItem>
                                        <TextInput style={{
                                            backgroundColor: '#fff',
                                            margin: 5,
                                            borderWidth: 1,
                                            borderColor: '#898989',
                                            borderRadius: 10,
                                            height: 100,
                                        }} multiline={true} numberOfLines={5}
                                                   onChangeText={(text) => this.setState({text})}
                                                   placeholder="Write Something"/>
                                </Card>
                            </KeyboardAvoidingView>
                        </ScrollView>
                    )
                }
            </Container>
        );
    }
}

const styles = StyleSheet.create({
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
    },
    avatar: {
        borderRadius: 75,
        width: 150,
        height: 150,
    },
});
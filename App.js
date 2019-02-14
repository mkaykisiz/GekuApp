/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {StyleSheet, Image, ActivityIndicator} from 'react-native';
import {
    Container,
    Header,
    View,
    DeckSwiper,
    Card,
    CardItem,
    Thumbnail,
    Text,
    Left,
    Body,
    Icon,
    Title,
    Right,
    Button
} from 'native-base';


type Props = {};
export default class App extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            showContent: false,
            loading:true
        };
        this.pageNo = 1;
        this.resultCount = 5;
        this.index = 0;
    }

    componentWillMount() {
        this.getPeople(this.resultCount, this.pageNo);
    }

    getPeople(resultCount, pageNumber) {
        return fetch('https://randomuser.me/api/?results=' + resultCount + '&page=' + pageNumber)
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({
                    dataSource: [...this.state.dataSource, ...responseJson.results],
                    showContent: true,
                    loading:false
                });
                console.log("as" + pageNumber);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    onEndReached(value) {
        // set value
        console.log("value: " + value);
        this.index += 1;
        console.log("resultCount: " + this.resultCount + " pageNo: " + this.pageNo + " index: " + this.index);
        if (((this.resultCount * this.pageNo) - this.index) === 3) {
            this.pageNo = this.pageNo + 1;
            this.getPeople(this.resultCount, this.pageNo);
            console.log("page arttı")
        }
    };

    render() {

        return (
            <Container>
                <Header>
                    <Left>
                        <Button onPress={() => this.openDrawer()}>
                            <Text>Tıkla</Text>
                        </Button>
                    </Left>
                    <Body>
                    <Title>Geku App</Title>
                    </Body>
                    <Right/>
                </Header>
                <View>
                        {this.state.showContent === true ?
                            <DeckSwiper
                                dataSource={this.state.dataSource}
                                looping={false}
                                renderEmpty={() =>
                                    <View style={{
                                        alignSelf: "center",
                                        justifyContent: "center"
                                    }}>
                                        <Text>Try Again Later!</Text>
                                    </View>
                                }
                                onSwipeRight={() => this.onEndReached('right')}
                                onSwipeLeft={() => this.onEndReached('left')}
                                renderItem={item =>
                                    <Card style={{elevation: 3}}>
                                        <CardItem>
                                            <Left>
                                                <Thumbnail
                                                    source={{uri: item.picture.thumbnail}}/>
                                                <Body>
                                                <Text>{item.email}</Text>
                                                <Text note>x</Text>
                                                </Body>
                                            </Left>
                                        </CardItem>
                                        <CardItem cardBody>
                                            <Image
                                                style={{height: 300, flex: 1}}
                                                source={{uri: item.picture.large}}/>
                                        </CardItem>
                                        <CardItem>
                                            <Icon name="heart"
                                                  style={{color: '#ED4A6A'}}/>
                                            <Text>{item.name.first} {item.name.last}</Text>
                                        </CardItem>
                                    </Card>
                                }
                            />
                            : null}
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({});

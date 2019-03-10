import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image, Dimensions, TouchableOpacity} from "react-native";

import {
    Body,
    Card,
    CardItem,
    DeckSwiper,
    Left,
    Icon,
    Thumbnail
} from "native-base";

class DeckSwiperCardComponent extends PureComponent {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        showContent: PropTypes.bool.isRequired,
        dataSource: PropTypes.array.isRequired,
        onSwipe: PropTypes.func.isRequired,
    };

    render = () => {
        const dimensions = Dimensions.get('window');
        const imageHeight = Math.round(dimensions.height * 6 / 10);

        return (
            <View>
                {this.props.showContent === true ?
                    <DeckSwiper
                        ref={(c) => this._deckSwiper = c}
                        dataSource={this.props.dataSource}
                        looping={false}
                        onSwipeRight={() => this.props.onSwipe('right')}
                        onSwipeLeft={() => this.props.onSwipe('left')}
                        renderItem={item =>
                            <Card style={{elevation: 3}}>
                                <CardItem>
                                    <Left>
                                        <Thumbnail
                                            source={{uri: item.image_links[0]}}/>
                                        <Body>
                                        <Text
                                            style={{fontWeight: 'bold'}}>{item.username}</Text>
                                        <Text note>{item.created_at.split('T')[0]}</Text>
                                        </Body>
                                    </Left>
                                </CardItem>
                                <CardItem cardBody>
                                    <Image
                                        style={{
                                            resizeMode: 'contain',
                                            height: imageHeight,
                                            flex: 1
                                        }}
                                        source={{uri: item.image_links[0]}}/>
                                </CardItem>
                                <CardItem>
                                    <View style={{flexDirection: "row"}}>
                                        <TouchableOpacity style={{
                                                flex: 1,
                                                flexDirection: 'row'
                                            }}
                                            onPress={() => this._deckSwiper._root.swipeLeft()}>
                                            <View style={{
                                                flex: 1,
                                                flexDirection: 'row'
                                            }}>
                                                <Icon type="FontAwesome"
                                                      name="thumbs-down"
                                                      style={{
                                                          color: '#F035E0',
                                                          fontSize: 18
                                                      }}/>
                                                <Text>unlikes:{item.unlikes.length}</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{
                                                flex: 1,
                                                flexDirection: 'row',
                                                right: 0,
                                                position: 'absolute'
                                            }}
                                            onPress={() => this._deckSwiper._root.swipeRight()}>
                                            <View style={{
                                                flex: 1,
                                                flexDirection: 'row',
                                                right: 0,
                                                position: 'absolute'
                                            }}>
                                                <Icon type="FontAwesome"
                                                      name="thumbs-up" style={{
                                                    color: '#F035E0',
                                                    fontSize: 18
                                                }}/>
                                                <Text>likes: {item.likes.length}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </CardItem>
                                <CardItem>
                                    <Body>
                                    <Text>{item.text}</Text>
                                    </Body>
                                </CardItem>
                            </Card>
                        }
                    />
                    :
                    <Card>
                        <CardItem>
                            <Body>
                            <Text>That's all for now :(</Text>
                            <Text>Please, try again later...</Text>
                            </Body>
                        </CardItem>
                    </Card>
                }
            </View>
        )
    }
}

export default DeckSwiperCardComponent;
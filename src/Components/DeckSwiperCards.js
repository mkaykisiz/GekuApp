import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image, Dimensions} from "react-native";

import {
    Body,
    Card,
    CardItem,
    DeckSwiper,
    Left,
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
                                        <Text style={{fontWeight: 'bold'}}>{item.username}</Text>
                                            <Text note>{item.created_at}</Text>
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
                                    <Body>
                                    <Text>{item.text}
                                    </Text>
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
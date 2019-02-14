import React, {Component} from 'react';
import {StyleSheet, Image} from 'react-native';
import {
    Container,
    View,
    Text,
} from 'native-base';


type Props = {};
export default class App extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            loading: false
        };
    }

    componentWillMount() {

    }

    getPeople(resultCount, pageNumber) {
        return fetch('https://randomuser.me/api/?results=' + resultCount + '&page=' + pageNumber)
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({
                    dataSource: [...this.state.dataSource, ...responseJson.results],
                    loading: true
                });
                console.log("as" + pageNumber);
            })
            .catch((error) => {
                console.error(error);
            });
    }


    render() {

        return (
            <Container>

                <View style={{marginTop:250}}>
                    <Text>Selam</Text>
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({});

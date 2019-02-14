import React, {Component} from 'react';
import {Router, Scene} from 'react-native-router-flux';
import {Icon} from 'native-base';

import MainPage from './MainPage';
import Menu from './sideBar';
import CreatePost from "./Post/CreatePost";

const menIcon = (<Icon type="MaterialIcons" name="menu"/>);

const menuIcon = ({selected, title}) => (
    menIcon
);

const App = () => {
    const normalNav = {navigationBarStyle: {backgroundColor: 'fff'}};
    return (
        <Router>
            <Scene key="root">
                <Scene key="drawer" drawer contentComponent={Menu}
                       drawerIcon={menuIcon} drawerWidth={250} hideNavBar
                       titleStyle={{
                           flex: 1,
                           textAlign: 'center'
                       }} {...normalNav}>
                    <Scene key="mainPage"
                           component={MainPage}

                           title="Geku"
                    />
                    <Scene key="cretatePost"
                           component={CreatePost}
                           title="Share It"
                           initial
                    />
                </Scene>


            </Scene>
        </Router>
    );
}

export default App;
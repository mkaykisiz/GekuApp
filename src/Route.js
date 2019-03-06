import React, {Component} from 'react';
import {Router, Scene} from 'react-native-router-flux';
import {Icon} from 'native-base';

import MainPage from './Main/MainPage';
import Menu from './sideBar';
import CreatePost from "./Post/CreatePost";
import loginScreen from "./Login/LoginScreen";
import registerScreen from "./Register/RegisterScreen";

const menIcon = (<Icon type="MaterialIcons" name="menu"/>);

const menuIcon = ({selected, title}) => (
    menIcon
);

const App = () => {
    const normalNav = {navigationBarStyle: {backgroundColor: '#ca30ff',}};
    return (
        <Router>
            <Scene key="root">
                <Scene key="loginScreen"
                       component={loginScreen}
                       initial
                       hideNavBar={true}
                />
                <Scene key="registerScreen"
                       component={registerScreen}
                       initial
                       hideNavBar={true}
                />
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
                </Scene>
                <Scene key="cretatePost"
                       component={CreatePost}
                       hideNavBar={true}
                />

            </Scene>
        </Router>
    );
}

export default App;
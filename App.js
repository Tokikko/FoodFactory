/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Alert,
    Dimensions
} from 'react-native';

import { createStackNavigator } from 'react-navigation';

import Main from "./js/Main.js";
import ScreenSwitch from "./js/recepieView/ScreenSwitch";

export default class App extends Component{

    constructor(props) {
        super(props);
    }

    render() {
        return <RootStack/>;
    }
}

const width = Dimensions.get("screen").width;

const RootStack = createStackNavigator(
  {
      Main: {
            screen: Main,
        },
        ScreenSwitch:{
            screen: ScreenSwitch,
        }
  },
  {
    headerMode: 'none',
    header: null,
    initialRouteName: 'Main',
  }
);

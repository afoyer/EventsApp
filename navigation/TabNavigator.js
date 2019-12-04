import React from 'react';
import {View, Text} from 'react-native'
import {createBottomTabNavigator} from 'react-navigation-tabs'

import HomeScreen from '../screens/HomeScreen'
import Settings from '../screens/Settings'


const TabNavigator = createBottomTabNavigator({
    One: HomeScreen,
    Two: Settings
});
export default TabNavigator;
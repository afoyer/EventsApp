import React from 'react';
import {View, Text} from 'react-native'
import {createMaterialTopTabNavigator} from 'react-navigation-tabs'

import HomeScreen from '../screens/HomeScreen'
import Settings from '../screens/Settings'


const TabNavigator = createMaterialTopTabNavigator({
    One: HomeScreen,
    Two: Settings
},{
    swipeEnabled: true,
    animationEnabled: true,
    tabBarPosition :'bottom',
    tabBarOptions: {
      style: {
        backgroundColor: '#607d8b',
      },
      activeBackgroundColor: '#b0bec5',
      inactiveBackgroundColor: '#78909c',
      activeTintColor: '#fff',
      inactiveTintColor: '#9B9B9B',
      indicatorStyle: {
        height: '100%',
        backgroundColor: '#b0bec5'
      }
    }
});
export default TabNavigator;
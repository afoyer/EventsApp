import React from 'react';
import {View, Text,SafeAreaView, StatusBar} from 'react-native'
import {createMaterialTopTabNavigator} from 'react-navigation-tabs'

import Icon from 'react-native-vector-icons/Ionicons'
import HomeScreen from '../screens/HomeScreen'
import Settings from '../screens/Settings'


const TabNavigator = createMaterialTopTabNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: ({ navigation }) => ({
            tabBarLabel: 'Home',
            
            tabBarIcon: ({ tintColor }) => <Icon name="md-home" size={28} color={tintColor} />
        }),
    },
    Preferences: {
      screen: Settings,
      navigationOptions: ({ navigation }) => ({
          tabBarLabel: 'Settings',
          
          tabBarIcon: ({ tintColor }) => <Icon name="md-settings" size={28} color={tintColor}/>
      }),
  },
},{
    
    swipeEnabled: true,
    animationEnabled: true,
    tabBarPosition :'bottom',
    tabBarLabel: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;
      let label;
      switch(routeName) {
        case 'Home':
          return label = focused ? <Text style={styles.activeTabText}>Home</Text> : null
        case 'Preferences':
          return label = focused ? <Text style={styles.activeTabText}>Settings</Text> : null
      }
      return label
    },
    tabBarOptions: {
      // showLabel: false,
      showIcon: 'true',
      
      style: {
        borderTopWidth: 0, 
        elevation: 0,
        backgroundColor: '#222222',
      },
      activeBackgroundColor: '#000000',
      inactiveBackgroundColor: '#000000',
      activeTintColor: '#D09B2C',
      shadowColor: '#000000',
      shadowOffset: { height: 5 },
      shadowOpacity: 0.75,
      shadowRadius: 5,
      inactiveTintColor: '#9B9B9B',
      indicatorStyle: {
        height: '5%',
        backgroundColor: '#D09B2C'
      }
    }
},);
export default TabNavigator;
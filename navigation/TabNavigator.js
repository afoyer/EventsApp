import React from 'react';
import {View, Text,SafeAreaView, StatusBar} from 'react-native'
import {createMaterialTopTabNavigator} from 'react-navigation-tabs'

import Icon from 'react-native-vector-icons/Ionicons'
import HomeScreen from '../screens/HomeScreen'
import Settings from '../screens/Settings'
Icon.loadFont();


const TabNavigator = createMaterialTopTabNavigator({
  
    Home: {
        screen: HomeScreen,
        tabBarOptions: {
          indicatorStyle: {
            height: '5%',
            backgroundColor: '#D09B2C'
          }
        },
        navigationOptions: ({navigation}) => ({
          
          title: 'Home',
           tabBarLabel: 'Home',
           tabBarIcon: ({ focused, tintColor }) => {
             
             const { routeName } = navigation.state;
             let tabBarIcon;
             switch(routeName) {
               case 'Home':
                 return tabBarIcon = focused ? <Icon name="md-home" size={28} color={tintColor}/> : <Icon name="md-home" size={28} color={'#78909c'}/>
               case 'Preferences':
                 return tabBarIcon = focused ? <Icon name="md-home" size={28} color={'#9B9B9B'}/> : <Icon name="md-home" size={28} color={'#78909c'}/>
             }
             return tabBarIcon
           },
       }),
    },
    Preferences: {
      screen: Settings,
      tabBarOptions: {
        indicatorStyle: {
          height: '5%',
          backgroundColor: '#f06292'
        }
      },
      navigationOptions: ({navigation}) => ({
        
         title: 'Home',
          tabBarLabel: 'Settings',
          tabBarIcon: ({ focused, inactiveTintColor }) => {
            
            const { routeName } = navigation.state;
            let tabBarIcon;
            switch(routeName) {
              case 'Home':
                return tabBarIcon = focused ? <Icon name="md-heart" size={28} color={'#9B9B9B'}/> : <Icon name="md-heart" size={28} color={'#f2f2f2'}/>
              case 'Preferences':
                return tabBarIcon = focused ? <Icon name="md-heart" size={28} color={'#f06292'}/> : <Icon name="md-heart" size={28} color={'#78909c'}/>
            }
            return tabBarIcon
          },
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
      showLabel: false,
      showIcon: 'true',
      pressOpacity: '0',
      pressColor: '0',
      style: {
        borderTopWidth: 0,
        elevation: 0,
        backgroundColor: '#333333',
      },
      activeBackgroundColor: '#000000',
      inactiveBackgroundColor: '#000000',
      activeTintColor: '#D09B2C',
      shadowColor: '#000000',
      shadowOffset: { height: 5 },
      shadowOpacity: 0.75,
      shadowRadius: 5,
      
      inactiveTintColor: '#f2f2f2',
      indicatorStyle: {
        height: '0%',
        backgroundColor: '#D09B2C'
      }
    }
},);
export default TabNavigator;

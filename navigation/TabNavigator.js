import React from 'react';
import {View, Text,SafeAreaView, StatusBar} from 'react-native'
import {createBottomTabNavigator} from 'react-navigation-tabs'

import Icon from 'react-native-vector-icons/Ionicons'
import HomeScreen from '../screens/HomeScreen'
import Settings from '../screens/Settings'
import addScreen from '../screens/addScreen'
Icon.loadFont();


const TabNavigator = createBottomTabNavigator({
  
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
    add: {
      screen: addScreen,
      tabBarOptions: {
        indicatorStyle: {
          height: '5%',
          backgroundColor: '#D09B2C'
        }
      },
      navigationOptions: ({navigation}) => ({
        
        title: 'Add',
         tabBarLabel: 'add',
         tabBarIcon: ({ focused, tintColor }) => {
           
           const { routeName } = navigation.state;
           let tabBarIcon;
           switch(routeName) {
             case 'Home':
               return tabBarIcon = focused ? <Icon name="md-add" size={28} color={tintColor}/> : <Icon name="md-add" size={28} color={'#78909c'}/>
             case 'Preferences':
               return tabBarIcon = focused ? <Icon name="md-add" size={28} color={tintColor}/> : <Icon name="md-add" size={28} color={'#78909c'}/>
             case 'add':
                return tabBarIcon = focused ? <Icon name="ios-add-circle" size={32} color={'#2196f3'}/> : <Icon name="ios-add-circle-outline" size={32} color={'#78909c'}/>

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
                return tabBarIcon = focused ? <Icon name="md-heart" size={28} color={'#f06292'}/> : <Icon name="md-heart-empty" size={28} color={'#78909c'}/>
            }
            return tabBarIcon
          },
      }),
  },
},{

    
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
    tabBarPosition: 'bottom',
    
    tabBarOptions: {
      
      
      showLabel: false,
      
      
      showIcon: 'true',
      pressOpacity: '0',
      pressColor: '0',
      animationEnabled: 'false',
      style: {
        backgroundColor: '#333333',
        borderTopWidth: 0,
        elevation: 0,
        
      },
      activeBackgroundColor: '#2b2b2b',
      inactiveBackgroundColor: '#222222',
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

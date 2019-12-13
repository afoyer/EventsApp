import React from 'react';
import {View, StatusBar, SafeAreaView} from 'react-native';
import Navigator from './navigation/Navigator';
import DatabaseManager from './DatabaseManager';
//const firebase = require("firebase");

export default function App(){
  database = new DatabaseManager( )
  return(
    <SafeAreaView style= {{flex: 1, backgroundColor:'#222222'}}>
  <StatusBar
    backgroundColor="#222222"
    barStyle="light-content"
  />
     <Navigator/>
    </SafeAreaView>
  )
}

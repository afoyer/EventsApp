import React from 'react';
import {View, StatusBar, SafeAreaView} from 'react-native'
import Navigator from './navigation/Navigator'
const firebase = require("firebase");

export default function App(){
  //database = new DatabaseManager( firebase )
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

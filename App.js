import React from 'react';
import {View, StatusBar, SafeAreaView} from 'react-native';
import Navigator from './navigation/Navigator';
import DatabaseManager from './DatabaseManager';

export default function App(){
  database = new DatabaseManager( )
  database.createEvent([1728, true, 1, 1, 1, 1, 1, 1, 1]);
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

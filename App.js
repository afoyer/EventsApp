import React from 'react';
import {View, StatusBar, SafeAreaView} from 'react-native';
import Navigator from './navigation/Navigator';
import DatabaseManager from './DatabaseManager';

export default function App(){
  var list = [1137898 , 9 , "Sophia's Test" , "somewhere" , "something" ,"now" , 1 , 2 , null , 1];
  database = new DatabaseManager();
  database.createEvent(list);
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

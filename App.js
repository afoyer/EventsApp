import React, { Component } from 'react';
import { DefaultTheme,Provider as PaperProvider, Drawer, Avatar, withTheme } from 'react-native-paper';
import { Button, Title, Paragraph } from 'react-native-paper';
import { Platform, StyleSheet, Text, FlatList,View, ActivityIndicator,ScrollView, SafeAreaView } from 'react-native';
import Cardd from '/Users/cliffordchi/Desktop/TestApp/Components/Card/Cardd';
const theme = {
  ...DefaultTheme,
    roundness: 20,
    colors: {
      ...DefaultTheme.colors,
      primary: '#ff0000',
      accent: '#000000',
      text: "#cc1111",
      background: "#000000",
      contained: '#000000'
    },
    dark: true
  };

export default class App extends Component {
    
    constructor(){
        super();
        this.state = {
            items:[]
        }
    }
    componentDidMount(){
     this._get('https://jsonplaceholder.typicode.com/photos').then(
            data => {
                this.setState({items: data})}
         )
   }
 _get = async (endpoint) => {
     const res = await fetch(endpoint);
     const data = await res.json();
     return data;
 }
render() {
    if(this.state.items.length==0){
        return(
               <PaperProvider theme={theme}>
                   <View style={styles.loader}>
                        <ActivityIndicator size='large'/>
                   </View>
               </PaperProvider>
               )
    }
   return (
               <FlatList
               data={this.state.items}
               keyExtractor={(item,index) => index.toString()}
               renderItem={({item}) => <Cardd item={item}/>}
               />
           
           )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:20,
    //backgroundColor: '#F5FCFF',
  },
 card: {
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 35,
 },
  welcome: {
     marginTop:15,
    fontSize: 22,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    marginBottom: 5,
  },
 loader: {
    flex:1,
     alignItems:'center',
     justifyContent:'center',
 }
});



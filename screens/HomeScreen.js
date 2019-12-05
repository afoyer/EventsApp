import React from 'react';
import{View, StyleSheet} from 'react-native'
import { DefaultTheme,Provider as PaperProvider, Drawer, Avatar, withTheme } from 'react-native-paper';
import { Button, Title, Paragraph } from 'react-native-paper';
import { Platform, Text, FlatList,ActivityIndicator,ScrollView, SafeAreaView } from 'react-native';
import Cardd from '../Cardd';

import ScreenName from '../components/ScreenName'


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

export default class HomeScreen extends React.Component{
    
    constructor(){
        super();
        this.state = {
            items:[]
        }
    }
    componentDidMount(){
     this._get('https://feed2json.org/convert?url=https%3A%2F%2Fcoloradocollege-web.ungerboeck.com%2Fcalendar%2Fapi%2FrssFeed%3F%24filter%3D%28CampusDisplay%2520eq%2520%2527PUBANDINT%2527%2520or%2520CampusDisplay%2520eq%2520%2527INTERNAL%2527%29').then(
            data => {
                this.setState({items: data})
              }
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
         data={this.state.items.items}
         renderItem={({ item }) => (
            <Item
              title={item.title}
              summary={item.summary}
              description={item.description}
              image={item.image}
              url={item.url}
            />)}
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
  

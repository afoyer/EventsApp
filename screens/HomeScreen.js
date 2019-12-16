import React from 'react';
import{View, StyleSheet} from 'react-native'
import { DefaultTheme,Provider as PaperProvider, Drawer, Avatar, withTheme, Appbar } from 'react-native-paper';
import { Button, Title, Paragraph } from 'react-native-paper';
import { Platform, Text, FlatList,ActivityIndicator,ScrollView, SafeAreaView } from 'react-native';
import Cardd from '../Cardd';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import DatabaseManager from '../databaseManager';

Icon.loadFont()
var rss_url = 'https://feed2json.org/convert?url=https%3A%2F%2Fcoloradocollege-web.ungerboeck.com%2Fcalendar%2Fapi%2FrssFeed%3F%24filter%3D%28CampusDisplay%2520eq%2520%2527PUBANDINT%2527%2520or%2520CampusDisplay%2520eq%2520%2527INTERNAL%2527%29'

import ScreenName from '../components/ScreenName'
database = new DatabaseManager();

const theme = {
    ...DefaultTheme,
      roundness: 20,
      
      colors: {
        ...DefaultTheme.colors,
        primary: '#333333',
        accent: '#f1c40f',
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


//         database.getAllEvents().then(
//            data => {
//              this.setState({items: data })
//            }
//         )
    //old code for pulling from the rss feed
     this._get().then(
            data => {
                this.setState({items: data })
                //console.log( " 1    :  " + this.state.items.length)
            }
     )

   }
   _get = async () => {
       const data = await database.getAllEvents();
       //const res = await fetch( rss_url );
       //const data = await res.json();
       setTimeout((function (){
            //console.log( data )
            var json = data.reduce((json, value, key) => { json[key] = value; return json; }, {});
            //console.log(" ")
            //console.log( data )

       }), 500);
       return (data);
   }
   static navigationOptions = {
    title: 'Details',
    titleColor: '#222222',
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#222222'
      
    },
  };



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
     var ta= this.state.items
     setTimeout((function (){
                 console.log("  ")
                 console.log("here  Drew : " + ta)
            }), 2000);
     return (
       <View>
          <Appbar.Header theme = {theme}>
        
        <Appbar.Content
          title="Events"
          subtitle="CC"
        />
        <Appbar.Action icon="information" onPress={this._handleSearch} />
      </Appbar.Header>
         <FlatList
         data={this.state.items}
         //data = temp_test

         renderItem={({ item }) => (
            //console.log( item )
            <Item
              title={item.Event_ID}
              summary={item.Event_ID}
              description={item.Event_ID}
              image={item.Event_ID}
              url={item.Event_ID}
            />)}
         keyExtractor={(item,index) => index.toString()}
         renderItem={({item}) => <Cardd item={item}/>}
         />
         </View>
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

function helperFunction( err , data ){
    //if ( err) { console.log( err )}
    //else {
    console.log("we mad e it?")
    //}

}

function putEventsOnCards( ){}


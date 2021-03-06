import React, { Component } from 'react';
import { DefaultTheme,Provider as PaperProvider, Drawer, Avatar, withTheme } from 'react-native-paper';
import { Button, Card, Title, Paragraph, IconButton } from 'react-native-paper';
import { Platform, StyleSheet, Text, FlatList,
         View, ActivityIndicator,ScrollView,
         TouchableOpacity, Image, SafeAreaView,
         TouchableHighlight, Linking, Colors } from 'react-native';
import * as AddCalendarEvent from 'react-native-add-calendar-event';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import moment from 'moment';
Icon.loadFont()

const utcDateToString = (momentInUTC: moment): string => {
  let s = moment.utc(momentInUTC).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
  // console.warn(s);
  return s;
};
const theme = {
...DefaultTheme,
  roundness: 10,
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

export default class Cardd extends React.PureComponent {
      _onPressButton(link) {
          Linking.openURL(link);
      }
//      getEndDate(string){
//        if(string[8] == 'AM' || string[8] == 'PM'){
//          return (string[0] + ' ' + string[1] + ' ' + string[2].substr(0,2)+ ' ' + string[3] + ' ' + string[7] + ' ' + string[8])
//        }
//        else{
//          return (string[7] + ' ' + string[8] + ' ' + string[9].substr(0,2)+ ' ' + string[10] + ' ' + string[11] + ' ' + string[12])
//        }
//      }
      static addToCalendar = (title: string, startDateUTC: moment, endDate : moment) => {
        const eventConfig = {
          title,
          startDate: utcDateToString(startDateUTC),
          endDate: utcDateToString(endDate),
          notes: '',
          navigationBarIOS: {
            tintColor: 'orange',
            backgroundColor: 'green',
            titleColor: 'blue',
          },
        };

        AddCalendarEvent.presentEventCreatingDialog(eventConfig)
          .then((eventInfo: { calendarItemIdentifier: string, eventIdentifier: string }) => {
            // handle success - receives an object with `calendarItemIdentifier` and `eventIdentifier` keys, both of type string.
            // These are two different identifiers on iOS.
            // On Android, where they are both equal and represent the event id, also strings.
            // when { action: 'CANCELED' } is returned, the dialog was dismissed
            // console.warn(JSON.stringify(eventInfo));
          })
          .catch((error: string) => {
            // handle error such as when user rejected permissions
            console.warn(error);
          });
      };


      static editCalendarEventWithId = (eventId: string) => {
        const eventConfig = {
          eventId,
        };

        AddCalendarEvent.presentEventEditingDialog(eventConfig)
          .then(eventInfo => {
            console.warn(JSON.stringify(eventInfo));
          })
          .catch((error: string) => {
            // handle error such as when user rejected permissions
            console.warn(error);
          });
      };

      static showCalendarEventWithId = (eventId: string) => {
        const eventConfig = {
          eventId,
          allowsEditing: true,
          allowsCalendarPreview: true,
          navigationBarIOS: {
            tintColor: 'orange',
            backgroundColor: 'green',
          },
        };

        AddCalendarEvent.presentEventViewingDialog(eventConfig)
          .then(eventInfo => {
            // console.warn(JSON.stringify(eventInfo));
          })
          .catch((error: string) => {
            // handle error such as when user rejected permissions
            // console.warn(error);
          });
      };

    render(){
      //todo to whoever approaches, The attributes are "Event_ID , Student_ID ,Event_Name , Event_Location
      //todo Event_Description , Event_Date , Event_Start , Event_End , Poster , CCSGA_Approved , Link
      console.log(this.props.item.Event_ID)
      if ( this.props.item.Poster == "no image"){
        var poster_img = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBk9rGEmH-aZgOUCnYpDMYqkF1a19BZHCh-tTfE_aeAG5u5akQ&s";
      }
      else{
        var poster_img = this.props.item.Poster;
      }

      var subtitle = this.props.item.Event_ID;
      const nowUTC = moment.utc();
      var sub2 = this.props.item.Event_Name.toString();
      var sub3 = this.props.item.Event_ID.toString();
      var sub4 = this.props.item.Event_Date;
      //var poster_img = this.props.item.Poster; USE THIS ONE IRL
      //var poster_img = database.getImgByPath("uploads/3.jpg")
      //console.log( poster_img )
      //console.log("hi " + poster_img)
      var img_src = "https:firebasestorage.googleapis.com/v0/b/softwareprojectsprinkles.appspot.com/o/uploads%2F3.jpg?alt=media&token=d5178fee-4fa2-48d4-8f1f-325b1cb80729"



     //Todo ahhh this is confusing im a java programmer <> are weird
      //const test = sub3[0] + ' ' + sub3[1] + ' ' + sub3[2].substr(0,2)+ ' ' + sub3[3] + ' ' + sub3[4] + ' ' + sub3[5]
      //console.log(test);
      const endtime = "haahah"//this.getEndDate(sub3)
      // console.log(endtime);
      const timestart  = "hahaha"//moment(sub3[0] + ' ' + sub3[1] + ' ' + sub3[2].substr(0,2) + 'th ' + sub3[3] + ' ' + sub3[4] + ' ' + sub3[5], "LLLL").format()
      const timeend = "haha"//moment(endtime).format();
      // const timeend  =  moment(sub3[0] + ' ' + sub3[1] + ' ' + sub3[2].substr(0,2) + 'th ' + sub3[3] + ' ' + sub3[7] + ' ' + sub3[8], "LLLL").format()
        return (

                <PaperProvider theme={theme}>
                <Card style={styles.cardStyle}>
                <TouchableOpacity onPress={() => this._onPressButton(this.props.item.url)}>
                  <View style={styles.button}>
                  <Card.Title
    title = {<Text style = {{fontSize: 16, color: 'black'}} >{this.props.item.Event_Name} </Text>}
    subtitle= { <Text style = {{ color: 'darkblue'}} >{sub2 + ": " + sub4}</Text>}
    //subtitle= { <Text style = {{ color: 'darkblue'}} >{sub4} </Text>}
    subtitleStyle = {<Text style =  {{includeFontPadding: true}}/> }

    right={(props) => <IconButton {...props} icon="shape-square-plus" color={'#4764AE'}
    size={30} onPress={() => Cardd.addToCalendar(this.props.item.title, timestart, timeend)} />}
      />
                      <Card.Cover source={{ uri: poster_img}} />
                      </View>
                </TouchableOpacity>



                </Card>
                <Text></Text>
                </PaperProvider>
                );
        }
}

const styles = StyleSheet.create({
     container:{
            marginTop:20,
            backgroundColor:'#F5FCFF',
     },
     cardStyle:{
       shadowColor: '#000',
       shadowOpacity: 0.2,
       shadowRadius: 15,
       shadowOffset:{
            width:3,
            height:3
            }
     },
     cardImage:{
         width:'100%',
         height:200,
         resizeMode:'cover'
     },
     cardText:{
         padding:10,
         fontSize:14,
     },

 }
);

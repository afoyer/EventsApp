import React, { Component } from 'react';
import { DefaultTheme,Provider as PaperProvider, Drawer, Avatar, withTheme } from 'react-native-paper';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import { Platform, StyleSheet, Text, FlatList, View, ActivityIndicator,ScrollView, TouchableOpacity, Image, SafeAreaView } from 'react-native';

const theme = {
...DefaultTheme,
  roundness: 8,
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
    render(){
      var subtitle = this.props.item.summary.split("</p>",1);
      var sub2 = subtitle[0].substr(3);
      console.log(typeof sub2);
        return (
                <PaperProvider theme={theme}>
                <Card style={styles.cardStyle}>
                  <Card.Content>
                    <Title>{this.props.item.title}</Title>
                    <Paragraph>{sub2}</Paragraph>
                  </Card.Content>
                  <Card.Cover source={{ uri: this.props.item.url}} />
                  <Card.Actions>
                    <Button>Cancel</Button>
                    <Button>Ok</Button>
                  </Card.Actions>
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
         fontSize:16,
     }
 }
);

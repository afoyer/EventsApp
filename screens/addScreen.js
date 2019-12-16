import React from 'react';
import { Button, View, Text, Colors, Image, TextInput } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/Ionicons'
import Animated, { Easing } from 'react-native-reanimated';
import CardStackStyleInterpolator from 'react-navigation-stack/src/views/StackView/StackViewStyleInterpolator';
import ImagePicker from 'react-native-image-picker';
import DateTimePicker from "react-native-modal-datetime-picker";
import DatabaseManager from '../databaseManager';

Icon.loadFont()
database = new DatabaseManager();


class Add extends React.Component {

  state = {
    student_id: null,
    photo: null,
    title: null,
    date: null,
    time: null,
    isDateTimePickerVisible: false,
  }

  static navigationOptions = {
    title: 'Add',
    titleColor: '#222222',
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#222222'

    },
    headerRight: (

      <Icon name="md-home" size={28} color={'white'} onPress= {() => alert('This is a button!')}/>
    ),

  };

  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };

  handleDatePicked = date => {
    console.log("A date has been picked: ", date);
    this.hideDateTimePicker();
  };
  handleDatePicked = time => {
    console.log("A time has been picked: ", time);
    this.hideDateTimePicker();
  };

  //Photo starts uploading when selected, can be over written
  //Cards need to now get the file location of an event (file location)
  handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, response => {
      //console.log("response", response);
      var file_location = "no image"
      if (response.uri){
        this.setState({photo: response})
        if (!response.cancelled) {
            // User picked an image
            const {height, width, type, uri} = response;
            file_location = database.formatImg( uri , "3" );

            //DELETE THIS EVENTUALLY this creats a dummy event with the url to img
            var param_list = [ 1731401 , 173140 , "Event  Name" , "Somewhere", "Click to find out" , "now", "soon", "later", "fix me" , "True" , "https://blazeti.me/" , "tags"]
            database.createEvent( param_list )
//            setTimeout(function(){
//                console.log(file_location)
//            }, 2000);

          }
      }
    })
  }

  render() {
    const { photo } = this.state;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <TextInput
            style={{height: 40}}
            placeholder="Enter Your Event Title  Here: "
            onChangeText={(text) => this.setState({text})}
            value={this.state.title}
          />
          <Button title="Pick Event Date and Time" onPress={this.showDateTimePicker} />
          <DateTimePicker
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm= {console.log("hi")}
            onCancel={this.hideDateTimePicker}
            mode={'datetime'}
          />
      {photo && (
          <Image
          source={{uri: photo.uri}}
          style={{width: 300, height:300}}
          />
        )}
        <Button
          title="Choose a photo"
          onPress={this.handleChoosePhoto}
        />
      </View>
    );
  }
}

class DetailsScreen extends React.Component {
  static navigationOptions = {
    title: 'Details',
    titleColor: '#222222',
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#222222'

    },
  };

  render() {
    /* 2. Get the param, provide a fallback value if not available */
    const { navigation } = this.props;
    const itemId = navigation.getParam('itemId', 'NO-ID');
    const otherParam = navigation.getParam('otherParam', 'some default value');

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Text>itemId: {JSON.stringify(itemId)}</Text>
        <Text>otherParam: {JSON.stringify(otherParam)}</Text>
        <Button
          title="Go to Details... again"
          onPress={() =>
            this.props.navigation.push('Details', {
              itemId: Math.floor(Math.random() * 100),
            })}
        />
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Home: Add,
    Details: DetailsScreen,
  },
  {
    initialRouteName: 'Home',
    transitionConfig: () => ({
      transitionSpec: { duration: 150 },
        screenInterpolator: CardStackStyleInterpolator.forHorizontal,
    })
  }
);

const AppContainer = createAppContainer(RootStack);

export default class ForAppContainer extends React.Component {
  render() {
    return <AppContainer />;
  }
}

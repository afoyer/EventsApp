import React, {Component} from 'react';
import { Button, View, Text, Colors, Image, TextInput, ScrollView, StyleSheet } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/Ionicons'
import Animated, { Easing } from 'react-native-reanimated';
import CardStackStyleInterpolator from 'react-navigation-stack/src/views/StackView/StackViewStyleInterpolator';
import ImagePicker from 'react-native-image-picker';
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from 'moment';
import { Switch } from 'react-native-switch';
import SelectMultiple from 'react-native-select-multiple'
Icon.loadFont()
const utcDateToString = (momentInUTC: moment): string => {
  let s = moment.utc(momentInUTC).format('MMMM Do YYYY, h:mm:ss a');
  // console.warn(s);
  return s;
};
const tags = ['Athletics', 'CCSGA Approved', 'Music & Arts', 'Social', 'Cultural'];


class Add extends React.Component {

  state = {
    CCSGA_Approved: false,
    buttonStartDate: "Choose the Start Date and Time",
    description: null,
    buttonEndDate: "Choose the End Date and Time",
    event_id: null,
    location: null,
    title: null,
    link: null,
    student_id: null,
    photo: null,
    tags: [],
    isSDateTimePickerVisible: false,
    isEDateTimePickerVisible: false,
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

  getTimeStamp = () => {
    var date = Date.parse(new Date());
    return(date);
  }

  showStartDateTimePicker = () => {
    this.setState({ isSDateTimePickerVisible: true });
  };
  hideStartDateTimePicker = () => {
    this.setState({ isSDateTimePickerVisible: false });
  };
  showEndDateTimePicker = () => {
    this.setState({ isEDateTimePickerVisible: true });
  };
  hideEndDateTimePicker = () => {
    this.setState({ isEDateTimePickerVisible: false });
  };
  changeStartButtonDate = time =>{
    this.setState({buttonStartDate : utcDateToString(time) });
  }
  changeEndButtonDate = date =>{
    this.setState({buttonEndDate : utcDateToString(date) })
  }
  handleStartDatePicked = time => {
    this.changeStartButtonDate(time);
    console.log("A start time has been picked: ", time.stringify);
    this.hideStartDateTimePicker();
  };
  handleEndDatePicked = (date) => {
    this.changeEndButtonDate(date);
    console.log("An end time has been picked: ", date.stringify);
    this.hideEndDateTimePicker();
  };
  handleStudentId = text =>{
    this.setState({student_id: text, event_id: text + this.getTimeStamp()});
  };
  handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, response => {
      console.log("response", response);
      if (response.uri){
        this.setState({photo: response})
      }
    })
  };
  toggleSwitch = (value) => {
      //onValueChange of the switch this function will be called
      this.setState({CCSGA_Approved: value})
      console.log(value);
      //state changes according to switch
      //which will result in re-render the text
   };
   onSelectionsChange = (selectedTags) => {
   // selectedFruits is array of { label, value }
   this.setState({ tags: selectedTags})
  };
  handleCreateNewEvent = () =>{
    var list = [this.state.event_id, this.state.student_id, this.state.title, this.state.location,
                this.state.description, null, this.state.buttonStartDate, this.state.buttonEndDate,
                this.state.photo, this.state.CCSGA_Approved, this.state.link, this.state.tags];
    database.createEvent(list);
  };


  render() {
    const { photo } = this.state;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <Text>Is the event CCSGA approved?</Text>
          <Switch
            activeText={'Yes'}
            inActiveText={'No'}
            style={{marginTop:30}}
            onValueChange = {this.toggleSwitch}
            value = {this.state.CCSGA_Approved}/>
          <TextInput
            style={{height: 40}}
            placeholder="Enter Your Event Title Here: "
            onChangeText={(text) => this.setState({title: text})}
            value={this.state.title}
          />
          <TextInput
            style={{height: 40}}
            placeholder="Enter Your Title Location Here: "
            onChangeText={(text) => this.setState({location: text})}
            value={this.state.location}
          />
          <TextInput
            style={{height: 40}}
            placeholder="Enter the event url (if applicable): "
            onChangeText={(text) => this.setState({link: text})}
            value={this.state.link}
          />
          <TextInput
            style={{height: 40}}
            placeholder="Enter Your Student ID Number Here: "
            onChangeText={(text) => {
              this.setState({event_id: text + this.getTimeStamp()});
              this.handleStudentId;
            }}
            value={this.state.student_id}
          />
          <Text>
               Event Id:  {this.state.event_id}
            </Text>
            <TextInput
              style={{height: 40}}
              placeholder="Enter Your Event Description Here (1-2 sentences): "
              onChangeText={(text) => this.setState({description: text})}
              value={this.state.description}
              maxLength={240}
            />
          <Text>Dates are chosen in MST, but are displayed in UTC time (6 hours ahead).</Text>
          <Button title= {this.state.buttonStartDate} onPress={this.showStartDateTimePicker} />
          <DateTimePicker
            isVisible={this.state.isSDateTimePickerVisible}
            onConfirm={this.handleStartDatePicked}
            onCancel={this.hideStartDateTimePicker}
            mode={'datetime'}
          />
          <Button title= {this.state.buttonEndDate} onPress={this.showEndDateTimePicker} />
          <DateTimePicker
            isVisible={this.state.isEDateTimePickerVisible}
            onConfirm={this.handleEndDatePicked}
            onCancel={this.hideEndDateTimePicker}
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
        <Text>Choose All Appropriate Tags For Event:</Text>
        <SelectMultiple
          items={tags}
          selectedItems={this.state.tags}
          onSelectionsChange={this.onSelectionsChange} />
          <Button
            title="Submit Event"
            onPress={this.handleCreateNewEvent}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    marginHorizontal:5,
  }
});


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

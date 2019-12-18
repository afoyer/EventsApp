import React, {Component} from 'react';
import { Button, View, Text, Colors, Image,  ScrollView, StyleSheet } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/Ionicons'
import Animated, { Easing } from 'react-native-reanimated';
import CardStackStyleInterpolator from 'react-navigation-stack/src/views/StackView/StackViewStyleInterpolator';
import ImagePicker from 'react-native-image-picker';
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from 'moment';

import {TextInput, DefaultTheme, Avatar, Card,  Title, Paragraph} from 'react-native-paper'
import { Switch } from 'react-native-switch';
import SelectMultiple from 'react-native-select-multiple'
import { TouchableOpacity } from 'react-native-gesture-handler';
Icon.loadFont()
const utcDateToString = (momentInUTC: moment): string => {
  let s = moment.utc(momentInUTC).format('MMMM Do YYYY, h:mm:ss a');
  // console.warn(s);
  return s;
};
const tags = ['Athletics', 'CCSGA Approved', 'Music & Arts', 'Social', 'Cultural'];
const theme = {
  ...DefaultTheme,
    
    
    colors: {
      ...DefaultTheme.colors,
      primary: 'blue',
      accent: '#f1c40f',
      text: "#444444",
      background: '#ffffff',
      backgroundColor: "red",
      marginRight:40,
      marginLeft:40,
      marginTop:10,
      contained: '#000000'
    },
    dark: true
  };

class Add extends React.Component {

  state = {
    CCSGA_Approved: false,
    buttonStartDate: "Choose the Start Date and Time",
    start: null,
    end: null,
    description: null,
    buttonEndDate: "Choose the End Date and Time",
    event_id: null,
    location: null,
    title: null,
    link: null,
    student_id: null,
    photo: './default.jpg',
    tags: [],
    uri: null,
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
    this.setState({start: utcDateToString(time)});
    console.log("A start time has been picked: ", utcDateToString(time));
    this.hideStartDateTimePicker();
  };
  handleEndDatePicked = (date) => {
    this.changeEndButtonDate(date);
    this.setState({end: utcDateToString(date)});
    console.log("An end time has been picked: ", utcDateToString(date));
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
      //console.log("response", response);
      var uri = "no image"
      if (response.uri){
        this.setState({photo: response})
        if (!response.cancelled) {
            // uri is poster!!!! for create
            const {height, width, type, uri} = response;
            this.setState({uri: uri})
          }
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
   console.log(this.state.tags);
  };
  handleCreateNewEvent = () =>{
    var list = [this.state.event_id, this.state.student_id, this.state.title, this.state.location,
                this.state.description, null, this.state.start, this.state.end,
                this.state.uri, this.state.CCSGA_Approved, this.state.link, this.state.tags];
    database.createEvent(list);
  };

  render() {
    const { photo } = this.state;
    return (
      <View >
        {/* <ScrollView contentContainerStyle={{flexGrow: 1}}> */}
        <Card style = {{elevation :10}} theme = {theme}>
    {/* <Card.Title title="Card Title" subtitle="Card Subtitle" left={(props) => <Avatar.Icon {...props} icon="folder" />} /> */}
    <Card.Content>
      <View style= {{ flexDirection:'row', justifyContent: 'center'}}>
      <TextInput theme = {theme} style = {{width: '50%'}}
        label='Event Title'
        mode = 'outlined'  
        onChangeText={text => this.setState({ title: text })}
        value = {this.state.title}
      />
      <TextInput
            theme = {theme}
            mode = 'outlined'
            style = {{width: '50%'}}
            label="Location"
            onChangeText={(text) => this.setState({location: text})}
            value={this.state.location}
          />
          </View>

      <Card.Actions style = {{alignContent: 'center', justifyContent: 'space-around'}}>
      <Text>CCSGA approved?</Text>
          <Switch
            activeText={'Yes'}
            inActiveText={'No'}
            style={{marginTop:30}}
            onValueChange = {this.toggleSwitch}
            value = {this.state.CCSGA_Approved}/>
      </Card.Actions>
      <TextInput
            theme = {theme}
            mode = 'outlined'
            placeholder="URL (Optional)"
            onChangeText={(text) => this.setState({link: text})}
            value={this.state.link}
          />
      <View style ={{ flexDirection:'row', justifyContent:'flex-start'}}>
      <TextInput
            theme = {theme}
            style = {{width: '50%'}}
            label="Student ID Number: "
            onChangeText={(text) => {
              this.setState({event_id: text + this.getTimeStamp()});
              this.handleStudentId(text);
            }}
            maxLength={6}
            value={this.state.student_id}
          />
          <View style  ={{flex:1, justifyContent:'center'}}>
          <Text>
               Event Id:

            </Text>
            <Text>
            {this.state.event_id}
            </Text>
            </View>
      </View>
      <TextInput
      theme = {theme}
              label="Event Description (1-2 sentences): "
              onChangeText={(text) => this.setState({description: text})}
              value={this.state.description}
              maxLength={240}
            />
      <Text style= {{fontSize: 10, paddingTop: 10}}>Dates are chosen in MST, but are displayed in UTC time (7 hours ahead).</Text>
      
          <Button color = 'skyblue' title= {this.state.buttonStartDate} onPress={this.showStartDateTimePicker} />
          <DateTimePicker
            isVisible={this.state.isSDateTimePickerVisible}
            onConfirm={this.handleStartDatePicked}
            onCancel={this.hideStartDateTimePicker}
            mode={'datetime'}
          />
          
      <View>
      <Button color = 'steelblue' title= {this.state.buttonEndDate} onPress={this.showEndDateTimePicker} />
          <DateTimePicker
            isVisible={this.state.isEDateTimePickerVisible}
            onConfirm={this.handleEndDatePicked}
            onCancel={this.hideEndDateTimePicker}
            mode={'datetime'}
          />
          </View>
      <Card.Actions style= {{justifyContent:'space-evenly'}}>
        <TouchableOpacity onPress={this.handleChoosePhoto}>
      {photo && (
          <Image
          source={{uri : this.state.photo.uri}}
          backgroundColor = '#f2f2f2'
          style={{width: 200, height:200, resizeMode:'contain'}}
          />
        )}
        </TouchableOpacity>
        
        <SelectMultiple style = {{numColumns: 2, height: 200}}

          items={tags}
          selectedItems={this.state.tags}
          onSelectionsChange={this.onSelectionsChange} />
        
      </Card.Actions>
      
      
      
    </Card.Content>
    </Card>
    <View style = {{marginTop: 10, alignItems:'center'}}>
    <Button style = {{elevation :10}} 
            color ='red'
            title="Submit Event"
            onPress={this.handleCreateNewEvent}
          />
          </View>
          
          {/* <View style = {{flex: 1, flexDirection:'row', margin: 20}}>
          <Text>Is the event CCSGA approved?</Text>
          <Switch
            activeText={'Yes'}
            inActiveText={'No'}
            style={{marginTop:30}}
            onValueChange = {this.toggleSwitch}
            value = {this.state.CCSGA_Approved}/>
            </View>
          <TextInput
            style={{height: 40}}
            placeholder="Enter Your Event Title Here: "
            onChangeText={(text) => this.setState({title: text})}
            value={this.state.title}
          />
          <TextInput
            style={{height: 40}}
            placeholder="Enter Your Event Location Here: "
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
          style={{width: 200, height:300}}
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
          /> */}
        {/* </ScrollView > */}
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

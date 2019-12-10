import React from 'react';
import { Button, View, Text, Colors, Image } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/Ionicons'
import Animated, { Easing } from 'react-native-reanimated';
import CardStackStyleInterpolator from 'react-navigation-stack/src/views/StackView/StackViewStyleInterpolator';
import ImagePicker from 'react-native-image-picker';
Icon.loadFont()

class Add extends React.Component {

  state = {
    photo: null,
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
  }

  render() {
    const { photo } = this.state;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
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

        <Button
          title="Stack Test"
          color='black'
          onPress={() => {
            /* 1. Navigate to the Details route with params */
            this.props.navigation.navigate('Details', {
              itemId: 86,
              otherParam: 'anything you want here',
            });
          }}
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

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

import React from 'react';
import{View, StyleSheet} from 'react-native'

import ScreenName from '../components/ScreenName'

 
export default class Settings extends React.Component{
    static NavigationOptions = {
        title: 'Settings'
    };

    render(){
        return(
            <View style = {styles.container}>
                <ScreenName name = {'Saved'}/>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        
        flex: 1,
        alignItems :'center',
        justifyContent: 'center',
        backgroundColor: '#222222'
    },
})
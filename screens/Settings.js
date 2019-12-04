import React from 'react';
import{View, StyleSheet} from 'react-native'

import ScreenName from '../components/ScreenName'

 
export default class Settings extends React.Component{
    static NavigationOptions = {

    };

    render(){
        return(
            <View style = {styles.container}>
                <ScreenName name = {'Settings'}/>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems :'center',
        justifyContent: 'center',
    },
})
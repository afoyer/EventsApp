import React from 'react';
import{View, Text} from 'react-native'

export default function ScreenName(props){
    return (
        <Text style={[{ color: "white" }]}>{props.name}</Text>
        
    )
}
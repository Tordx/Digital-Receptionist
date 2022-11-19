import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'

import {REPORT} from '../Assets/constants/constants';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';


export const ReportButton = () => {

    const navigation = useNavigation();


    return (

        <TouchableOpacity
         style = {styles.Report}
        onPress={()=>navigation.navigate('ReportScreen')}
        >
            <Text style = {styles.ReportText}>
                {REPORT}
            </Text>
        </TouchableOpacity>

    )

}

export const AppointmentButton = () =>{

    const navigation = useNavigation();

  return (
    <View style = {{ alignContent: 'center',}}>
    <TouchableOpacity
        onPress={()=> navigation.navigate('LoginScreen')}
        style = {{  
            width: 400, 
            height: 50, 
            backgroundColor: '#0f2ed6',
            alignSelf: 'center',
            borderRadius: 100,
            justifyContent: 'center',
        }}
        >
        <Text style = {{textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: 'white' }}>
            Schedule an Appointment
        </Text>
    </TouchableOpacity>
    </View>
  )
}


export const CloseButton = (props) => {

    return (

        <TouchableOpacity
        onPress={props.onPress}
        style = {props.style}
        >
        <Icon
        
        name = {props.name}
        size = {props.size}
        color = {props.color}

        />
        <Text style = {{fontSize: 20}}>{props.title}</Text>

</TouchableOpacity>
        
    )


}

export const ProceedButton = (props) => {

    return (
        <TouchableOpacity
         style = {[styles.proceed, props.style]}
        onPress = {props.onPress}
        
         >
            <Text style = {{textAlign: 'center', color: '#0f2ed6', fontSize: 20, fontWeight: '500'}}>
                {props.title}
            </Text>
        </TouchableOpacity>
    )

}


export const AddButton = (props) => {

    return (

        <TouchableOpacity
        onPress={props.onPress}
        style = {props.style}
        >
        <Icon
        color={props.color}
        name = {props.name}
        size = {props.size}


        />
        <Text style = {{fontSize: 20}}>{props.title}</Text>

</TouchableOpacity>
        
    )


}


const styles = StyleSheet.create({

    proceed: {

        width: 150,
        height: 50,
        backgroundColor: '#eb4034',
        borderRadius: 100,
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.41,
        elevation: 2,
    
      },

    Report: {

        justifyContent: 'center',
        position: 'absolute',
        bottom: 20,
        right: 20,
        margin: 20,
        width: 100,
        height: 50,
        backgroundColor: 'red',
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
	        width: 1,
	        height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 2.65, 
        elevation: 2,
        
    },

    ReportText: {

        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center'

    },
    
})
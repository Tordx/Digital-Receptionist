import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

import {REPORT} from '../Assets/constants/constants';
import {useNavigation} from '@react-navigation/native';


export const ReportButton = () => {

    const navigation = useNavigation();


    return (

        <View style = {styles.Report}>
        <TouchableOpacity
        onPress={()=>navigation.navigate('ReportScreen')}
        >
            <Text style = {styles.ReportText}>
                {REPORT}
            </Text>
        </TouchableOpacity>
    </View>

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

const styles = StyleSheet.create({

    Report: {

        position: 'absolute',
        top: 0,
        right: 0,
        margin: 20,
        
    },

    ReportText: {

        color: 'red',
        fontWeight: 'bold',
        fontSize: 20,

    },
    
})
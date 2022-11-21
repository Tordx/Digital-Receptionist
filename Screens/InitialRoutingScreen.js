import React, { useEffect, useState } from 'react';
import { 
    
    View,
    Text, 
    StyleSheet, 
    Image,
    TextInput,
    TouchableOpacity,
    ImageBackground,
    ToastAndroid,
    Pressable,

} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import psu_logo from '../Assets/Img/psu_logo.png';
import psu_backgroundImage from '../Assets/Img/psu_backgroundImage.png';
import { useFocusEffect ,useNavigation } from '@react-navigation/native';
import { AppName, Version, WCT, TagLine, Report } from '../Assets/constants/constants';
import {ReportButton} from '../ScreenComponents/Buttons';
import BackgroundTimer from 'react-native-background-timer';

export default function InitialRoutingScreen() {

    const navigation = useNavigation();

  return (
    <ImageBackground 
    source={require('../Assets/Img/Background_image.png')}
    resizeMode = 'cover'
    style = {{
        flex: 1,
      alignItems: 'center',
      justifyContent: 'center',}}
   >
        <Text style = {{bottom: 50, position: 'absolute', margin:20}}>DKHDR {Version}</Text>
        <ReportButton/>
        <View style = {{flexDirection: 'row'}}>
            <Pressable style = {[styles.Box, {backgroundColor: '#0f2ed6'}]}
                onPress = {() => navigation.navigate('StudentLoginScreen')}
                android_ripple = {{
      
                    color: '#fddf54',
                    radius: 275,
      
                }}
            >
                <Image
                    source={require("../Assets/Img/icons8-man-reading-a-book-96.png")}
                    style = {{width: 175, height: 175}}
          />
          
          <Text style = {[styles.text, {color: '#fddf54'}]}>STUDENT</Text>

            </Pressable>
            <Pressable style = {{justifyContent: 'center', marginHorizontal: 20, }}
                onLongPress = {() => navigation.navigate('AdminLoginScreen')}
            >
                <Image
                    source={require("../Assets/Img/psu_logo.png")}
                    style = {{width: 200, height: 200}}
          />
            </Pressable>
            <Pressable style = {styles.Box}
                onPress = {() => navigation.navigate('')}
                android_ripple = {{
      
                    color: '#0f2ed6',
                    radius: 275,
      
                }}
            >
                <Image
                    source={require("../Assets/Img/icons8-account-96.png")}
                    style = {{width: 175, height: 175}}
          />
          
          <Text style = {styles.text}>GUEST</Text>

            </Pressable>
            
        </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({

    Wrapper: {

        flex: 1,
        backgroundColor: '#f2f3f7',
        alignItems: 'center',
        justifyContent: 'center',

    },

    Box: {

        width: 350,
        height: 450,
        borderRadius: 30,
        margin: 20,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fddf54',
        shadowColor: "#000",
        shadowOffset: {
	    width:  0,
	    height: 8,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
    },

    text: {

        fontSize: 30,
        color: '#0f2ed6',
        fontWeight: '500',
        margin: 20,

    }

})
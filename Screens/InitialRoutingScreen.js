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
    Animated

} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import psu_logo from '../Assets/Img/psu_logo.png';
import psu_backgroundImage from '../Assets/Img/psu_backgroundImage.png';
import { useFocusEffect ,useNavigation } from '@react-navigation/native';
import { AppName, Version, WCT, TagLine, Report } from '../Assets/constants/constants';
import {ReportButton} from '../ScreenComponents/Buttons';
import BackgroundTimer from 'react-native-background-timer';
import { useDispatch } from 'react-redux';
import { setUser } from '../Redux/TaskReducer';
import { FlipLogo } from '../ScreenComponents/FlipLogo';
import UniversityMap from './UniversityMap';

export default function InitialRoutingScreen() {

    const [fadeAnim] = useState(new Animated.Value(0));
    const navigation = useNavigation();
    
    useEffect(() => {
        Animated.loop(
            Animated.sequence([
              Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true
              }),
              Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true
              })
            ])
          ).start();
      }, [fadeAnim]);

  return (
    <Pressable onPress = {() => navigation.navigate('StudentHomeScreen')}
    style = {{
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',}}>
    <ImageBackground 
    source={require('../Assets/Img/Background_image.png')}
    resizeMode = 'cover'
    style = {{
        width: '100%',
        height: '100%',
      alignItems: 'center',
      justifyContent: 'center',}}
   >
        <FlipLogo/>
                <Animated.View style={{ opacity: fadeAnim }}>
                    <Text style = {{fontSize: 25}}>press anywhere to continue</Text>
                </Animated.View>
            
    </ImageBackground>
    </Pressable>
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

        width: '35%',
        height: '65%',
        borderRadius: 15,
        margin: 20,
        flexDirection: 'column',
        justifyContent: 'center',
        alignSelf: 'center',
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
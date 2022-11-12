import { 
    
    View, 
    Text,
    ImageBackground,
    ToastAndroid,
} from 'react-native'
import React, {useEffect, useState} from 'react';
import psu_BackgroundImage from '../../../Assets/Img/psu_backgroundImage2.png';
import { SearchScreen } from '../../../ScreenComponents/SearchBar';
import { WelcomeText } from '../../../ScreenComponents/WelcomeText';
import { ReportButton } from '../../../ScreenComponents/Buttons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import BackgroundTimer from 'react-native-background-timer';

export default function Student_HomeScreen() {

  const navigation = useNavigation();

  const [seconds, setSeconds] = useState(300);
  
  
  useEffect(() => {

    BackgroundTimer.runBackgroundTimer(() => {
      setSeconds((secs) => {
        if (secs > 0) return secs - 1;
            else return 0;
    
      });
    }, 1000);

    

  },[])

    if (seconds === 10) {
      ToastAndroid.show("Session ending in 10 seconds, Please re-login", ToastAndroid.SHORT)
    } else if (seconds === 0)
    () => navigation.replace('LoginScreen')

  return (

    <ImageBackground
    source={psu_BackgroundImage}
    resizeMode = 'cover'
    style = {{
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%' }}>
       <ReportButton/>
      <View style = {{alignItems: 'center', justifyContent: 'center',}}>
        
       
        <SearchScreen/>
         <Text>{seconds}</Text>
      </View>

    </ImageBackground>
  )
}
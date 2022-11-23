import { 
    
    View, 
    Text,
    ImageBackground,
    ToastAndroid,
    Image,
    BackHandler,
    Alert,
} from 'react-native'
import React, {useEffect, useState} from 'react';
import psu_BackgroundImage from '../../../Assets/Img/psu_backgroundImage2.png';
import { SearchScreen } from '../../../ScreenComponents/SearchBar';
import { WelcomeText } from '../../../ScreenComponents/WelcomeText';
import { CloseButton, ReportButton } from '../../../ScreenComponents/Buttons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import BackgroundTimer from 'react-native-background-timer';
import psu_logo from '../../../Assets/Img/psu_logo.png'
import {StudentMainMenu} from './StudentMainMenu';

export default function Student_HomeScreen() {

  const navigation = useNavigation();

  const [seconds, setSeconds] = useState(600); // Set time limit to 10 mins [by seconds], (if possible can be set by admin)
  
  
  useEffect(() => {

    BackgroundTimer.runBackgroundTimer(() => {
      setSeconds((secs) => {


        if (secs > 0) return secs - 1; //increment time limit - 1

       

        else return 0;
    
        
      }
       );
    }, 1000);
    
  
  },[])

  if (seconds == 60)
  ToastAndroid.show("Session ending in 60 seconds, Please re-login", ToastAndroid.SHORT) // shows warning time interval 
  if (seconds == 0) 
  navigation.navigate('InitialRoutingScreen')
   
  useEffect(() => {
      const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
      return () => backHandler.remove()
    }, [])

    
    // let n = t
    // let t =  n
    // if (seconds > 0) {

    //   t = n + 1

    // } if (t == 60) {

    //   t = 0

    // } console.log(t)

   const confirmLogout = () => { //Logout Navigation to IntialRoutingScreen

    Alert.alert(
        'Confirm logout',
        'Are you sure?',
        [
          {
            text: "Cancel",
            onPress: () => console.log('Cancel Pressed'),
            style: "cancel"
          },
          { text: "Yes", onPress: () => navigation.navigate('InitialRoutingScreen')}
        ]
      );

   }
        

   

  return (

    <ImageBackground
    source={require('../../../Assets/Img/Background_image.png')}
    resizeMode = 'cover'
    style = {{
      backgroundColor: '#f2f3f7',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,

    }}
    >
        <CloseButton
        title =  'logout'
        name = 'logout'
        size = {30}
        onPress = {confirmLogout}
        style = {{flexDirection: 'row', top: 0, left: 0, position: 'absolute', margin: 20}}
        />
       <ReportButton
       />
      <View style = {{alignItems: 'center', justifyContent: 'center',}}>
        
        <Image
        
        source={require('../../../Assets/Img/psu_logo_emboss.png')}
        style = {{width: 200, height: 200, marginBottom: 25, }}

        />
        <Text style = {{fontSize: 20,}}> Welcome to Pangasinan State University, Lingayen Campus </Text>
          <View style = {{flexDirection: 'row', justifyContent: 'center', alignSelf: 'center'}}>
            <StudentMainMenu/>
            </View>
          <Text>{seconds}</Text>
      </View>

      </ImageBackground>
  )
}
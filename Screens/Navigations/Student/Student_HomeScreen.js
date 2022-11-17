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

export default function Student_HomeScreen() {

  const navigation = useNavigation();

  const [seconds, setSeconds] = useState(60);
  
  
  useEffect(() => {

    BackgroundTimer.runBackgroundTimer(() => {
      setSeconds((secs) => {

        if (secs > 0) return secs - 1;

       
            
        if (secs == 0)
            navigation.navigate('InitialLoginRouting')
            
        else return 0;
    
      });
    }, 1000);

    
  
  },[])

  if (seconds == 60) 
  ToastAndroid.show("Session ending in 60 seconds, Please re-login", ToastAndroid.SHORT)

   
  useEffect(() => {
      const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
      return () => backHandler.remove()
    }, [])

    

   const confirmLogout = () => {

    Alert.alert(
        'Confirm logout',
        'Are you sure?',
        [
          {
            text: "Cancel",
            onPress: () => console.log('Cancel Pressed'),
            style: "cancel"
          },
          { text: "Yes", onPress: () => navigation.navigate('InitialLoginRouting')}
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
      width: '100%' 

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
        
       
          <SearchScreen/>
          <Text>{seconds}</Text>
      </View>

      </ImageBackground>
  )
}
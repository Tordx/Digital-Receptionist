import { 
    
    View, 
    Text,
    ImageBackground,
} from 'react-native'
import React from 'react'
import psu_BackgroundImage from '../../../Assets/Img/psu_backgroundImage2.png'
import { SearchScreen } from '../../../ScreenComponents/SearchBar'
import { WelcomeText } from '../../../ScreenComponents/WelcomeText'
import { ReportButton } from '../../../ScreenComponents/Buttons'
export default function Student_HomeScreen() {

  return (

    <ImageBackground
    source={psu_BackgroundImage}
    style = {{flex: 1,
      alignItems: 'center',
      justifyContent: 'center', }}>
       <ReportButton/>
      <View style = {{alignItems: 'center', justifyContent: 'center',}}>
        
        
        <SearchScreen/>
      </View>

    </ImageBackground>
  )
}
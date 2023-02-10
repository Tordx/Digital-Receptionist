import { View, Text, Image } from 'react-native'
import React from 'react'
import { HOMEPAGESUBTAG, HOMEPAGETAG, HOMEPAGEWELCOME } from '../Assets/constants/constants'
import psu_logo from '../Assets/Img/psu_logo.png'

export const WelcomeText = () => {
  return (
    <View style = {{marginBottom: 30}}>
        <Image
        
        source={psu_logo}
        style = {{width: 125, height: 125, alignSelf: 'center', margin: 10,}}

        />
        <Text style ={{fontSize: 20, textAlign: 'center', fontWeight: '500', marginBottom: 0 }}>{HOMEPAGETAG}</Text>
        {/* <Text style ={{fontSize: 15, textAlign: 'center', fontWeight: '500', marginBottom: 10 }}>{HOMEPAGESUBTAG}</Text> */}
    </View>
  )
}
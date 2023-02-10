
import { 

    View  

} from 'react-native';
import React, { useEffect, useState,  } from 'react';
import MapboxGL from '@rnmapbox/maps';
import { useSelector } from 'react-redux';

export default function Maps() {

  const {facultyDatas} = useSelector((store) => store.facultymodal)                                                                       
  const [AccessToken] = useState(facultyDatas.Token)
  MapboxGL.setWellKnownTileServer('Mapbox'); // error making mapbox v-11 style must include
  MapboxGL.setAccessToken(AccessToken)

  return (
    <View style = {{flex: 1}}>
    <MapboxGL.MapView
   AccessToken = {AccessToken}
   style = {{flex: 1}}
   
   >
   </MapboxGL.MapView>
   <CloseButton

        onPress = {() => navigation.navigate('StudentHomeScreen')}     
        name = 'arrow-back'
        size = {40}
        color = 'red'
        style = {{flexDirection: 'row', top: 25, left: 25, position: 'absolute'}}
    />
   </View>
  );
}

// Need to setup API maps at mapbox, already have an account needs to access lol
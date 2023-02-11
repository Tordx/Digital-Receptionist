
import { 

    View  

} from 'react-native';
import React, { useEffect, useState,  } from 'react';
import MapboxGL from '@rnmapbox/maps';
import { useSelector } from 'react-redux';
import { CloseButton } from '../Components/Buttons'
import { useNavigation } from '@react-navigation/native';

export default function Maps() {

  const navigation = useNavigation();
  const {facultyDatas} = useSelector((store) => store.facultymodal)                                                                       
  const [AccessToken] = useState(facultyDatas.Token)
  MapboxGL.setWellKnownTileServer('Mapbox'); // error making mapbox v-11 style must include this component
  MapboxGL.setAccessToken(AccessToken)

  return (
    <View style = {{width: '50%', height: '90%', borderRadius: 5}}>
    <MapboxGL.MapView
   AccessToken = {AccessToken}
   style = {{flex: 1, borderRadius: 5}}
   
   >
   </MapboxGL.MapView>
   </View>
  );
}

// Need to setup API maps at mapbox, already have an account needs to access lol
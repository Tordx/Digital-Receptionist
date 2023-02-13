
import { 

    View  

} from 'react-native';
import React, { useEffect, useState,  } from 'react';
import MapboxGL from '@rnmapbox/maps';
import { useSelector } from 'react-redux';
import { CloseButton } from '../Components/Buttons'
import { useNavigation } from '@react-navigation/native';
import { remoteDBBuilding } from '../Database/pouchDb';

export default function Maps() {

  const navigation = useNavigation();
  const [buildingCoordinates, setBuildingCoordinates] = useState('')
  const {facultyDatas} = useSelector((store) => store.facultymodal)      
  const [center, setCenter] = useState([120.2307078878246, 16.032108026014853])                                                                 
  const [AccessToken] = useState(facultyDatas.Token)
  MapboxGL.setWellKnownTileServer('Mapbox'); // error making mapbox v-11 style must include this component
  MapboxGL.setAccessToken(AccessToken)

  return (
    <View style = {{width: '100%', height: '100%', borderRadius: 5, marginLeft: 20, position: 'absolute'}}>
    <MapboxGL.MapView
   style = {{flex: 1, borderRadius: 5}}
   styleURL = 'mapbox://styles/kalokalo/cldzyog2k000a01t401qifylc'
   tile
   logoEnabled = {false}
   attributionPosition = {{bottom: 10, left: 10}}
   >
    <MapboxGL.Camera
      centerCoordinate={center}
      zoomLevel = {17.8}
      onPress = {() => console.log(facultyDatas.Coordinates)}
    />
      <MapboxGL.PointAnnotation
        id = {facultyDatas.CollegeAcronym}
        title = {facultyDatas.College}
        coordinate = {facultyDatas.Coordinates}
       
      />
   </MapboxGL.MapView>
   </View>
  );
}

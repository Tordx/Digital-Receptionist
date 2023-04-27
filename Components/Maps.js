
import { 

    View  

} from 'react-native';
import React, { useEffect, useState,  } from 'react';
import MapboxGL from '@rnmapbox/maps';
import { useSelector } from 'react-redux';
import { CloseButton } from './Buttons'
import { useNavigation } from '@react-navigation/native';
import { remoteDBBuilding } from '../Database/pouchDb';

export default function   Maps(props) {

  const navigation = useNavigation();
  const [buildingCoordinates, setBuildingCoordinates] = useState('')
  const {facultyDatas} = useSelector((store) => store.facultymodal)      
  const [center, setCenter] = useState([120.2307078878246, 16.032108026014853])                                                                 
  const [AccessToken] = useState('pk.eyJ1Ijoia2Fsb2thbG8iLCJhIjoiY2xkeXV5bWxwMHY3aTNvcjNsc3Bsc3hmdyJ9.n-Gnaro_yu9dj5PnUhNgfQ')
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
   onLongPress={props.onLongPress}
   >
    <MapboxGL.Camera
      centerCoordinate={center}
      zoomLevel = {17.8}
    />
      <MapboxGL.PointAnnotation
        id = {props.id} // facultyDatas.CollegeAcronym
        title = {props.title} // facultyDatas.College
        coordinate = {props.coordinate} //facultyDatas.Coordinates
       
      />
   </MapboxGL.MapView>
   </View>
  );
}

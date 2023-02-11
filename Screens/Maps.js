
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
  const [center, setCenter] = useState([120.22978878878246, 16.032108026014853])                                                                 
  const [AccessToken] = useState(facultyDatas.Token)
  MapboxGL.setWellKnownTileServer('Mapbox'); // error making mapbox v-11 style must include this component
  MapboxGL.setAccessToken(AccessToken)

  useEffect(() => {
    BuildingCoordinates();
  },[])

  const BuildingCoordinates = async() => {

    var result =  await remoteDBBuilding.allDocs({
        include_docs: true,
        attachments: true,
    })
    if(result.rows){
      let modifiedArr = result.rows.map(function(item) {
        return item.doc
      })
      let filteredData = modifiedArr.filter(item => {
        return item
      })
      if(filteredData) {
        let newFilterData = filteredData.map(item => {
          return item;
        });
        setBuildingCoordinates(newFilterData);
        console.log(newFilterData)

      }
    } 

  }

  return (
    <View style = {{width: '50%', height: '95%', borderRadius: 5, marginLeft: 5}}>
    <MapboxGL.MapView
   style = {{flex: 1, borderRadius: 5}}
   styleURL = 'mapbox://styles/kalokalo/cldzyog2k000a01t401qifylc'
   tile
   logoEnabled = {false}
   pitchEnabled = {false}
   scrollEnabled = {false}
   >
    <MapboxGL.Camera
      centerCoordinate={center}
      zoomLevel = {17.5}
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

// Need to setup API maps at mapbox, already have an account needs to access lol
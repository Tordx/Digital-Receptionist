//import liraries
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text,  StatusBar, FlatList, RefreshControl, ScrollView, StyleSheet, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { CloseButton } from '../../../Components/Buttons';
import { remoteDBCourses, remoteDBfacultyMember } from '../../Database/pouchDb';
import {  remoteDBOrg } from '../../Database/pouchDb';
import Maps from '../../../Components/Maps';
// import { reverseGeocode } from '@react-native-mapbox-gl/maps';

// create a component
export default function UniversityMap ()  {

    const {buildingData} = useSelector((store) => (store.buildingmodal))
    const navigation = useNavigation()
    const [rooms, setRooms] = useState(buildingData.Rooms)
    const [center, setCenter] = useState([120.2307078878246, 16.032108026014853])  
    const [cdnterid, setCenterID] = useState("center")  
    const [cdnterbuilding, setCenterBuilding] = useState("centerbuilding")  
    const [locationName, setLocationName] = useState('');
    
    // const filterRooms = (floor) => {
    //   return rooms.filter((room) => room.Floor === floor);
    // };

    // const renderItem = ({item}) => {

    //   return (
    //     <View style = {{flexDibrection: 'column', padding: 20}}>
    //     <View style = {{flexDirection: 'column', alignItems: 'flex-start',}}>
    //         <Text style = {{fontSize: 20, color: '#505050' }}>{item.Room}  —  {item.Floor}</Text>     
    //     </View>
    //     </View>
    //   )
    // } 

    return (
      <>
          <View style={styles.container}>
              <StatusBar hidden />
              <Maps
               id={cdnterid}
               title={cdnterbuilding}
               coordinate={center}
                  logoEnabled = {false}
                  attributionEnabled = {false}
                  onLongPress={async (event) => {
                    const coordinates = event.geometry.coordinates;
                    const response = await reverseGeocode(coordinates);
                    const locationName = response.features[0].place_name;
                    setLocationName(locationName);
                  }}
              />
              <View style={{ width: '50%', height: '100%' }} />
              <View style={{ width: '50%', height: '100%' }}>
                  <View style={styles.header}>
                      <View style={{ padding: 10 }}>
                          <Text style={{ fontSize: 23, marginVertical: 3 }}>BuildingName - </Text>
                          <Text style={{ fontSize: 23, marginVertical: 3 }}>BuildingLocation: -</Text>
                      </View>
                  </View>
                  {/* <View style={[styles.header, { height: '25%' }]}>
                      <Text style={{ fontSize: 23, fontWeight: "bold", marginTop: 30 }}>1st floor</Text>
                      <View style={{ padding: 5 }}>
                          <FlatList
                              data={filterRooms("1st floor")}
                              renderItem={renderItem}
                              keyExtractor={(item) => item.id}
                          />
                      </View>
                  </View> */}
                  {/* <View style={[styles.header, { height: '25%' }]}>
                      <Text style={{ fontSize: 23, fontWeight: "bold", marginTop: 30 }}>2nd floor</Text>
                      <View style={{ padding: 5 }}>
                          <FlatList
                              data={filterRooms("2nd floor")}
                              renderItem={renderItem}
                              keyExtractor={(item) => item.id}
                          />
                      </View>
                  </View> */}
                  {/* <View style={[styles.header, { height: '25%' }]}>
                      <Text style={{ fontSize: 23, fontWeight: "bold", marginTop: 30 }}>3rd floor</Text>
                      <View style={{ padding: 5 }}>
                          <FlatList
                              data={filterRooms("3rd floor")}
                              renderItem={renderItem}
                              keyExtractor={(item) => item.id}
                          />
                      </View>
                  </View> */}
              </View>
          </View>
          <CloseButton
              onPress={() => navigation.goBack('ClassScreen')}
              name='arrow-back'
        color = '#fff'
        size = {35}
        style = {{flexDibrection: 'row', top: 25, left: 25, position: 'absolute'}}/>
      </>
    );
};



const filterRooms = (floor) => {
  return rooms.filter((room) => room.Floor === floor);
};

const renderItem = ({ item }) => {
  return (
      <View style={{ flexDirection: 'column', padding: 20 }}>
          <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
              <Text style={{ fontSize: 20, color: '#505050' }}>{item.Room} — {item.Floor}</Text>
          </View>
      </View>
  )
};



const styles = StyleSheet.create({

  container: {
    
    flexDirection: 'row',  
    width: '100%', 
    height: '100%',
    justifyContent: 'center', 
    alignItems: 'center',

  },
  header: { 
    
    flexDirection: 'column',
    alignSelf: 'flex-end', 
    justifyContent: 'center',
    backgroundColor: '#f6f6f6', 
    width: '100%', 
    height: 100, 
    marginTop: 15, 
    marginLeft: 15, 
    elevation: 10, 
    borderBottomLeftRadius: 15, 
    borderTopLeftRadius: 15
  
  }

})
//import liraries
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text,  StatusBar, FlatList, RefreshControl, ScrollView, StyleSheet, Image, Pressable } from 'react-native';
import { useSelector } from 'react-redux';
import { CloseButton } from '../../Components/Buttons';
import { remoteDBCourses, remoteDBfacultyMember } from '../../Database/pouchDb';
import {  remoteDBOrg } from '../../Database/pouchDb';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Maps from '../../Components/Maps';

// create a component
export default function BuildingMapScreen ()  {

    const {buildingData} = useSelector((store) => (store.buildingmodal))
    const navigation = useNavigation()
    const [rooms, setRooms] = useState(buildingData.Rooms)
    const [coords, setDefaultCoord] = useState('');
    
    console.log(buildingData);




    const filterRooms = (floor) => {
        return rooms?.filter((room) => room?.Floor === floor);
      };

    const renderItem = ({item}) => {

      return (
        <View style = {{flexDibrection: 'column', padding: 20}}>
        <View style = {{flexDirection: 'column', alignItems: 'flex-start', borderRightWidth: 1, borderColor: '#fff',  width: '100%' }}>
            <Text style = {{fontSize: 20, color: '#505050', fontFamily: 'regular', paddingRight: 50, textAlign: 'center', width: '100%' }}>{item.Room.toUpperCase()}</Text>     
        </View>
        </View>
      )
    } 

    return (
      <>
          <View style={styles.container}>
              <StatusBar hidden />
              <Maps
               id={buildingData.BuildingName}
               title={buildingData.BuildingLocation}
               centerCoordinate = {[120.2307078878246, 16.032108026014853]}
               coordinate={buildingData.Coordinates}
                  logoEnabled = {false}
                  attributionEnabled = {false}
                
              />
              <View style={{ width: '50%', height: '100%' }} />
              <View style={{ width: '50%', height: '100%' }}>
              <View style={[styles.header]}>
                      <View style={{ padding: 10 }}>
                          <Text style={{ fontSize: 25, marginVertical: 3, fontFamily: 'extrabold', color: '#404040' }}>{buildingData.BuildingName}</Text>
                      </View>
                      
                      <Pressable 
                        style = {{position: 'absolute', right: 20, justifyContent: 'center',alignItems: 'center', width: 35, height: 35, borderWidth: 4, alignSelf: 'center', borderRadius: 500, borderColor: '#101010'}}>
                        <FontAwesome
                        name = 'close' size = {20} color={'#101010'}
                        />
                      </Pressable>
                   
                  </View>
                 {filterRooms("1st floor").length !== 0 && <View style={[styles.header, {height: '15%'}]}>
                  <View style = {{paddingVertical: 20, wdith: '100%'}}>
                  <Text style = {{ fontSize: 17, textAlign: 'center', paddingVertical: 5, marginTop: 30, color: '#303030', width: '100%', backgroundColor: '#00000019', fontFamily: 'italic'}}>FIRST FLOOR</Text>
                      
                          <FlatList
                              style = {{padding: 5}}
                              showsHorizontalScrollIndicator = {false}
                              horizontal
                              data={filterRooms("1st floor")}
                              renderItem={renderItem}
                              keyExtractor={(item) => item.id}
                          />
                  </View>
                  </View>}
                  {filterRooms("2nd floor").length !== 0 && <View style={[styles.header, {height: '15%'}]}>
                  <View style = {{paddingVertical: 20, wdith: '100%'}}>
                  <Text style = {{ fontSize: 17, textAlign: 'center', paddingVertical: 5, marginTop: 30, color: '#303030', width: '100%', backgroundColor: '#00000019', fontFamily: 'italic'}}>SECOND FLOOR</Text>
                          <FlatList
                              showsHorizontalScrollIndicator = {false}
                              horizontal
                              data={filterRooms("2nd floor")}
                              renderItem={renderItem}
                              keyExtractor={(item) => item.id}
                          />
                      </View>
                  </View>}
                  {filterRooms("3rd floor").length !== 0 && <View style={[styles.header, {height: '15%'}]}>
                  <View style = {{paddingVertical: 20, wdith: '100%'}}>
                  <Text style = {{ fontSize: 17, textAlign: 'center', paddingVertical: 5, marginTop: 30, color: '#303030', width: '100%', backgroundColor: '#00000019', fontFamily: 'italic'}}>THIRD FLOOR</Text>
                          <FlatList
                              showsHorizontalScrollIndicator = {false}
                              horizontal    
                              data={filterRooms("3rd floor")}
                              renderItem={renderItem}
                              keyExtractor={(item) => item.id}
                          />
                      </View>
                  </View>}
                  <View style = {[styles.header, {height: '30%'}]}>
                      <Pressable style = {{alignItems: 'center', justifyContent: 'center', width: '100%'}}>
                        <Image resizeMode="cover"
                        style={{ width: '95%', height: '90%', borderRadius: 20, padding: 10, marginLeft: 10}}
                        source={{ uri: buildingData.BuildingPicture }} />
                      </Pressable>
                      </View>
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
    backgroundColor: '#fddf54', 
    width: '100%', 
    height: 100, 
    marginTop: 15, 
    marginLeft: 15, 
    elevation: 10, 
    borderBottomLeftRadius: 15, 
    borderTopLeftRadius: 15
  
  }

})
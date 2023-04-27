//import liraries
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text,  StatusBar, FlatList, RefreshControl, ScrollView, StyleSheet, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { CloseButton } from '../../Components/Buttons';
import { remoteDBCourses, remoteDBfacultyMember } from '../../Database/pouchDb';
import {  remoteDBOrg } from '../../Database/pouchDb';
import Maps from '../../Components/Maps';

// create a component
export default function BuildingMapScreen ()  {

    const {buildingData} = useSelector((store) => (store.buildingmodal))
    const navigation = useNavigation()
    const [rooms, setRooms] = useState(buildingData.Rooms)
    
    const [orgdetail, setOrgDetail] = useState('');
    const [memberdetails, setMemberDetail] = useState();
    const [memberRefresh, setMemberRefresh] = useState(false);
    console.log('====================================buildingData');
    console.log(buildingData);
    console.log('====================================buildingData');
    
    //   const OrgList = async() => {
    
    //     var result =  await remoteDBOrg.allDocs({
    //         include_docs: true,
    //         attachments: true,
    //     })
    //     if(result.rows){
    //       let modifiedArr = result.rows.map(function(item) {
    //         return item.doc
    //       })
    //       let filteredData = modifiedArr.filter(item => {
    //         return item.Department === courseData.Department
    //       })
    //       if(filteredData) {
    //         let newFilterData = filteredData.map(item => {
    //           return item;
    //         });
    //         setOrgDetail(newFilterData);

    //         console.log(newFilterData)
    
    //       }
    //     } 
    
    //   }
    //   const MemberDetails = async() => {
    
    //     var result =  await remoteDBfacultyMember.allDocs({
    //         include_docs: true,
    //         attachments: true,
    //     })
    //     if(result.rows){
    //       let modifiedArr = result.rows.map(function(item) {
    //         return item.doc
    //       })
    //       let filteredData = modifiedArr.filter(item => {
    //         return item.Department  === courseData.Department
    //       })
    //       if(filteredData) {
    //         let newFilterData = filteredData.map(item => {
    //           return item;
    //         });;
    //         setMemberDetail(newFilterData);
    //         console.log(newFilterData)
    
    //       }
    //     } 
    
    //   }

    //   console.log(courseData)
    

    //   const RefreshList = () => {

    //     setMemberRefresh(true);
    //     OrgList();
    //     MemberList();
    //     setMemberRefresh(false);
  
    // }

    const renderItem = ({item}) => {

      return (
        <View style = {{flexDibrection: 'column', padding: 20}}>
        <View style = {{flexDirection: 'column', alignItems: 'flex-start',}}>
            <Text style = {{fontSize: 20, color: '#505050' }}>{item.Room}  —  {item.Floor}</Text>     
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
               coordinate={buildingData.Coordinates}
                  logoEnabled = {false}
                  attributionEnabled = {false}
                  onLongPress={(event) => {
                      console.log('Long press event:', event);
                      const coordinates = event.geometry.coordinates;
                      setDefaultCoord(coordinates)
                      console.log('Selected coordinates:', coordinates);
                  }}
              />
              <View style={{ width: '50%', height: '100%' }} />
              <View style={{ width: '50%', height: '100%' }}>
                  <View style={styles.header}>
                      <View style={{ padding: 10 }}>
                          <Text style={{ fontSize: 23, marginVertical: 3 }}>BuildingName - {buildingData.BuildingName}</Text>
                          <Text style={{ fontSize: 23, marginVertical: 3 }}>BuildingLocation: - {buildingData.BuildingLocation}</Text>
                      </View>
                  </View>
                  <View style={[styles.header, { height: '25%' }]}>
                      <Text style={{ fontSize: 23, fontWeight: "bold", marginTop: 30 }}>1st floor</Text>
                      <View style={{ padding: 5 }}>
                          <FlatList
                              data={filterRooms("1st floor")}
                              renderItem={renderItem}
                              keyExtractor={(item) => item.id}
                          />
                      </View>
                  </View>
                  <View style={[styles.header, { height: '25%' }]}>
                      <Text style={{ fontSize: 23, fontWeight: "bold", marginTop: 30 }}>2nd floor</Text>
                      <View style={{ padding: 5 }}>
                          <FlatList
                              data={filterRooms("2nd floor")}
                              renderItem={renderItem}
                              keyExtractor={(item) => item.id}
                          />
                      </View>
                  </View>
                  <View style={[styles.header, { height: '25%' }]}>
                      <Text style={{ fontSize: 23, fontWeight: "bold", marginTop: 30 }}>3rd floor</Text>
                      <View style={{ padding: 5 }}>
                          <FlatList
                              data={filterRooms("3rd floor")}
                              renderItem={renderItem}
                              keyExtractor={(item) => item.id}
                          />
                      </View>
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
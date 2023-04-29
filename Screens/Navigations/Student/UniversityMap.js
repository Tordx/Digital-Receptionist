//import liraries
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text,  StatusBar, FlatList, RefreshControl, ScrollView, StyleSheet, Image , Pressable , Modal } from 'react-native';
import { useSelector } from 'react-redux';
import { CloseButton } from '../../../Components/Buttons';
import { remoteDBBuilding } from '../../../Database/pouchDb';
import {  remoteDBOrg } from '../../Database/pouchDb';
import Maps from '../../../Components/Maps';
import axios from 'axios';

// create a component
export default function UniversityMap ()  {

  useEffect(() => {
    BuildingData()
  }, [])
  

    const {buildingData} = useSelector((store) => (store.buildingmodal))
    const navigation = useNavigation()
    const [rooms, setRooms] = useState(buildingData.Rooms)
    const [center, setCenter] = useState([120.23017646213697,16.03097522000529])  
    const [cdnterid, setCenterID] = useState("center")  
    const [cdnterbuilding, setCenterBuilding] = useState("centerbuilding")  
    const [locationName, setLocationName] = useState('');
    const [buildinginfo, setBuildingInfo] = useState(true);
    const [buildingdata, setBuildingData] = useState('');
    const [buildings, setBuildings] = useState('');
    const [imagemodal, setImageModal] = useState(false);

    // const handleLongPress = async (event) => {
    //     const coordinates = event.geometry.coordinates;
    //     console.log('====================================coordinates');
    //     console.log(coordinates);
    //     console.log('====================================coordinates');
    //     try {
    //     const AccessToken = ('pk.eyJ1Ijoia2Fsb2thbG8iLCJhIjoiY2xkeXV5bWxwMHY3aTNvcjNsc3Bsc3hmdyJ9.n-Gnaro_yu9dj5PnUhNgfQ')
    //       const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${coordinates[0]},${coordinates[1]}.json`;
    //       const response = await axios.get(url, {
    //         headers: {
    //           Authorization: `Bearer ${AccessToken}`, 
    //         },
    //       });
    //       console.log('====================================response');
    //       console.log(response);
    //       console.log('====================================response');
    //       const features = response.data.features;
    //       if (features.length > 0) {
    //         const locationName = features[0].place_name;
    //         setLocationName(locationName);
    //       }
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   };

      const BuildingData = async() => {
    
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
            });;
            setBuildings(newFilterData)
            console.log('newFilterData')
            console.log(newFilterData)
            console.log('newFilterData')
    
          }
        } 
    
      }
    
    const filterRooms = (floor) => {
      return rooms.filter((room) => room.Floor === floor);
    };

    const renderItem = ({item}) => {

      return (
        <View style = {{flexDibrection: 'column', padding: 20}}>
        <View style = {{flexDirection: 'column', alignItems: 'flex-start',}}>
          <Pressable onPress={() => 
            {setBuildingData(item) , 
            setBuildingInfo(false) , 
            setCenterID(item.BuildingName) , 
            setCenterBuilding(item.BuildingLocation),
            setRooms(item.Rooms),
            setCenter(item.Coordinates)}}>
         
            <Text style = {{fontSize: 20, color: '#505050' }}>{item.BuildingName}</Text>  
            </Pressable>   
        </View>
        </View>
      )
    } 
    const renderItem1 = ({item}) => {
      console.log('====================================item');
      console.log(item);
      console.log('====================================item');

      return (
        <View style = {{flexDibrection: 'column', padding: 10}}>
        <View style = {{flexDirection: 'column', alignItems: 'flex-start',}}>
          <Pressable onPress={() =>   {}}>
            <Text style = {{fontSize: 20, color: '#505050' }}>{item.Room}</Text>  
            </Pressable>   
        </View>
        </View>
      )
    } 

    return (
      <>
        <Modal
          animationType="none"
          transparent={true}
          visible={imagemodal}
          onRequestClose={() => {
            setImageModal(false);
          }}
        >
          <View style={[styles.centeredView, { height: "100%" }]}>
            <Image
              resizeMode="contain"
              style={{ width: 1000, height: 1000 }}
              source={{ uri: buildingdata.BuildingPicture }}
            />
          </View>
        </Modal>
        <View style={styles.container}>
          <StatusBar hidden />
          <Maps
            id={cdnterid}
            title={cdnterbuilding}
            coordinate={center}
            logoEnabled={false}
            attributionEnabled={false}
            // onLongPress={handleLongPress}
          />
          <View style={{ width: "50%", height: "100%" }} />
          <View style={{ width: "50%", height: "100%" }}>
            {buildinginfo ? (
              <View style={[styles.header, { height: "95%" }]}>
                <Text style={{ fontSize: 23, fontWeight: "bold", marginTop: 30 }}>
                  Building
                </Text>
                <View style={{ padding: 5 }}>
                  <FlatList
                    data={buildings}
                    renderItem={renderItem}
                    keyExtractor={(item) => item._id}
                  />
                </View>
              </View>
            ) : (
              <>
                <View style={[styles.header, { height: "25%" }]}>
                  <Pressable onPress={() => { console.log("pressss"); setImageModal(true) }}>
                    <Image
                      resizeMode="contain"
                      style={{ width: 500, height: 400 }}
                      source={{ uri: buildingdata.BuildingPicture }}
                    />
                  </Pressable>
                  <CloseButton
                    onPress={() => setBuildingInfo(true)}
                    name="arrow-back"
                    color="#fff"
                    size={35}
                    style = {{flexDibrection: 'row', top: 25, left: 25, position: 'absolute'}}/>
                </View>
                <View style={[styles.header, { height: "23%" }]}>
                  <Text style={{ fontSize: 23, fontWeight: "bold", marginTop: 30 }}>
                    1st floor
                  </Text>
                  <View style={{ padding: 2 }}>
                    <FlatList
                      data={filterRooms("1st floor")}
                      renderItem={renderItem1}
                      keyExtractor={(item) => item.id}
                    />
                  </View>
                </View>
                <View style={[styles.header, { height: "23%" }]}>
                  <Text style={{ fontSize: 23, fontWeight: "bold", marginTop: 30 }}>
                    2nd floor
                  </Text>
                  <View style={{ padding: 2 }}>
                    <FlatList
                      data={filterRooms("2nd floor")}
                      renderItem={renderItem1}
                      keyExtractor={(item) => item.id}
                    />
                  </View>
                </View>
                <View style={[styles.header, { height: "23%" }]}>
                  <Text style={{ fontSize: 23, fontWeight: "bold", marginTop: 30 }}>
                    3rd floor
                  </Text>
                  <View style={{ padding: 2 }}>
                    <FlatList
                      data={filterRooms("3rd floor")}
                      renderItem={renderItem1}
                      keyExtractor={(item) => item.id}
                    />
                  </View>
                </View>
              </>
            )}
          </View>
        </View>
        <CloseButton
          onPress={() => navigation.goBack("ClassScreen")}
          name="arrow-back"
          color="#fff"
          size={35}
          style = {{flexDibrection: 'row', top: 25, left: 25, position: 'absolute'}}/>
      </>
    );
};






const styles = StyleSheet.create({

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)"
  },

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
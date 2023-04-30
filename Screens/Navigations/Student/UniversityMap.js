//import liraries
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text,  StatusBar, FlatList, RefreshControl, ScrollView, StyleSheet, Image , Pressable , Modal } from 'react-native';
import { useSelector } from 'react-redux';
import { CloseButton } from '../../../Components/Buttons';
import { remoteDBBuilding } from '../../../Database/pouchDb';
import {  remoteDBOrg } from '../../Database/pouchDb';
import Maps from '../../../Components/Maps';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialIcons';

// create a component
export default function UniversityMap ()  {

  useEffect(() => {
    BuildingData()
  }, [])
  

    const {buildingData} = useSelector((store) => (store.buildingmodal))
    const navigation = useNavigation()
    const [rooms, setRooms] = useState(buildingData.Rooms)
    const [center, setCenter] = useState([120.22984621518788,16.032077640860166])  
    const [cdnterid, setCenterID] = useState("center")  
    const [cdnterbuilding, setCenterBuilding] = useState("centerbuilding")  
    const [locationName, setLocationName] = useState('');
    const [buildinginfo, setBuildingInfo] = useState(true);
    const [buildingdata, setBuildingData] = useState('');
    const [buildings, setBuildings] = useState('');
    const [imagemodal, setImageModal] = useState(false);
    const [listModal, setListModal] = useState(false)
    const [coords, setDefaultCoord] = useState('');

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
      
      console.log('rendered');
        return rooms?.filter((room) => room?.Floor === floor);
      };

    const renderItem = ({item}) => {

      return (
        <View style = {{flexDibrection: 'column', padding: 20}}>
        <View style = {{flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', backgroundColor: 'red'}}>
          <Pressable onPress={() => 
            {
            
            setBuildingData(item) , 
            setCenterID(item.BuildingName) , 
            setCenterBuilding(item.BuildingLocation),
            setRooms(item.Rooms),
            setCenter(item.Coordinates)
            console.log('what the fuck')
            }}
            >
         
            <Text style = {{fontSize: 25, color: '#303030', fontFamily: 'medium', }}>{item.BuildingName}</Text>  
            </Pressable>
          
        </View>
        <Pressable  style = {{position: 'absolute', right: 0}}  
        onPress={() => {    
          setBuildingData(item) , 
          setCenterID(item.BuildingName) , 
          setCenterBuilding(item.BuildingLocation),
          setRooms(item.Rooms),
          setCenter(item.Coordinates)
          setBuildingInfo(false);
          console.log('what the fuck2')
          }}
        >
              <Icon name = 'expand-more' color = 'gray' size = {30} />
            </Pressable>
        </View>
      )
    } 
    const renderItem1 = ({item}) => {

      return (
        <View style = {{flexDibrection: 'column', padding: 20, width: 300}}>
        <View style = {{flexDirection: 'column', alignItems: 'flex-start', borderRightWidth: 1, borderColor: '#fff',}}>
            <Text style = {{fontSize: 20, color: '#505050', fontFamily: 'regular', paddingRight: 50, textAlign: 'center', width: '100%' }}>{item.Room.toUpperCase()}</Text>     
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
            centerCoordinate = {center}
            coordinate={center}
            logoEnabled={false}
            attributionEnabled={false}
            zoomLevel = {18.2}
            onLongPress={(event) => {
              console.log('Long press event:', event);
              const coordinates = event.geometry.coordinates;
              setCenter(coordinates)
              console.log('Selected coordinates:', coordinates);
          }}
          />
          
          <Pressable 
                        onPress={() => setListModal(true)}
                        style = {{position: 'absolute', right: 20, bottom: 20, justifyContent: 'center', alignItems: 'center',}}>
                        <Icon
                        name = 'keyboard-arrow-up' size = {75} color={'#101010'}
                        />
                        <Text style = {{fontFamily: 'extrabold', color: '#fddf54', textShadowColor: '#101010', textShadowRadius: 10, fontSize: 20}}>BUILDING INFORMATION</Text>
                      </Pressable>
          <View style={{ width: "75%", height: "100%", alignSelf: 'flex-end'}}>
          {listModal &&
            <View style = {styles.container}>
            {buildinginfo ? (
              <View style={[styles.header, { height: "95%", width: '50%', }]}>
                   <View style={{flexDirection: 'row',borderBottomWidth: 2, borderColor: '#404040', width: '100%' }}>
                <Text style={{ fontSize: 35, fontFamily: 'black', padding: 20, color: '#303030', }}>
                  Buildings
                </Text>
                <Pressable 
                  style = {{position: 'absolute', right: 0, padding: 5}} 
                  onPress={() => setListModal(false)}
                >
                <Icon name = 'keyboard-arrow-down' size = {75} color = '#303030'/>
                </Pressable>
                </View>
                  <FlatList
                    style = {{padding: 20}}
                    data={buildings}
                    renderItem={renderItem}
                    keyExtractor={(item) => item._id}
                  />
              </View>
            ) : (
              <View style={{ height: "95%", width: '50%',alignSelf: 'flex-end', 
              justifyContent: 'center',
                }}>
                  <View style={[styles.header]}>
                      <View style={{ padding: 10 }}>
                          <Text style={{ fontSize: 23, marginVertical: 3 }}>{cdnterbuilding}</Text>
                          <Text style={{ fontSize: 23, marginVertical: 3 }}> {locationName}</Text>
                      </View>
                      
                      <Pressable 
                        onPress={() => setBuildingInfo(true)}
                        style = {{position: 'absolute', right: 20, justifyContent: 'center',alignItems: 'center', width: 35, height: 35, borderWidth: 4, alignSelf: 'center', borderRadius: 500, borderColor: '#101010'}}>
                        <FontAwesome
                        name = 'close' size = {20} color={'#101010'}
                        />
                      </Pressable>
                  </View>
                  <View style={[styles.header, {height: '15%'}]}>
                  <View style = {{paddingVertical: 20, wdith: '100%'}}>
                  <Text style = {{ fontSize: 17, textAlign: 'center', paddingVertical: 5, marginTop: 30, color: '#303030', width: '100%', backgroundColor: '#00000019', fontFamily: 'italic'}}>FIRST FLOOR</Text>
                      
                          <FlatList
                              style = {{padding: 5}}
                              showsHorizontalScrollIndicator = {false}
                              horizontal
                              data={filterRooms("1st floor")}
                              renderItem={renderItem1}
                              keyExtractor={(item) => item._id}
                          />
                  </View>
                  </View>
                  <View style={[styles.header, {height: '15%'}]}>
                  <View style = {{paddingVertical: 20, wdith: '100%'}}>
                  <Text style = {{ fontSize: 17, textAlign: 'center', paddingVertical: 5, marginTop: 30, color: '#303030', width: '100%', backgroundColor: '#00000019', fontFamily: 'italic'}}>FIRST FLOOR</Text>
                          <FlatList
                              showsHorizontalScrollIndicator = {false}
                              horizontal
                              data={filterRooms("2nd floor")}
                              renderItem={renderItem1}
                              keyExtractor={(item) => item._id}
                          />
                      </View>
                  </View>
                  <View style={[styles.header, {height: '15%'}]}>
                  <View style = {{paddingVertical: 20, wdith: '100%'}}>
                  <Text style = {{ fontSize: 17, textAlign: 'center', paddingVertical: 5, marginTop: 30, color: '#303030', width: '100%', backgroundColor: '#00000019', fontFamily: 'italic'}}>FIRST FLOOR</Text>
                          <FlatList
                              showsHorizontalScrollIndicator = {false}
                              horizontal
                              data={filterRooms("3rd floor")}
                              renderItem={renderItem1}
                              keyExtractor={(item) => item._id}
                          />
                      </View>
                  </View>
              </View>
            )}
            </View>
            }
          </View>
        </View>
        <CloseButton
          onPress={() => navigation.goBack("ClassScreen")}
          name="arrow-back"
          color="#fff"
          size={35}
          style = {{flexDibrection: 'row', top: 25, left: 25, position: 'absolute'}}
        />
      </>
    );
};






const styles = StyleSheet.create({

  centeredView: {
    width: '100%', 
    height: '100%',
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)"
  },

  container: {
      
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
//import liraries
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text,  StatusBar, FlatList, RefreshControl, ScrollView, StyleSheet, Image, Modal, Pressable } from 'react-native';
import { useSelector } from 'react-redux';
import { CloseButton } from '../../Components/Buttons';
import { remoteDBCourses, remoteDBfacultyMember } from '../../Database/pouchDb';
import {  remoteDBOrg } from '../../Database/pouchDb';
import Maps from '../../Components/Maps';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/MaterialIcons'

// create a component
export default function CourseMapScreen ()  {

    useEffect(() => {
      OrgList();
      MemberDetails()
      },[memberdetails])
      
    const {courseData} = useSelector((store) => (store.classmodal))


    const navigation = useNavigation()
    
    const [orgdetail, setOrgDetail] = useState('');
    const [memberdetails, setMemberDetail] = useState();
    const [memberRefresh, setMemberRefresh] = useState(false);
    const [modal, setModal] = useState(false)
    
      const OrgList = async() => {
    
        var result =  await remoteDBOrg.allDocs({
            include_docs: true,
            attachments: true,
        })
        if(result.rows){
          let modifiedArr = result.rows.map(function(item) {
            return item.doc
          })
          let filteredData = modifiedArr.filter(item => {
            return item.Department === courseData.Department
          })
          if(filteredData) {
            let newFilterData = filteredData.map(item => {
              return item;
            });
            setOrgDetail(newFilterData);

            console.log(newFilterData)
    
          }
        } 
    
      }
      const MemberDetails = async() => {
    
        var result =  await remoteDBfacultyMember.allDocs({
            include_docs: true,
            attachments: true,
        })
        if(result.rows){
          let modifiedArr = result.rows.map(function(item) {
            return item.doc
          })
          let filteredData = modifiedArr.filter(item => {
            return item.Department  === courseData.Department
          })
          if(filteredData) {
            let newFilterData = filteredData.map(item => {
              return item;
            });;
            setMemberDetail(newFilterData);
            console.log(newFilterData)
    
          }
        } 
    
      }

      console.log(courseData)
    

      const RefreshList = () => {

        setMemberRefresh(true);
        OrgList();
        MemberList();
        setMemberRefresh(false);
  
    }

    const renderItem = ({item}) => {

      return (
        <View style = {{flexDibrection: 'row', padding: 15}}>
        <View style = {{flexDirection: 'column', alignItems: 'flex-start',}}>
            <Text style = {{fontSize: 20, color: '#303030', fontFamily: 'regular' }}>{item.Name}</Text>
            <Text style = {{fontSize: 20, color: '#303030', fontFamily: 'regular', position: 'absolute', right: 10 }}>{item.Title}</Text>
        </View>
        </View>
      )

    } 
    const orgItem = ({item}) => {

      return (
      <View style = {{flexDirection: 'row'}}>
          <Image
            source = {{uri: item.Image}}
            style = {{width: 70, height: 70}}
            resizeMode = 'contain'
          />
          {/* <Text style={{fontSize: 20 , padding: 20}}>President: {item.President} - {item.ContactNumber}</Text> //Must be inside modal when user taps */}
      </View>
      )

  }


    return (
        <>
        <View style = {styles.container}>
            <StatusBar
                hidden
            />
          <Maps
          id = {courseData.CourseAcronym}
          title = {courseData.Course}
          coordinate = {courseData.Coordinates}
          centerCoordinate = {[120.2307078878246, 16.032108026014853]}
          // onSelected={() => {
          //   setSelectedMarker(marker);
          //   setShowModal(true);
          // }}
          />
          
          <View style = {{width: '50%', height: '100%'}} />
            <View style = {{width: '50%', height: '100%'}} >
              <View style = {styles.header}>
                <View style = {{flexDirection: 'row', alignItems: 'center',}}>
                  <View style = {{padding: 20}}>
                    <Text style = {{fontSize: 25, marginVertical: 1, color: '#303030', fontFamily: 'extrabold'}}>{courseData.Course}</Text>
                    <Text style = {{ fontSize: 20, marginBottom: 2, color: '#303030', fontFamily: 'regular'}}>{courseData.College}</Text>
                    <Text style = {{ fontSize: 23, marginVertical: 3, color: '#303030', fontFamily: 'regular'}}>Chairperson - {courseData.ChairPerson}</Text>
                
                  </View>
          </View>
          <Pressable 
                  onPress={() => setModal(true)}
                  style = {{position: 'absolute', right: 20, bottom: 10, justifyContent: 'center',alignItems: 'center', width: 35, height: 35, borderWidth: 4, alignSelf: 'center', borderRadius: 500, borderColor: '#0f2ed6'}}>
                  <FontAwesome5
                  name = 'info' size = {20} color={'#0f2ed6'}
                  />
                  </Pressable>
              </View>
              <View style = {[styles.header, {height: 75}]}>
                <View style = {{padding: 20}}>
                <Text style = {{ fontSize: 18, marginVertical: 3, color: '#303030', fontFamily: 'regular'}}>Faculty Office: {courseData.Room}</Text>
                </View>
              </View>
           
              <View style = {[styles.header, {height: '50%'}]}>
                <View style = {{paddingVertical: 20, wdith: '100%'}}>
                <Text style = {{ fontSize: 17, textAlign: 'center', paddingVertical: 5, marginTop: 10, color: '#303030', width: '100%', backgroundColor: '#00000019', fontFamily: 'italic'}}>FACULTY MEMBERS</Text>
                  <FlatList
                  data={memberdetails}
                  renderItem = {renderItem}
                  keyExtractor = {(item) => item._id}
                  showsVerticalScrollIndicator = {false}
                  />
                </View>
              </View>
              <View style = {[styles.header, {height: 125}]}>
                <View style = {{padding: 20}}>
                  <Text style = {{ fontSize: 18, marginVertical: 5, color: '#303030', fontFamily: 'regular'}}>Organization/s under {courseData.Course}</Text>
                    <FlatList
                      data={orgdetail}
                      renderItem = {orgItem}
                      keyExtractor = {(item) => item._id}
                    />
                </View>
              </View>
            </View>
          </View>
        <Modal
          visible = {modal}
          transparent
          statusBarTranslucent
          animationType='slide'
        >
          <View style = {{width: '100%', height: '100%', backgroundColor: '#00000090', justifyContent: 'center', alignItems: 'center',}} >
            <View style = {{backgroundColor: '#fff', borderRadius: 30, width: '80%', height: '80%',justifyContent: 'center', alignItems: 'center',}}>
            <Text style = {{width: '90%', fontSize: 20, textAlign: 'center', fontFamily: 'regular', color: '#202020'}} >{courseData?.information}</Text>
            <Pressable 
              onPress={() => setModal(false)}
              style = {{position: 'absolute', top: 10, right: 10}}>
              <Icon name = 'keyboard-arrow-down' size={50} color = '#202020' />
            </Pressable>
            </View>
          </View>
        </Modal>
        <CloseButton
        onPress = {() => navigation.goBack('ClassScreen')}     
        name = 'arrow-back'
        color = '#fff'
        size = {35}
        style = {{flexDibrection: 'row', top: 25, left: 25, position: 'absolute'}}/>
      </>
    );
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
    height: 150, 
    marginTop: 15, 
    marginLeft: 15, 
    elevation: 10, 
    borderBottomLeftRadius: 15, 
    borderTopLeftRadius: 15,
  
  }

})
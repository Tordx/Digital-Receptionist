//import liraries
import { useNavigation } from '@react-navigation/native';
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, StatusBar, FlatList, RefreshControl, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { CloseButton } from '../../Components/Buttons';
import { remoteDBfacultyMember } from '../../Database/pouchDb';
import Maps from '../../Components/Maps';

export default function CourseMapScreen ()  {

    useEffect(() => {
        MemberDetails();
      },[])

    const {courseData} = useSelector((store) => (store.classmodal))
    const navigation = useNavigation()
    const [memberdetails, setMemberFaculty] = useState([]);
    const [memberRefresh, setMemberRefresh] = useState('');
    
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
            return item.CollegeAcronym  === courseData.CollegeAcronym
          })
          if(filteredData) {
            let newFilterData = filteredData.map(item => {
              return item;
            });
            setMemberFaculty(newFilterData);
    
          }
        } 
    
      }
      const RefreshList = () => {

        setMemberRefresh(true);
        MemberDetails();
        setMemberRefresh(false);
  
    }

    const renderItem = ({item}) => {

        return (
        <View style = {{flexDirection: 'row'}}>
            <Text>{item.Name} — </Text>
            <Text>{item.Title}</Text>
        </View>
        )

    }

    return (
        <>
        <View style = {{flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <StatusBar
                hidden
            />
          <Maps
          id = {courseData.CourseAcronym}
          title = {courseData.College}
          coordinate = {courseData.Coordinates}
          />
          <View style = {{width: '50%', height: '100%', justifyContent: 'center', alignItems: 'center', position: 'absolute', right: 0}} >
            <View style = {{position: 'absolute', top: 10, left: 20, width: '100%', height: '100%',}}>
              <View style = {{justifyContent: 'center',   backgroundColor: '#fff', padding: 30, borderTopLeftRadius: 20, borderBottomLeftRadius: 20, elevation: 10,}}>
                <Text style = {{fontSize: 25, fontWeight: '500' }}>
                  {courseData.College}
                </Text>
                <Text style = {{fontSize: 20, fontWeight: '300' }}>
                {courseData.Dean} — College Dean
              </Text>
              <Text style = {{fontSize: 20, fontWeight: '300' }}>
                {courseData.ChairPerson} — Chair Person
              </Text>
            </View>
            <View style = {{ marginTop: 5,justifyContent: 'center',   backgroundColor: '#fff', padding: 30, borderTopLeftRadius: 20, borderBottomLeftRadius: 20, elevation: 10}}>
                
                <Text style = {{fontSize: 20, fontWeight: '300' }}>
                {courseData.Building}
              </Text>
            </View>
            <View style = {{ marginTop: 5,justifyContent: 'center',   backgroundColor: '#fff', padding: 30, borderTopLeftRadius: 20, borderBottomLeftRadius: 20, elevation: 10}}>
                
                <Text style = {{fontSize: 16, fontWeight: '300' }}>
                Organization/s under {courseData.Course}
              </Text>
              {/* <FlatList
              data={orgdetails}
              renderItem={imageRender}
              keyExtractor={(item) => item._id}
              refreshControl = {
                <RefreshControl
                  refreshing = {memberRefresh}
                  onRefresh = {RefreshList}
                  style = {{backgroundColor: 'green'}}
                />
              }
              
            />
              */}
            </View>
            <View style = {{ marginTop: 5,justifyContent: 'center',   backgroundColor: '#fff', padding: 30, borderTopLeftRadius: 20, borderBottomLeftRadius: 20, elevation: 10}}>
            <FlatList
              data={memberdetails}
              horizontal
              renderItem={renderItem}
              keyExtractor={(item) => item._id}
              refreshControl = {
                <RefreshControl
                  refreshing = {memberRefresh}
                  onRefresh = {RefreshList}
                  style = {{backgroundColor: 'green'}}
                />
              }
              
            />
            </View>
          </View>
        </View>
        </View>
        <CloseButton
        onPress = {() => navigation.goBack('FacultyScreen')}     
        name = 'arrow-back'
        color = '#fff'
        size = {35}
        style = {{flexDibrection: 'row', top: 25, left: 25, position: 'absolute'}}/>
      </>
    );
};


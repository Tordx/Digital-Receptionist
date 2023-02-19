//import liraries
import { useNavigation } from '@react-navigation/native';
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, StatusBar, FlatList, RefreshControl, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { CloseButton } from '../../Components/Buttons';
import { remoteDBfacultyMember, remoteDBOrg } from '../../Database/pouchDb';
import Maps from '../../Components/Maps';

export default function CourseMapScreen ()  {

    useEffect(() => {
      OrgList();
      MemberList()
      },[])

    const {courseData} = useSelector((store) => (store.classmodal))
    const navigation = useNavigation()
    const [orgdetail, setOrgDetail] = useState([]);
    const [memberdetails, setMemberDetail] = useState();
    const [memberRefresh, setMemberRefresh] = useState(false);
    
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
            return item.CollegeAcronym === courseData.CollegeAcronym
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
      const MemberList = async() => {
    
        var result =  await remoteDBfacultyMember.allDocs({
            include_docs: true,
            attachments: true,
        })
        if(result.rows){
          let modifiedArr = result.rows.map(function(item) {
            return item.doc
          })
          let filteredData = modifiedArr.filter(item => {
            return item.CollegeAcronym === courseData.CollegeAcronym
          })
          if(filteredData) {
            let newFilterData = filteredData.map(item => {
              return item;
            });
            setMemberDetail(newFilterData);
            console.log(newFilterData)
    
          }
        } 
    
      }
      const RefreshList = () => {

        setMemberRefresh(true);
        OrgList();
        MemberList();
        setMemberRefresh(false);
  
    }

    const renderItem = ({item}) => {

      return (
        <View style = {{flexDibrection: 'column'}}>
        <View style = {{flexDirection: 'column', alignItems: 'flex-start',}}>
            <Text style = {{fontSize: 19, color: '#505050' }}>{item.Title}  —  {item.Name}</Text>
            
        </View>
        </View>
      )

    } 
    const orgItem = ({item}) => {

      return (
      <View style = {{flexDirection: 'row'}}>
          <Image
            source = {{uri: item.Image}}
            style = {{width: 75, height: 75}}
            resizeMode = 'contain'
          />
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
          title = {courseData.Course}
          coordinate = {courseData.Coordinates}
          />
          <View style = {{width: '50%', height: '100%', justifyContent: 'center', alignItems: 'center', position: 'absolute', right: 0}} >
            
         
            <View style = {{position: 'absolute', top: 10, left: 20, width: '100%', height: '100%',}}>
              <View style = {{justifyContent: 'center',   backgroundColor: '#fff', padding: 30, borderTopLeftRadius: 20, borderBottomLeftRadius: 20, elevation: 10,}}>
              <RefreshControl
                  refreshing = {memberRefresh}
                  onRefresh = {RefreshList}
                  style = {{backgroundColor: 'green'}}
              />
                <Text style = {{fontSize: 25, fontWeight: '500', color: '#505050'  }}>
                  {courseData.College}
                </Text>
              <Text style = {{fontSize: 20, fontWeight: '300', color: '#505050'  }}>
              <Text style = {{fontSize: 20, fontWeight: '500', color: '#505050'  }}>Chairperson </Text>— {courseData.ChairPerson} 
              </Text>
            </View>
            <View style = {{ marginTop: 5,justifyContent: 'center',   backgroundColor: '#fff', padding: 30, borderTopLeftRadius: 20, borderBottomLeftRadius: 20, elevation: 10}}>
                
                <Text style = {{fontSize: 20, fontWeight: '300', color: '#505050'  }}>
                {courseData.Building}
              </Text>
            </View>
            <View style = {{ marginTop: 5,justifyContent: 'center',   backgroundColor: '#fff', padding: 30, borderTopLeftRadius: 20, borderBottomLeftRadius: 20, elevation: 10}}>
                
                <Text style = {{fontSize: 16, fontWeight: '300', marginBottom: 10, color: '#505050'  }}>
                Organization/s under {courseData.Course}
              </Text>
              <FlatList
              
              horizontal
              data={orgdetail}
              renderItem={orgItem}
              keyExtractor={(item) => item._id}
              
            />
             
            </View>
            <View style = {{ marginTop: 5,justifyContent: 'center',   backgroundColor: '#fff', padding: 30, borderTopLeftRadius: 20, borderBottomLeftRadius: 20, elevation: 10}}>
            <Text style = {{fontSize: 16, fontWeight: '300', marginBottom: 10, color: '#505050'  }}>
                Teaching Faculty
              </Text>
            <FlatList
              data={memberdetails}
              renderItem={renderItem}
              keyExtractor={(item) => item._id}
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


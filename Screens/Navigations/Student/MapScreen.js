//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, StatusBar, FlatList, RefreshControl } from 'react-native';
import { useSelector } from 'react-redux';
import { CloseButton } from '../../../Components/Buttons';
import { remoteDfacultyMember } from '../../../Database/pouchDb';
import Maps from '../../Maps';

// create a component
export default function MapScreen ()  {

    useEffect(() => {
        MemberDetails();
      },[])

    const {facultyDatas} = useSelector((store) => (store.facultymodal))
    const [memberdetails, setMemberFaculty] = useState();
    const [memberRefresh, setMemberRefresh] = useState();
    
    
      const MemberDetails = async() => {
    
        var result =  await remoteDfacultyMember.allDocs({
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
            setMemberFaculty(newFilterData);
            console.log(newFilterData)
    
          }
        } 
    
      }

      const RefreshList = () => {

        setMemberRefresh(true);
        renderFaculty();
        setMemberRefresh(false);
  
    }

    const renderItem = ({item}) => {

        return (
        <View>
            <Text>{item.Name}</Text>
        </View>
        )

    }

    return (
        <>
        <View style = {{flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <StatusBar
                hidden
            />
          <Maps/>
          <View style = {{width: '50%', height: '100%', justifyContent: 'center', alignItems: 'center', position: 'absolute', right: 0}} >
            <View style = {{position: 'absolute', top: 10, left: 20, width: '100%', height: '100%',}}>
              <View style = {{justifyContent: 'center',   backgroundColor: '#fff', padding: 30, borderTopLeftRadius: 20, borderBottomLeftRadius: 20, elevation: 10,}}>
                <Text style = {{fontSize: 25, fontWeight: '500' }}>
                  {facultyDatas.College}
                </Text>
                <Text style = {{fontSize: 20, fontWeight: '300' }}>
                {facultyDatas.Dean} — College Dean
              </Text>
            </View>
            <View style = {{ marginTop: 5,justifyContent: 'center',   backgroundColor: '#fff', padding: 30, borderTopLeftRadius: 20, borderBottomLeftRadius: 20, elevation: 10}}>
                
                <Text style = {{fontSize: 20, fontWeight: '300' }}>
                {facultyDatas.Building}
              </Text>
            </View>
            <View style = {{ marginTop: 5,justifyContent: 'center',   backgroundColor: '#fff', padding: 30, borderTopLeftRadius: 20, borderBottomLeftRadius: 20, elevation: 10}}>
                
            <FlatList
              data={memberdetails}
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
        onPress = {() => setOpenModal(false)}     
        name = 'arrow-back'
        color = '#fff'
        size = {40}
        style = {{flexDibrection: 'row', top: 25, left: 25, position: 'absolute'}}/>
      </>
    );
};


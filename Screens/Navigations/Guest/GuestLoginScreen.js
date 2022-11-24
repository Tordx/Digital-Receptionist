import { View, Text, ImageBackground, TextInput, StyleSheet, ToastAndroid , Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { CloseButton, OpenCamera, ProceedButton } from '../../../ScreenComponents/Buttons';
import { useNavigation } from '@react-navigation/native';
import { remoteDBStudentLogin } from '../../../Database/pouchDb';
import { useDispatch } from 'react-redux';
import { Picker } from '@react-native-picker/picker';

export default function GuestLoginScreen() {


    const dispatch = useDispatch();
    const navigation = useNavigation();

    const [fullname, setFullname] = useState();
    const [address, setAddress] = useState();
    const [value, setvalue] = useState('Select');

    const [upload, setUpload] = useState(false);

    // const [compare , setCompare] = useState('')
    

    // const LoginData = async () => {

        

    //     if (studentid.length == 0) {
    //         ToastAndroid.show('Please input your Student ID', ToastAndroid.SHORT)
    //     }
    //     if (birthday.length == 0) {
    //         ToastAndroid.show('Please input your Birthdate', ToastAndroid.SHORT)
    //     }

    //     var result = await remoteDBStudentLogin.allDocs({
    //         include_docs: true,
    //         attachments: true
    //       });
    //       if(result.rows){
    //           let modifiedArr = result.rows.map(function(item){
    //           return item.doc
    //       });
    //       let filteredData = modifiedArr.filter(item => {
    //           return item.StudentBirthday === birthday
    //         });
    //         if(!filteredData.length == 0) {
    //             let newFilterData = filteredData.map(item => {
    //                 return item
    //             })

    //             dispatch(setStudentInfo(newFilterData))
    //             const Idnumber = newFilterData[0].StudentIdNumber;
    //             const Birthdate = newFilterData[0].StudentBirthday
                
    //             if((studentid == Idnumber ) && (birthday == Birthdate) ){
    //                 navigation.navigate('Student_HomeScreen')
              
    //                }else if ((studentid != Idnumber) && (birthday != Birthdate)){
                        
    //                 console.log('error')
    //                 Alert.alert('StudentID and Birthdate not match')
    //                }
    //         }
            
    //     }
       
    //   }

  return (
    <ImageBackground
    resizeMode='cover'
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
        source = {require('../../../Assets/Img/psu_cover.jpg')}
    >
        <CloseButton
        name = 'close'
        size = {50}
        color = 'black'
        style = {{margin: 20, position: 'absolute', top: 0, left: 0 }}
        onPress = {() => navigation.goBack('InitialRoutingScreen')}

        />
        <View style = {styles.container}>
            <Text style = {{fontSize: 50, bottom: 50, fontWeight: 'bold', color: '#fff'}} >GUEST LOGIN</Text>
            <Text style = {{fontSize: 25,bottom: 30,color: '#fff' }}>Before we proceed, I need few information about you</Text>
         <View style = {{marginTop: 10,}}>
        <Text style = {{fontSize: 20, color: '#fff' }}>Fullname</Text>
        <View style = {styles.loginInput}>
            <Icon/>
            <TextInput
                 onChangeText={(value) => setFullname(value)}
                //  value={studentid}
                placeholder='e.g. Juan Cruz'
                style = {{fontSize: 16, color: 'black', marginLeft: 10}}
            />
        </View>
        </View>
        <View style = {{marginTop: 10}}>
        <Text style = {{fontSize: 20, color: '#fff' }}>Address</Text>
        <View style = {styles.loginInput}>
            <Icon/>
            <TextInput
                 onChangeText={(value) => setAddress(value)}
                //  value={birthday}
                placeholder='e.g, Lingayen, Pangasinan'
                style = {{fontSize: 16, color: 'black', marginLeft: 10}}
            />
        </View>
        </View>
        <View style = {{marginTop: 10}}>
        <Text style = {{fontSize: 20, color: '#fff' }}>Purpose</Text>
        <View
                
                style = {styles.picker}>
            <Picker
                    title = 'Select Category'
                    selectedValue={value}
                    mode="dropdown"
                    style={{
                        transform: [
                           { scaleX: 1 }, 
                           { scaleY: 1 },
                        ],
                    width: 400,
                    bottom: 0,
                    color: 'black',
                    
                
                      }}
                      ViewStyleProp = {{fontSize: 20}} 
                    onValueChange={(itemValue, itemIndex) => setvalue(itemValue)}
                >
                    <Picker.Item  label="Select" value="Select" />
                    <Picker.Item label="Check Admin" value="CA" />
                    <Picker.Item label="Check Faculty" value="CF" />
                    <Picker.Item label="Suggest changes" value="SC" />
                    <Picker.Item label="Submit feedback" value="SF" />
                    <Picker.Item label="Check Events" value="CE" />
                    <Picker.Item label="Report" value="R" />
                </Picker>
                </View>
                </View>
               
        <View style = {{flexDirection: 'row', width: '25%', alignItems: 'flex-start', marginTop: 20, justifyContent: 'center'}} >
        <OpenCamera
        
        onPress ={() => setUpload(!upload)}
        name = {upload?  'done' :'photo-camera' }
        color = {upload? '#0f0' :'#fff' }

        />
        <ProceedButton
        onPress = {()=> navigation.navigate('GuestHomeScreen')}
        // onPress = {LoginData}
        style={[{backgroundColor: '#fddf54', width: '100%', borderRadius: 5, marginLeft: 5}]}
        title = 'Log In'

        />
        </View>
        </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({

    picker: {
                    
        backgroundColor: '#f2f3f7',
        height: 50,

        justifyContent: 'center',
        borderRadius: 5,
        height: 50,
        marginTop: 10,
        alignItems: 'center',
        alignContent: 'center',
        flexDirection: 'row',
        shadowColor: "#000",
        shadowOffset: {
        width: 1,
        height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 3,
    },

    container: {
        
        width: 1000, 
        height: 700, 
        backgroundColor: '#00000059',
        justifyContent: 'center', 
        alignItems: 'center', 
        borderRadius: 20,
    
    },

    loginInput: {
        backgroundColor: '#f2f3f7',
        width: 400,
        borderRadius: 5,
        height: 50,
        marginTop: 10,
        alignItems: 'center',
        alignContent: 'center',
        flexDirection: 'row',
        shadowColor: "#000",
        shadowOffset: {
	        width: 1,
	        height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 3,
    
    }

})
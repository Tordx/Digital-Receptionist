import { View, Text, ImageBackground, TextInput, StyleSheet, Image , Alert , ToastAndroid } from 'react-native'
import React, {useState} from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { CloseButton, ProceedButton } from '../../../Components/Buttons'
import { useNavigation } from '@react-navigation/native'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'
import { remoteDBSuperAdmin , remoteDBLogBook , SyncLogBook } from '../../../Database/pouchDb'
import { useDispatch } from 'react-redux'
import { setStudentInfo } from '../../../Redux/TaskReducer'
import uuid from 'react-native-uuid';

export default function AdminLoginScreen() {

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const id = uuid.v4();

    
    const [show, setShow] = useState();
    const [adminid , setAdminId] = useState('')
    const [passcode , setPasscode] = useState('')
    const log = new Date();
    const date  = log.toLocaleDateString();
    const time = log.toLocaleTimeString();

    const LoginData = async () => {

        if (adminid.length == 0) {
            ToastAndroid.show('Please input your Student ID', ToastAndroid.SHORT)
        }
        if (passcode.length == 0) {
            ToastAndroid.show('Please input your Birthdate', ToastAndroid.SHORT)
        }

        var result = await remoteDBSuperAdmin.allDocs({
            include_docs: true,
            attachments: true
          });
          if(result.rows){
              let modifiedArr = result.rows.map(function(item){
              return item.doc
          });
          let filteredData = modifiedArr.filter(item => {
              return item.AdminID === adminid
            });
            if(!filteredData.length == 0) {
                let newFilterData = filteredData.map(item => {
                    return item
                })
                const AdminID = newFilterData[0].AdminID
                const Passcode = newFilterData[0].Passcode
                try {
                    var Newlog = {
                     _id: id,
                     SuperAdminId : AdminID,
                     SuperAdminPasscode : Passcode,
                     Time: time,
                     Date: date
                    }
                    remoteDBLogBook.put(Newlog)
                    .then((response) =>{
                      console.log(response)
                    })
                    .catch(err=>console.log(err))
                    
                  } catch (error) {
                   console.log(error)
                }
                if((adminid == AdminID) && (passcode == Passcode)){
                    
                  
                    navigation.navigate('AdminHomeScreen')

                   }else{
                    ToastAndroid.show('Username and Password did not match',ToastAndroid.LONG)
                    
                   }
            }else{
                ToastAndroid.show('username and password did not match',ToastAndroid.LONG)
        
            }
            
        }
    }
    

  return (
    <View
    // resizeMode='cover'
        style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fddf54'}}
        // source = {require('../../../Assets/Img/Background_image2.png')}
    >
     
        <CloseButton
        
        name = 'close'
        size = {50}
        color = 'black'
        style = {{margin: 20, position: 'absolute', top: 0, left: 0 }}
        onPress = {() => navigation.goBack('InitialRoutingScreen')}

        />
        <View style = {styles.container}>
            <Text style = {{fontSize: 50, bottom: 50, fontWeight: 'bold',}} >ADMIN LOGIN </Text>
            <Text style = {{bottom: 30}}> Data Configuration  </Text>
         <View style = {{marginTop: 10}}>
        <Text style = {{fontSize: 20}}>Administrator ID</Text>
        <View style = {styles.loginInput}>
            <Icon/>
            <TextInput
                onChangeText={(value) => setAdminId(value)}
                value={adminid}
                placeholder='123456789'
                style = {{fontSize: 20}}
            />
        </View>
        </View>
        <View style = {{marginTop: 10}}>
        <Text style = {{fontSize: 20}}>Passcode</Text>
        <View style = {styles.loginInput}>
            
            <TextInput
                onChangeText={(value) => setPasscode(value)}
                value={passcode}
                secureTextEntry = {show}
                placeholder='********'
                style = {{fontSize: 20}}
            />
            <Pressable 
            style = {{position: 'absolute', right: 0, margin: 10}}
            onPress = {() => setShow(!show)}>
            <Icon
            
                name = {show? 'visibility' : 'visibility-off'}
                size = {30}
                color = 'grey'

            />
            </Pressable>
        </View>
        </View>
        <ProceedButton
        onPress = {LoginData}
        style={[{backgroundColor: '#fff', margin: 20, width: 400, borderRadius: 5, }]}
        title = 'Log In'

        />
        </View>
    </View>
  )
}

const styles = StyleSheet.create({

    container: {
        
        width: 1000, 
        height: 700, 
        backgroundColor: '#00000009', 
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
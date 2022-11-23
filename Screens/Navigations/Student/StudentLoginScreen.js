import { View, Text, ImageBackground, TextInput, StyleSheet, Image } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { CloseButton, ProceedButton } from '../../../ScreenComponents/Buttons'
import { useNavigation } from '@react-navigation/native'
import { remoteDBStudentLogin } from '../../../Database/pouchDb'


export default function StudentLoginScreen() {

    const [studentid , setStudentId] = useState('')
    const [birthday , setBirthday] = useState('')
    

    const LoginData = async () => {

        var result = await remoteDBStudentLogin.allDocs({
            include_docs: true,
            attachments: true
          });
          if(result.rows){
              let modifiedArr = result.rows.map(function(item){
              return item.doc
          });
          let filteredData = modifiedArr.filter(item => {
              return item.StudentIdNumber === studentid
            });
            if(filteredData) {
                let newFilterData = filteredData.map(item => {
                    return item.StudentIdNumber
                })
                // setAdminData(newFilterData)
                console.log('newFilterData')
                console.log(newFilterData)
                console.log('xxxxxxxxxxx')
            }
        }  


        // if((username.length == 0) && (password != password) ){
        //   Alert.alert('Username and password not match')
        //   console.log('iloveit')
        // }else{
        //     try {
        //       var doc = await remoteDBUser.get(username);
        //       console.log(doc)
        //       // Alert.alert("Succesfull Logging in")
        //       if(doc.Role == 'Seller'){
        //         navigation.navigate('SellerNav');
        //       }else if(doc.Role == 'Customer'){
        //         navigation.navigate('CustomerNav')
        //       }else if(doc.Role == 'Driver'){
        //         navigation.navigate('Dri')
        //       } else {console.log('DriverNav')}
             
        //     } catch (err) {
        //       console.log(err);
        //       // Alert.alert("Error Logging in")
        //     }
        // }
      }

    const navigation = useNavigation();

  return (
    <ImageBackground
    resizeMode='cover'
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
        source = {require('../../../Assets/Img/Background_image2.png')}
    >
     
        <CloseButton
        
        name = 'close'
        size = {50}
        color = 'black'
        style = {{margin: 20, position: 'absolute', top: 0, left: 0 }}
        onPress = {() => navigation.goBack('InitialLoginRouting')}

        />
        <View style = {styles.container}>
            <Text style = {{fontSize: 50, bottom: 50, fontWeight: 'bold',}} >LOGIN</Text>
            <Text style = {{bottom: 30}}> If you don't know your student ID, please use the guest login </Text>
         <View style = {{marginTop: 10}}>
        <Text style = {{fontSize: 20}}>Student ID</Text>
        <View style = {styles.loginInput}>
            <Icon/>
            <TextInput
                 onChangeText={(value) => setStudentId(value)}
                 value={studentid}
                placeholder='00-LN-0000'
                style = {{fontSize: 20}}
            />
        </View>
        </View>
        <View style = {{marginTop: 10}}>
        <Text style = {{fontSize: 20}}>Birthdate</Text>
        <View style = {styles.loginInput}>
            <Icon/>
            <TextInput
                 onChangeText={(value) => setBirthday(value)}
                 value={birthday}
                placeholder='mm/dd/yyyy'
                style = {{fontSize: 20}}
            />
        </View>
        </View>
        <ProceedButton
        onPress = {LoginData}
        style={[{backgroundColor: '#fddf54', margin: 20}]}
        title = 'Log In'

        />
        </View>
    </ImageBackground>
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
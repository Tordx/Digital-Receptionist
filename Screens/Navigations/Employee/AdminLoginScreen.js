import { View, Text, ImageBackground, TextInput, StyleSheet, Image } from 'react-native'
import React, {useState} from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { CloseButton, ProceedButton } from '../../../ScreenComponents/Buttons'
import { useNavigation } from '@react-navigation/native'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'

export default function AdminLoginScreen() {

    const navigation = useNavigation();

    const [show, setShow] = useState();

  return (
    <View
    resizeMode='cover'
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
                placeholder='123456789'
                style = {{fontSize: 20}}
            />
        </View>
        </View>
        <View style = {{marginTop: 10}}>
        <Text style = {{fontSize: 20}}>Passcode</Text>
        <View style = {styles.loginInput}>
            
            <TextInput
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
        onPress = {() => navigation.navigate('AdminHomeScreen')}
        style={[{backgroundColor: '#fff', margin: 20}]}
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
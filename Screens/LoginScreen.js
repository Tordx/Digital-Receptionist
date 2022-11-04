import React from 'react';
import { 
    
    View,
    Text, 
    StyleSheet, 
    Image,
    TextInput,
    TouchableOpacity,
    ImageBackground

} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import psu_logo from '../Assets/Img/psu_logo.png';
import psu_backgroundImage from '../Assets/Img/psu_backgroundImage.png';
import { useNavigation } from '@react-navigation/native';
import { AppName, Version, WCT, TagLine, Report } from '../Assets/constants/constants';
import {ReportButton} from '../ScreenComponents/Buttons';

export default function LoginScreen() {

    const navigation = useNavigation();

  return (
    <ImageBackground 
    resizeMode='cover'
    source = {psu_backgroundImage}   
    style = {styles.Wrapper}>
        <ReportButton/>
        <View style = {styles.EmployeeLogin}>
            <TouchableOpacity
                onPress={()=> navigation.navigate('EmployeeLogin')}
            >
                <Text>
                    Employee Login
                </Text>
            </TouchableOpacity>
            
        </View>
        <View style = {styles.VersionContainer}>
                <Text>
                    {AppName} {Version}
                </Text>
            </View>
        <View style = {styles.Login}>
            <Image
            source = {psu_logo}
            style = {styles.Image}
            />
        <Text style = {styles.Header}><Text style = {{fontWeight: 'bold' }}>{WCT}</Text> {TagLine}</Text>
        <View style = {styles.TextInput}>
            
                <Icon

                    name = 'person'
                    size= {30}
                    color = {'#d2d3d6'}
                    style = {styles.Icon}

                />
                <TextInput
                
                placeholder='Student Number'
                style = {{fontSize: 17,}}
                
                />
        </View>
        <View  style = {styles.TextInput}>
            
             <Icon

                    name = 'today'
                    size= {30}
                    color = {'#d2d3d6'}
                    style = {styles.Icon}

                />
            <TextInput
                
                placeholder='Birthdate'
                style = {{fontSize: 17,}}
                
                />
        </View>
        <TouchableOpacity
        onPress={() => navigation.navigate('Students')}
        style = {styles.Continue}
        >
            <Text style = {styles.ContinueText}>Continue</Text>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={()=> navigation.navigate('VisitorLogin')}
        style = {styles.Visitor}
        >
            <Text style = {styles.VisitorText}>VISITOR</Text>
        </TouchableOpacity>
        </View> 
    </ImageBackground>
  )
}

const styles = StyleSheet.create({

    Wrapper: {

        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',

    },

    Login: {

        alignContent: 'center',
        justifyContent: 'center',

    },

    Image: {


        width: 150,
        height: 150,
        alignSelf: 'center'

    },

    Header: {

        margin: 25,
        color: 'black',
        fontSize: 20,
        justifyContent: 'center',
        textAlign: 'center'

    },

    TextInput: {

        height: 45, 
        width: 400, 
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#e6e9fc',
        margin: 10,
        borderRadius: 15,
        flexDirection: 'row',
        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 1,
        },
        shadowOpacity: 0.27,
        shadowRadius: 2.65, 
        elevation: 2,

    },

    Icon: {

        marginLeft: 10,
        
    },

    Continue: {

        marginTop: 15,
        width: 150,
        height: 45,
        backgroundColor: '#fddf54',
        alignSelf: 'center',
        borderRadius: 20,
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.41,
        elevation: 2,

    },

    ContinueText: {
        
        textAlign: 'center', 
        color: '#0f2ed6', 
        fontSize: 20
    
    },

    Visitor: {

        marginTop: 30,
        width: 300,
        height: 60,
        backgroundColor: '#0f2ed6',
        alignSelf: 'center',
        borderRadius: 21,
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.41,
        elevation: 2,

    },

    VisitorText: {
        
        textAlign: 'center', 
        color: 'white', 
        fontSize: 28, 
        fontWeight: '500', 
        fontStyle: 'italic'
    
    },


    EmployeeLogin: {

        position: 'absolute', 
        right: 0, 
        bottom: 0, 
        margin: 15,

    },

    VersionContainer: {
        
        position: 'absolute', 
        left: 0, 
        bottom: 0, 
        margin: 15,
    
    },

    

})
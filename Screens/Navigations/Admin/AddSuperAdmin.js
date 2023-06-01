import { 
    
    View,
    Text, 
    StyleSheet,
    Pressable,
    ScrollView,
    TouchableOpacity,
    Alert,

} from 'react-native';
import React , {useState , useEffect} from 'react'
import {TextInput} from 'react-native-paper'; 
import { Modal_apsg } from '../Components/Modalapsg';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {remoteAdminActivities , SyncSuperAdmin , remoteDBSuperAdmin} from '../../../Database/pouchDb'
import { useSelector } from 'react-redux';
import { Picker } from '@react-native-picker/picker';
import { CloseButton } from '../../../Components/Buttons';
import { useNavigation } from '@react-navigation/native';
import uuid from 'react-native-uuid';
import { CustomInput } from './AddEventScreen';

export default function AddSuperAdmin() {

  useEffect(() => {
   
  }, []);

    const {adminLoginInfo} = useSelector((store) => store.adminmodal)
    const navigation = useNavigation('');

    const [adminid, setAdminId] = useState('');
    const [passcode, setPasscode] = useState('');
    const log = new Date();
    const date  = log.toLocaleDateString();
    const time = log.toLocaleTimeString();
    const localDate = new Date();
    const utcDate = new Date(localDate.getTime() - (localDate.getTimezoneOffset() * 60000));
    const timestamp = utcDate.toISOString();

    const AddNewSuperAdmin =  () => {
        
      adminid === '' ? Alert.alert('Please Enter SuperAdmin ID') : 
      (passcode === '' ? Alert.alert('Please Enter Passcode') : 
      setNewSuperAdmin())
  }

     const setNewSuperAdmin = async () => {
      
      navigation.navigate('AdminHomeScreen')
      const id = uuid.v4();

        if(1+1 == 3){
          console.log('hey')
        }
        // if((classname.length == 0) && (subject.length == 0) ) {
        //   console.log('ilove')}
       else{
         try {
           var NewSuperAdmin = {
            _id: id,
             SuperAdminId : adminid,
             SuperAdminPasscode : passcode,
           }

           const adminactivity = {
            _id: id ,
            idofadmin : adminLoginInfo._id,
            Activity: "Added or Edit Faculty Data",
            timestamp : timestamp,
            Time: time,
            Date: date
          }
    
          await remoteAdminActivities
            .put(adminactivity)
            .then((response) => {
            })

          await remoteDBSuperAdmin.put(NewSuperAdmin)
           .then((response) =>{
             Alert.alert('Your Super Admin is Added has been successfully added!')
             navigation.navigate('AdminHomeScreen')
           })
           .catch(err=>console.log(err))
           
         } catch (error) {
          console.log(error)
         }
         }
        }


  return (
    
    <View style={styles.container}>
        <ScrollView>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <CloseButton
                    onPress = {() => navigation.navigate('AdminHomeScreen')}
                    name = 'arrow-back'
                    size = {50}
                    color = '#202020'
                    style = {{flexDirection: 'row', top: 0, left: 0, position: 'absolute', marginVertical: 27, marginHorizontal: 20}}
        />
            <Text
            style = {{fontSize: 50, fontFamily: 'black', marginTop: 20, color: '#303030'}}> 
            ADMINISTRATOR </Text>
        </View>
        
        <Text style = {{textAlign: 'center', color: '#202020', fontSize: 17, fontFamily: 'regular', marginTop: 20}} >access database to remove an admin</Text>   
            <CustomInput
              onChangeText={(value) => setAdminId(value)}
              value={adminid}
              title="Admin ID"
              placeholder="johndoe1234567"
                  
            />
            <CustomInput
              onChangeText={(value) => setPasscode(value)}
              value={passcode}
              title="Passcode"
              placeholder="passcode123456"
              
                />
             </ScrollView>
             
           
             <TouchableOpacity
                onPress={AddNewSuperAdmin}
                style = {[styles.nextbutton, {bottom: 0, position: 'absolute'}]}>
                <Text style = {{textAlign: 'center', color: '#fddf54', fontSize: 20, fontWeight: 'bold'}} >ADD AN ADMINISTRATOR</Text>
             </TouchableOpacity> 
    </View>

  )
}

const styles = StyleSheet.create({

    nextbutton: {
              
      backgroundColor: '#0f2ed6',
      width: '100%',
      height: 75,
      justifyContent: 'center',
      alignItems: 'center',
      borderRightWidth: 1,
      bottom: 0,
      position: 'absolute'
    
    },
    
    TextInput: {

        margin: 25,
        width: 400,
        height: 40  ,
        borderRadius: 10,
        backgroundColor: 'red',
        alignSelf: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: '#fddf54',
    },
    
})
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
import {localDBAdmin , SyncAdmin} from '../../../Database/pouchDb'
import { useSelector } from 'react-redux';
import { Picker } from '@react-native-picker/picker';
import { CloseButton } from '../../../ScreenComponents/Buttons';
import { useNavigation } from '@react-navigation/native';
import uuid from 'react-native-uuid';

export default function AddFacultyScreen() {

  useEffect(() => {
   
  }, []);

  
    const navigation = useNavigation('');

    const [adminname, setAdminName] = useState('');
    const [adminbuilding, setAdminBuilding] = useState('');
    const [adminpresident, setAdminPresident] = useState('');
    const [adminvicepresident, setAdminVicePresident] = useState('');
    const [adminmembers, setAdminMembers] = useState('');
    // const [admincode, setAdminCode] = useState('');
    // const [preptime, setPreptime] = useState('');
    // const [deliveryfee, setDeliveryfee] = useState('');
    // const [place, setPlace] = useState('');
    // const [status , setStatus] = useState('')

     const setNewAdmin = async () => {
       
        const id = uuid.v4();

        if(1+1 == 3){
          console.log('hey')
        }
        // if((classname.length == 0) && (subject.length == 0) ) {
        //   console.log('ilove')}
       else{
         try {
           var NewAdmin = {
            _id: id,
             AdminName : adminname,
             AdminBuilding : adminbuilding,
             AdminPresident: adminpresident,
             AdminVicePresident : adminvicepresident,
             AdminMembers : adminmembers,
            //  place: place,
            //  Price : price,
            //  Preptime : preptime,
            //  Deliveryfee : deliveryfee,
            //  Status: status,
            //  Image: Images
           }
        //    console.log(Images)
        //    console.log('Images')
        localDBAdmin.put(NewAdmin)
           .then((response) =>{
             Alert.alert('Your Schedule has been successfully added!')
             console.log(response)
             SyncAdmin()
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
                    style = {{flexDirection: 'row', top: 0, left: 0, position: 'absolute', marginVertical: 27, marginHorizontal: 20}}
        />
            <Text
            style = {{fontSize: 20, fontWeight: 'bold', marginTop: 20, color: 'blue'}}> 
            Add Admin </Text>
        </View>
        <View style = {styles.TextInput}>
              <View
                    style = {{
                    alignContent: 'center',
                    justifyContent: 'center',
                    margin: 5,
                  }}
        
                    >
            
                </View>
                <TextInput
                    onChangeText={(value) => setAdminName(value)}
                   value={adminname}
                   label="Admin Name"
                    theme={{    
                        colors: {
                          primary: '#225'
                        }
                      }}

                />
                </View>
                <View style = {styles.TextInput}>
                  <View
                    style = {{
                    alignContent: 'center',
                    justifyContent: 'center',
                    margin: 5,
                  }}
        
                    >
                </View>
                <TextInput
                onChangeText={(value) => setAdminBuilding(value)}
                value={adminbuilding}
                mode ='Outlined'
                multiline
                label='Admin Building'
                theme={{    
                    colors: {
                      primary: '#225'
                    }
                  }}
              
                />
                </View>
                <View style = {styles.TextInput}>
                  <View
                    style = {{
                    alignContent: 'center',
                    justifyContent: 'center',
                    margin: 5,
                  }}
        
                    >
                </View>
                <TextInput
                onChangeText={(value) => setAdminPresident(value)}
                value={adminpresident}
                mode ='Outlined'
                multiline
                label='Admin President'
                theme={{    
                    colors: {
                      primary: '#225'
                    }
                  }}
              
                />
                </View>
                <View style = {styles.TextInput}>
                  <View
                    style = {{
                    alignContent: 'center',
                    justifyContent: 'center',
                    margin: 5,
                  }}
        
                    >
                </View>
                <TextInput
                onChangeText={(value) => setAdminVicePresident(value)}
                value={adminvicepresident}
                mode ='Outlined'
                multiline
                label='Admin Vice President'
                theme={{    
                    colors: {
                      primary: '#225'
                    }
                  }}
              
                />
                </View>
                <View style = {styles.TextInput}>
              <View
                    style = {{
                    alignContent: 'center',
                    justifyContent: 'center',
                    margin: 5,
                  }}
        
                    >
            
                </View>
                <TextInput
                    onChangeText={(value) => setAdminMembers(value)}
                   value={adminmembers}
                   label="Admin Members"
                    theme={{    
                        colors: {
                          primary: '#225'
                        }
                      }}

                />
                </View>
               
             </ScrollView>  
                <Pressable
                        style = {{
                            justifyContent: 'center',
                            alignSelf: 'center',
                            height: 50,
                            width: 500,
                            backgroundColor: '#225',
                            borderRadius: 20,
                            position: 'absolute',
                            bottom: 100,
                        }}
                        onPress={setNewAdmin}
                        >
                            <Text
                            
                            style = {{color: 'white', fontWeight: '900', textAlign: 'center'}}
                            >  ADD ADMIN </Text>
              </Pressable>   
    </View>

  )
}

const styles = StyleSheet.create({
    
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
        backgroundColor: '#e2e2e2',
    },
    
})
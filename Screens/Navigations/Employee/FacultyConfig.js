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
import {localDBFaculty , remoteDBSchedules , SyncFaculty} from '../../../Database/pouchDb'
import { useSelector } from 'react-redux';
import { Picker } from '@react-native-picker/picker';
import { CloseButton } from '../../../ScreenComponents/Buttons';
import { useNavigation } from '@react-navigation/native';

export default function FacultyConfig() {

useEffect(() => {
 
}, []);


  const navigation = useNavigation('');

  const [facultyname, setFacultysName] = useState('');
  const [facultybuilding, setFacultyBuilding] = useState('');
  const [facultypresident, setFacultyPresident] = useState('');
  const [facultyvicepresident, setFacultyVicePresident] = useState('');
  const [facultymembers, setFacultyMembers] = useState('');
  const [facultycode, setFacultyCode] = useState('');
  // const [preptime, setPreptime] = useState('');
  // const [deliveryfee, setDeliveryfee] = useState('');
  // const [place, setPlace] = useState('');
  // const [status , setStatus] = useState('')

   const setNewSchedule = async () => {
      if(1+1 == 3){
        console.log('hey')
      }
      // if((classname.length == 0) && (subject.length == 0) ) {
      //   console.log('ilove')}
     else{
       try {
         var NewFaculty = {
          _id: facultycode,
           Facultyname : facultyname,
           FacultyBuilding : facultybuilding,
           FacultyPresident: facultypresident,
           FacultyVicePresident : facultyvicepresident,
           FacultyMembers : facultymembers,
          //  place: place,
          //  Price : price,
          //  Preptime : preptime,
          //  Deliveryfee : deliveryfee,
          //  Status: status,
          //  Image: Images
         }
      //    console.log(Images)
      //    console.log('Images')
      localDBFaculty.put(NewFaculty)
         .then((response) =>{
           Alert.alert('Your Schedule has been successfully added!')
           console.log(response)
           SyncFaculty()
           navigation.navigate('FacultyScreen')
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
          Add Class </Text>
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
                  onChangeText={(value) => setFacultyCode(value)}
                 value={facultycode}
                 label="Faculty Code"
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
                  onChangeText={(value) => setFacultysName(value)}
                 value={facultyname}
                 label="Faculty Name"
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
              onChangeText={(value) => setFacultyBuilding(value)}
              value={facultybuilding}
              mode ='Outlined'
              multiline
              label='Faculty Building'
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
              onChangeText={(value) => setFacultyPresident(value)}
              value={facultypresident}
              mode ='Outlined'
              multiline
              label='Faculty President'
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
              onChangeText={(value) => setFacultyVicePresident(value)}
              value={facultyvicepresident}
              mode ='Outlined'
              multiline
              label='Faculty Vice President'
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
                  onChangeText={(value) => setFacultyMembers(value)}
                 value={facultymembers}
                 label="Faculty Members"
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
                      onPress={setNewSchedule}
                      >
                          <Text
                          
                          style = {{color: 'white', fontWeight: '900', textAlign: 'center'}}
                          >  ADD CLASS </Text>
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
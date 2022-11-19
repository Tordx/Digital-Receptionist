import { 
    
    View,
    Text, 
    StyleSheet,
    Pressable,
    ScrollView,
    TouchableOpacity,
    Alert,

} from 'react-native';
import React , {useState} from 'react'
import {TextInput} from 'react-native-paper'; 
import { Modal_apsg } from '../Components/Modalapsg';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {localDBSchedules} from '../../../Database/pouchDb'
import { useSelector } from 'react-redux';
import { Picker } from '@react-native-picker/picker';

export default function AddClassScreen() {

    const [classname, setClassName] = useState('');
    const [subject, setSubject] = useState('');
    const [time, setTime] = useState('');
    const [room, setRoom] = useState('');
    const [classcode, setClassCode] = useState('');
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
           var NewSchedule = {
            _id: classcode,
             Classname : classname,
             Subject : subject,
             Time: time,
             Room : room,
            //  place: place,
            //  Price : price,
            //  Preptime : preptime,
            //  Deliveryfee : deliveryfee,
            //  Status: status,
            //  Image: Images
           }
        //    console.log(Images)
        //    console.log('Images')
        localDBSchedules.put(NewSchedule)
           .then((response) =>{
             Alert.alert('Your Schedule has been successfully added!')
             console.log(response)
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
                    onChangeText={(value) => setClassCode(value)}
                   value={classcode}
                   label="Class Code"
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
                    onChangeText={(value) => setClassName(value)}
                   value={classname}
                   label="Class name"
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
                onChangeText={(value) => setSubject(value)}
                value={subject}
                mode ='Outlined'
                multiline
                label='Subject'
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
                onChangeText={(value) => setTime(value)}
                value={time}
                mode ='Outlined'
                multiline
                label='Time'
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
                onChangeText={(value) => setRoom(value)}
                value={room}
                mode ='Outlined'
                multiline
                label='Room'
                theme={{    
                    colors: {
                      primary: '#225'
                    }
                  }}
              
                />
                </View>
                <Pressable
            style = {{
                justifyContent: 'center',
                alignSelf: 'center',
                height: 50,
                width: 500,
                backgroundColor: '#225',
                borderRadius: 20,
                position: 'absolute',
                bottom: 0,
            }}
            onPress={setNewSchedule}
            >
                <Text
                
                style = {{color: 'white', fontWeight: '900', textAlign: 'center'}}
                >  ADD CLASS </Text>
            </Pressable>
     </ScrollView>     
    </View>
  )
}

const styles = StyleSheet.create({
    
    TextInput: {

        margin: 25,
        width: 400,
        height: 40  ,
        borderRadius: 20,
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
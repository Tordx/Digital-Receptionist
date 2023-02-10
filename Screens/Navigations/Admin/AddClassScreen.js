import { 
    
    View,
    Text, 
    StyleSheet,
    TouchableOpacity,
    Alert,
    TextInput,
    ImageBackground,

} from 'react-native';
import React , {useState , useEffect} from 'react'
import { Modal_apsg } from '../Components/Modalapsg';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {localDBSchedules , remoteDBSchedules , SyncSchedules} from '../../../Database/pouchDb'
import { useSelector } from 'react-redux';
import { Picker } from '@react-native-picker/picker';
import { AddButton, CloseButton, ProceedButton } from '../../../Components/Buttons';
import { useNavigation } from '@react-navigation/native';
import uuid from 'react-native-uuid';
import { FlatList } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { setClassData } from '../../../Redux/ClassSlice';

const CustomInput = (props) => {

  return (
  <View style = {{marginTop: 10, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
    <View  style = {{width: '80%'}}>
    <Text style = {{color: '#000', fontWeight: '500',fontSize: 20, textAlign: 'left', justifyContent: 'flex-start', alignSelf: 'flex-start', width: '50%'}}>{props.title}</Text>
    </View>
    <View style  = {styles.TextInput} >
      <View style = {{marginLeft: 5}}>
      <TextInput
        placeholder= {props.placeholder}
        onChangeText={props.onChangeText}
        value={props.value}
        style = {props.inputstyle}
      />
      </View>
    </View>
  </View>
  )
}

export default function AddClassScreen() {

  useEffect(() => {
    addclassdata()
  }, []);

    const dispatch = useDispatch()
    const navigation = useNavigation('');
    const {classData} = useSelector((store) => store.classmodal)

    const [classname, setClassName] = useState();
    const [subject, setSubject] = useState('');
    const [time, setTime] = useState('');
    const [room, setRoom] = useState('');
    const [allclass, setAllCllass] = useState();
    // const [classcode, setClassCode] = useState('');
    // const [preptime, setPreptime] = useState('');
    // const [deliveryfee, setDeliveryfee] = useState('');
    // const [place, setPlace] = useState('');
    // const [status , setStatus] = useState('')

    const AddNewSchedule =  () => {
        
      classname === '' ? Alert.alert('Please Enter Class Name') : 
      (subject === '' ? Alert.alert('Please Enter Subject') : 
      time === '' ? Alert.alert('Please Enter Time') :
      room === '' ? Alert.alert('Please Enter Class Room') :
      setNewSchedule())
  }

     const setNewSchedule = async () => {

      navigation.navigate('AdminHomeScreen')
      const id = uuid.v4();
      
        if(1+1 == 3){
          console.log('hey')
        }
        // if((classname.length == 0) && (subject.length == 0) ) {
        //   console.log('ilove')}
       else{
         try {
           var NewSchedule = {
            _id: id,
             Classname : classname,
             Subject : subject,
             StartTime: time,
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
             SyncSchedules()
             navigation.navigate('AdminHomeScreen')
           })
           .catch(err=>console.log(err))
           
         } catch (error) {
          console.log(error)
         }
         }
        }

        const addclassdata = async() => {

          var result = await remoteDBSchedules.allDocs({
            include_docs: true,
            attachments: true
          });
          if(result.rows){
              let modifiedArr = result.rows.map(function(item){
              return item.doc
          });
          setAllCllass(modifiedArr)
        }
      }

      const renderItem = ({ item }) => {

        return(
          <TouchableOpacity 
          onPress={() => {
          dispatch(setClassData(item))
          }}
           >
            
            <View style = {styles.item}>
              <Text style = {styles.title}>
                {item.Classname}
              </Text>
            </View>
         </TouchableOpacity>
        )
    }

       


  return (
    
    <View style={styles.container}>
      <View style={styles.contentcontainer}>
        <View style={[styles.inputcontainer, {backgroundColor: '#fddf54'}]}>
          <ImageBackground
            style = {{justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%'}} 
            resizeMode = 'cover'
            source = {require('../../../Assets/Img/class-image.png')}>
            <Text
            style = {{fontSize: 30, fontWeight: 'bold', marginTop: 20,}}> 
            Add Class </Text>
       
       
              <CustomInput
                onChangeText={(value) => setClassName(value)}
                value={classname}
                placeholder = 'e.g. IV BSCS A'
                title = 'Class Name'
              />
              
              <CustomInput
                onChangeText={(value) => setSubject(value)}
                value={subject}
                placeholder = 'e.g. Introduction to Programming'
                title = 'Subject'

              />
              <CustomInput

                onChangeText={(value) => setTime(value)}
                value={time}
                placeholder = 'e.g. 07:00 AM'
                title = 'Class Time'

              />
                
                <CustomInput
                onChangeText={(value) => setRoom(value)}
                value={room}
                placeholder = 'CS Room 5'
                title = 'Class Room'
                />
                

                <TouchableOpacity
                  onPress={AddNewSchedule}
                  style = {[styles.nextbutton, {bottom: 0, position: 'absolute'}]}>
                  <Text style = {{textAlign: 'center', color: '#fddf54', fontSize: 20, fontWeight: 'bold'}} >ADD CLASS</Text>
                </TouchableOpacity>
     </ImageBackground>
     </View>
      <View style={styles.eventcontainer}>
        <View>
          <FlatList
          renderItem={renderItem}
          data={allclass}
          keyExtractor={item => item.id}
          numColumns={2}
          />     
        </View>
          
      </View>
      </View>
            <CloseButton
                    onPress = {() => navigation.goBack('AdminHomeScreen')}
                    name = 'arrow-back'
                    color = '#000'
                    size = {35}
                    style = {{flexDirection: 'row', top: 0, left: 0, position: 'absolute', marginVertical: 27, marginHorizontal: 20}}
        />
    </View>

  )
}

const styles = StyleSheet.create({

  nextbutton: {
    
    backgroundColor: '#0f2ed6',
    width: '100.5%',
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
    position: 'absolute'

  },
  title: {

    fontSize: 32,

  },

  inputcontainer:{
    
    justifyContent: 'center', 
    alignItems: 'center', 
    width: '50%',
    height: '100%',
  
  },

    eventcontainer: {
    
      alignItems: 'center', 
      justifyContent: 'center', 
      width: '50%'
  
    },
    
    TextInput: {

      backgroundColor: '#f2f3f7',
      width: '80%',
      borderRadius: 5,
      height: 50,
      marginTop: 10,
      alignItems: 'center',
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

    contentcontainer: {
    
      justifyContent: 'center', 
      alignItems: 'center', 
      width: '100%',
      height: '100%',
      flexDirection: 'row'
    
    },

    item: {

      justifyContent: 'center',
      alignself: 'center',
      backgroundColor: '#fff',
      padding: 30,
      width: 250,
      height: 200,
      borderRadius: 10,
      marginVertical: 8,
      marginHorizontal: 16,
      shadowColor: "#000",
      shadowOffset: {
        width: 1,
        height: 2,
      },
      shadowOpacity: 1,
      shadowRadius: 3.41,
      elevation: 5,

  },

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f2f3f7',
    },
    
})
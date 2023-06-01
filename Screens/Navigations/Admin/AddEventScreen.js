import { 
    
    View,
    Text, 
    StyleSheet,
    Pressable,
    ScrollView,
    TouchableOpacity,
    Alert,
    Image,
    TextInput,
    ImageBackground,
    FlatList,
    ActivityIndicator

} from 'react-native';
import React , {useState , useEffect , useMemo} from 'react'; 
import { Modal_apsg } from '../Components/Modalapsg';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {localDBEvent , remoteDBEvent, SyncEvent , remoteAdminActivities} from '../../../Database/pouchDb'
import { CloseButton } from '../../../Components/Buttons';
import { useNavigation } from '@react-navigation/native';
import uuid from 'react-native-uuid';
import { launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import { useDispatch } from 'react-redux';
import { setImages } from '../../../Redux/TaskReducer';;
import { useSelector } from 'react-redux';

export const CustomInput = (props) => {

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

export default function AddEventScreen() {

  useEffect(() => {
    eventdatas()
  }, [dataforEvent]);
  
    const {adminLoginInfo} = useSelector((store) => store.adminmodal)
    const navigation = useNavigation('');
    const dispatch = useDispatch()

    const [next, setNext] = useState(true);
    const [eventname, setEventName] = useState('');
    const [eventtagline, setEventTagline] = useState('');
    const [eventwhen, setEventWhen] = useState('');
    const [eventwhere, setEventWhere] = useState('');
    const [eventdescription, setEventDescription] = useState('');
    const [status, setStatus] = useState('');
    const [ID, setID] = useState(null)
    const [rev, setRev] = useState()
    const [image, setImage] = useState('https://cdn.iconscout.com/icon/free/png-256/gallery-44-267592.png');
    const [transferred, setTransferred] = useState(0);
    const [dataforEvent, setDataForEvent] = useState('');
    const [cancelEdit, setCancelEdit] = useState(true);
    const [inactive, setInactive] = useState('Inactive');
    const [deleteState, setDeleteState] = useState(false);
    const id = uuid.v4()
    const log = new Date();
    const date  = log.toLocaleDateString();
    const time = log.toLocaleTimeString();
    const localDate = new Date();
    const utcDate = new Date(localDate.getTime() - (localDate.getTimezoneOffset() * 60000));
    const timestamp = utcDate.toISOString();


    const AddNewEvent =  () => {
        
      if (eventname.length === 0) {
        Alert.alert('Please Enter Event Name') 
        } else if (eventtagline.length === 0) {
            Alert.alert('Please Enter Event Tagline') 
          } else if (eventwhen.length === 0) {
              Alert.alert('Please Enter Whene is the Event ') 
            } else if (eventwhere.length === 0) {
                Alert.alert('Please Enter Where is Event ') 
              } else {
                setNext(false)
                }
     
  }
    const OpenGallery = async() => {
  
      launchImageLibrary({cameraType: 'front' , maxHeight: 300 , maxWidth: 300 ,  mediaType: 'photo'}, response => {
        
        console.log(response)
  
      }).then(image => {
        console.log(image.assets[0].uri)
        console.log('photo uri generated')
        setImage(image.assets[0].uri)
        dispatch(setImages(image.assets[0].uri))
      });
  
  }

     const setNewEvent = async () => {
      const uri = image;
      const filename = uri.substring(uri.lastIndexOf('/') + 1);
      const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
      setTransferred(0);
      const task = storage().ref(filename).putFile(uploadUri);
      // set progress state
      task.on('state_changed', (snapshot) => {
        setTransferred(
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 10000)
        );
      });
      try {
        await task;
      } catch (e) {
        console.error(e);
      }
      Alert.alert('Successfully added Photo!');
      setImage(null);
      const url = await storage().ref(filename).getDownloadURL();
    
      if (image === 'https://cdn-icons-png.flaticon.com/512/1160/1160358.png') {
        Alert.alert('Please Add Image');
      } else {
        try {
          const newEvent = {
            _id: ID === null ? id : ID,
            _rev: rev === null ? undefined : rev,
            EventName : eventname,
            EventTagline : eventtagline,
            EventWhen: eventwhen,
            EventWhere : eventwhere,
            EventDescription : eventdescription,
            EventImage : url,
            Status: "Active"
          };

          const adminactivity = {
            _id: id ,
            idofadmin : adminLoginInfo._id,
            Activity: "Added or Edit Event Data",
            timestamp : timestamp,
            Time: time,
            Date: date
          }
    
          await remoteAdminActivities
            .put(adminactivity)
            .then((response) => {
            })
    
          await remoteDBEvent
            .put(newEvent)
            .then((response) => {
              Alert.alert('Your Event has been successfully added!')
              navigation.navigate('AdminHomeScreen');
              // SyncAdmin();
            })
            .catch((err) => console.log(err));
        } catch (error) {
          console.log(error);
        }
      }
    };

      const deleteData = () => {

        try {
          const newEvent = {
            _id: ID === null ? id : ID,
            _rev: rev === null ? undefined : rev,
            EventName : eventname,
            EventTagline : eventtagline,
            EventWhen: eventwhen.toString(),
            EventWhere : eventwhere,
            EventDescription : eventdescription,
            EventImage : image,
            Status: 'Inactive'
          };
    
          remoteDBEvent
            .put(newEvent)
            .then((response) => {
              navigation.navigate('AddEventScreen');
              Alert.alert('Done');
              SyncEvent()
            })
            .catch((err) => console.log(err));
        } catch (error) {
          console.log(error);
        }

      }

      const eventdatas = async() => {

          var result = await remoteDBEvent.allDocs({
            include_docs: true,
            attachments: true,
          });
          if (result.rows) {
            let modifiedArr = result.rows.map(function (item) {
              return item.doc;
            });
            let filteredData = modifiedArr.filter((item) => {
              return item.Status  == 'Active'
            })
            if (filteredData){
              let newFilterData = filteredData.filter((item) => {
                return item
              })
              
            setDataForEvent(newFilterData)
            }
            console.log('modifiedArr')
            console.log(modifiedArr)
            console.log('modifiedArr')
      
          }
      }
      const renderItem = ({ item }) => {
        return(
          <View style = {{flex: 1, justifyContent: 'flex-start', alignContent: 'center', flexDirection: 'row', height: 100 }}>
            <View style = {{borderBottomWidth: 1, width: '100%', flexDirection: 'row',  alignItems: 'center',}}>
              <TouchableOpacity 
                onPress={() => {
                  setID(item._id)
                  setRev(item._rev)
                  setEventName(item.EventName)
                  setEventTagline(item.EventTagline)
                  setEventWhen(item.EventWhen)
                  setEventWhere(item.EventWhere)
                  setEventDescription(item.EventDescription)
                  setImage(item.Image)
                  setStatus(item.Status)
                  setCancelEdit(false) 
                  setDeleteState(true)
                }}
                style = {{paddingLeft: 20}}
              >
                <Icon

                  name =  'edit'
                  size = {27}
                  color = 'black'
                  
                />
          </TouchableOpacity>
          
            <Text style = {{fontSize: 25 , padding: 10, textAlign: 'left'}}>
              {item.EventName}
            </Text>
            </View>
            
          </View>
        )
        }
        
           

  return (
    
    <View style={styles.container}>
      <View style={styles.contentcontainer}>
        
      
        {next? 
          <View style={[styles.inputcontainer, {backgroundColor: '#fddf54'}]}>
            <ImageBackground
          style = {{justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', borderRightWidth: 1}} 
          resizeMode = 'cover'
          source = {require('../../../Assets/Img/announcement-image.png')}>
            <Text style = {{fontSize: 30, fontWeight: 'bold', marginTop: 20, color: '#0f2ed6'}}> ADD EVENT</Text>
                <CustomInput
                  onChangeText={(value) => setEventName(value)}
                   value={eventname}
                   title = 'Event Name'
                   placeholder="e.g. Year-end Party 2022"
                />
                <CustomInput
                  onChangeText={(value) => setEventTagline(value)}
                  value={eventtagline}
                  multiline
                  title='Event Tagline'
                  placeholder="e.g. guidelines and other info"
              
                />
                <CustomInput
                  onChangeText={(value) => setEventWhen(value)}
                  value={eventwhen}
                  multiline
                  title = 'Event Date'
                  placeholder='The Event will be held on'
              
                />
                <CustomInput
                  onChangeText={(value) => setEventWhere(value)}
                  value={eventwhere}
                  multiline
                  title = 'Event Place'
                  placeholder='The Event will be held at'
                />
                 <CustomInput
                  onChangeText={(value) => setEventDescription(value)}
                  value={eventdescription}
                  multiline
                  title = 'Event Description'
                  placeholder='Full Description'
                />
               <TouchableOpacity
                onPress={AddNewEvent}
                style = {styles.nextbutton}>
                  <Text style = {{textAlign: 'center', color: '#fddf54', fontSize: 20, fontWeight: 'bold'}} >NEXT</Text>
                </TouchableOpacity>
                </ImageBackground>
              </View>
        :     
          <View style = {[styles.inputcontainer, {backgroundColor: '#fddf54'}]}>
              <ImageBackground
                  resizeMode="cover" style={styles.imagecontainer} source={{uri: image}}>
                <Pressable
                  style = {styles.imagebutton} 
                  onPress = {OpenGallery}>
                  <Icon
                    name={image === 'https://cdn.iconscout.com/icon/free/png-256/gallery-44-267592.png' ? null : 'done'}
                    size={100}
                    color = {image === 'https://cdn.iconscout.com/icon/free/png-256/gallery-44-267592.png' ? '#fff' : '#2ade2a'}
                  />
                </Pressable>
              </ImageBackground>
                <TouchableOpacity
                  onPress={setNewEvent}
                  style = {[styles.nextbutton, {bottom: 0, position: 'absolute'}]}>
                  <Text style = {{textAlign: 'center', color: '#fddf54', fontSize: 20, fontWeight: 'bold'}} >ADD EVENT</Text>
                </TouchableOpacity>
                
          </View>
        }
          <View style={styles.eventcontainer}>
            {dataforEvent?  
            <FlatList
              data={dataforEvent}
              renderItem={renderItem}
              keyExtractor={item => item._id}
            /> : <ActivityIndicator size={'large'} color = 'blue'/>}
               
          </View>
      </View>
        <TouchableOpacity 
          onPress={() => {
            setEventName('')
            setEventTagline('')
            setEventWhen('')
            setEventWhere('')
            setEventDescription('')
            setImage('')
            setCancelEdit(true)
            setDeleteState(false)
          }}
                style = {{position: 'absolute',}}
              >
                <Icon
                  name =  {eventname === '' ? null : 'cancel'}
                  size = {50}
                  color = 'red'
                  
                />
          </TouchableOpacity> 
      <CloseButton
          onPress = {() => navigation.navigate('AdminHomeScreen')}
          name = 'arrow-back'
          size = {35}
          color = '#000'
          style = {{flexDirection: 'row', top: 0, left: 0, position: 'absolute', marginVertical: 27, marginHorizontal: 20}}
      />
      
      {deleteState? <TouchableOpacity 
        style = {{position: 'absolute', bottom: 20, right: 20}}
        onPress = {deleteData}
        >
          <Icon
            name = 'delete'
            size = {50}
            color = 'red'
          />
      </TouchableOpacity> : null}
    </View>

  )
}

const styles = StyleSheet.create({

  eventcontainer: {
    
    alignItems: 'center', 
    justifyContent: 'center', 
    width: '50%'
  
  },

  imagecontainer: {
    
    borderRadius: 20,
    width: 500, 
    height: 500, 
    justifyContent: 'center', 
    alignItems: 'center',
  
  },

  inputcontainer:{
    
    justifyContent: 'center', 
    alignItems: 'center', 
    width: '50%',
    height: '100%',
  
  },

  contentcontainer: {
    
    justifyContent: 'center', 
    alignItems: 'center', 
    width: '100%',
    height: '100%',
    flexDirection: 'row'
  
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

  imagebutton: {

    width: '50%',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    borderRadius: 10,

  },

  container: {

      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f2f3f7',
  },
    
})

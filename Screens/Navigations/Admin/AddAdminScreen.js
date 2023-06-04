import { 
    
  View,
  Text, 
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Alert,
  ImageBackground,
  TextInput

} from 'react-native';
import React , {useState , useEffect} from 'react'
import {localDBAdmin , SyncAdmin , remoteDBAdmin , remoteAdminActivities} from '../../../Database/pouchDb'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { CloseButton } from '../../../Components/Buttons';
import { useNavigation } from '@react-navigation/native';
import uuid from 'react-native-uuid';
import { launchImageLibrary } from 'react-native-image-picker';
import { setImages } from '../../../Redux/TaskReducer';
import { useDispatch } from 'react-redux';
import storage from '@react-native-firebase/storage';
import { FlatList } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

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

export default function AddFacultyScreen() {

useEffect(() => {
  admindatas()
}, []);

  const {adminLoginInfo} = useSelector((store) => store.adminmodal)
  const dispatch = useDispatch();
  const navigation = useNavigation('');

  const [next, setNext] = useState(true);

  const [adminid , setAdminID] = useState(null);
  const [adminrev , setAdminRev] = useState(null);
  const [adminname, setAdminName] = useState('');
  const [adminpostion, setAdminPosition] = useState('');
  const [adminoffice, setAdminOffice] = useState('');
  const [status, setStatus] = useState('');
  const [image, setImage] = useState('https://cdn.iconscout.com/icon/free/png-256/gallery-44-267592.png')
  const [dataforadmin , setDataForAdmin] = useState()
  const [transferred, setTransferred] = useState(0);
  const [dataforCourse, setDataForCourse] = useState('');
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

  const AddNewAdmin =  () => {
      
     
    if (adminname.length == 0) {
      Alert.alert('Please Enter Admin Name') 
    } else if (adminpostion.length == 0) {
        Alert.alert('Please Enter Admin Position') 
      } else if (adminoffice.length == 0) {
          Alert.alert('Please Enter Admin Office')
            } else {
                setNext(false)
                }
}

  const OpenGallery = async() => {

    launchImageLibrary({cameraType: 'front' , maxHeight: 300 , maxWidth: 300 ,  mediaType: 'photo'}, response => {
      console.log(response)
        }).then(image => {
          setImage(image.assets[0].uri)
          dispatch(setImages(image.assets[0].uri))
        });

}

const setNewAdmin = async () => {
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
      const newAdmin = {
        _id: adminid === null ? id : adminid,
        _rev:adminrev === null ? undefined : adminrev,
        Name: adminname,
        Position: adminpostion,
        Office: adminoffice,
        Image: url,
        Status: status,
      };

      const adminactivity = {
        _id: id ,
        idofadmin : adminLoginInfo._id,
        Activity: "Added or Edit Admin Data",
        timestamp : timestamp,
        Time: time,
        Date: date
      }

      await remoteAdminActivities
        .put(adminactivity)
        .then((response) => {
        })

      await remoteDBAdmin
        .put(newAdmin)
        .then((response) => {
          Alert.alert('Your Admin has been successfully added!');
          navigation.navigate('AdminHomeScreen');
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  }
};

const admindatas = async() => {

    var result = await remoteDBAdmin.allDocs({
      include_docs: true,
      attachments: true,
    });
    if (result.rows) {
      let modifiedArr = result.rows.map(function (item) {
        return item.doc;
      });
      let filteredData = modifiedArr.filter((item) => {
        return item.Status  = 'Active'
      });
      let newFilterData = filteredData.filter((item) => {
        return item
      });
      setDataForAdmin(newFilterData)

    }
}
const deleteData = () => {

  try {
    const newEvent = {
      _id: adminid === null ? id : adminid,
      _rev:adminrev === null ? undefined : adminrev,
      Name: adminname,
      Position: adminpostion,
      Office: adminoffice,
      Image: url,
      Status: 'Inactive'
    };

    remoteDBAdmin
      .put(newEvent)
      .then((response) => {
        navigation.navigate('AddClassScreen');
        Alert.alert('Done');
        SyncEvent()
      })
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
  }

}

const renderItem = ({ item }) => {
return(
  <View style = {{flex: 1, justifyContent: 'flex-start', alignContent: 'center', flexDirection: 'row', height: 100 }}>
    <View style = {{borderBottomWidth: 1, width: '100%', flexDirection: 'row',  alignItems: 'center',}}>
      <TouchableOpacity 
        onPress={() => {
          setAdminPosition(item.Position)
          setAdminName(item.Name)
          setAdminOffice(item.Office)
          setAdminID(item._id)
          setAdminRev(item._rev)
          setImage(item.Image)
          setCancelEdit(false) 
          setDeleteState(true)
        }}
        style = {{paddingLeft: 20}}
      >
        <Icon
          name = 'edit'
          size = {25}
          
        />
  </TouchableOpacity>
    <Text style = {{fontSize: 20 , padding: 10, textAlign: 'left'}}>
      {item.Position}
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
        style = {{justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', borderRightWidth: 1,}} 
        resizeMode = 'cover'
        source = {require('../../../Assets/Img/admin-image.png')}>
          <Text style = {{fontSize: 30, fontWeight: 'bold', marginTop: 20, color: '#0f2ed6'}}>CONFIGURE ADMIN</Text>
              <CustomInput
                onChangeText={(value) => setAdminName(value)}
                 value={adminname}
                 title = 'Admin Name  '
                 placeholder="e.g. admin name"
              />
              <CustomInput
                onChangeText={(value) => setAdminPosition(value)}
                value={adminpostion}
                multiline
                title='Admin Position'
                placeholder="e.g. position"
            
              />
              <CustomInput
                onChangeText={(value) => setAdminOffice(value)}
                value={adminoffice}
                multiline
                title = 'Admin Office'
                placeholder='e.g. office'
            
              />
             <TouchableOpacity
              onPress={AddNewAdmin}
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
                onPress={setNewAdmin}
                style = {[styles.nextbutton, {bottom: 0, position: 'absolute'}]}>
                <Text style = {{textAlign: 'center', color: '#fddf54', fontSize: 20, fontWeight: 'bold'}} >ADD/EDIT ADMIN</Text>
              </TouchableOpacity>
              
        </View>
      }
        <View style={styles.eventcontainer}>
             <FlatList
             data={dataforadmin}
             renderItem={renderItem}
             keyExtractor={item => item._id}
             />
        </View>
    </View>
    <TouchableOpacity 
                onPress={() => {
                  setAdminPosition('')
                  setAdminName('')
                  setAdminOffice('')
                  setAdminID('')
                  setAdminRev('')
                  setImage('')
                  setCancelEdit(true)
                  setDeleteState(false)
                }}
                      style = {{position: 'absolute',}}
                    >
                      <Icon
                        name =  {adminpostion === '' ? null : 'cancel'}
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

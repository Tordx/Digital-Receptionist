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
import {localDBAdmin , SyncAdmin} from '../../../Database/pouchDb'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { CloseButton } from '../../../ScreenComponents/Buttons';
import { useNavigation } from '@react-navigation/native';
import uuid from 'react-native-uuid';
import { launchImageLibrary } from 'react-native-image-picker';
import { setImages } from '../../../Redux/TaskReducer';
import { useDispatch } from 'react-redux';
import storage from '@react-native-firebase/storage';

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
   
  }, []);

    const dispatch = useDispatch();
    const navigation = useNavigation('');

    const [next, setNext] = useState(true);
    const [adminname, setAdminName] = useState('');
    const [adminbuilding, setAdminBuilding] = useState('');
    const [adminpresident, setAdminPresident] = useState('');
    const [adminvicepresident, setAdminVicePresident] = useState('');
    const [adminmembers, setAdminMembers] = useState('');
    const [image, setImage] = useState('https://cdn.iconscout.com/icon/free/png-256/gallery-44-267592.png')

    const [transferred, setTransferred] = useState(0);

    const AddNewAdmin =  () => {
        
       
      if (adminname.length == 0) {
        Alert.alert('Please Enter Admin Name') 
      } else if (adminbuilding.length == 0) {
          Alert.alert('Please Enter Admin Building') 
        } else if (adminpresident.length == 0) {
            Alert.alert('Please Enter Admin President')
          } else if (adminvicepresident.length == 0) {
              Alert.alert('Please Enter Admin VicePresident')
            } else if (adminmembers == 0) {
                Alert.alert('Please Enter Admin Member')
              } else {
                  setNext(false)
                  }
  }

    const OpenGallery = async() => {
  
      launchImageLibrary({cameraType: 'front' , maxHeight: 300 , maxWidth: 300 ,  mediaType: 'photo'}, response => {
        
        console.log(response)
  
      }).then(image => {
        console.log('yyyyyyyyyyyyy')
        console.log(image.assets[0].uri)
        console.log('xxxxxxxxxxxx')
        setImage(image.assets[0].uri)
        // setImage(image.assets[0].uri); 
        dispatch(setImages(image.assets[0].uri))
        // uploadImage()
      });
  
  }

     const setNewAdmin = async () => {

      navigation.navigate('AdminHomeScreen')
      console.log('Images')
      console.log(image)
      console.log('Images')
      const  uri  = image;
      const filename = uri.substring(uri.lastIndexOf('/') + 1);
      const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
      setTransferred(0);
      const task = storage()
        .ref(filename)
        .putFile(uploadUri);
      // set progress state
      task.on('state_changed', snapshot => {
        setTransferred(
          Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
        );
      });
      try {
        await task;
      } catch (e) {
        console.error(e);
      }
      Alert.alert(
        'Successfully added Photo!'
      );  
      setImage(null);
      const url = await storage().ref(filename).getDownloadURL();
      // dispatch(setImages(url));
      setImage(url)
      console.log(url)
      console.log('url')
      console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')

        const id = uuid.v4();

        if (image === 'https://cdn-icons-png.flaticon.com/512/1160/1160358.png') { 
          Alert.alert('Please Add Image')
          console.log('Error Upload')
        } else {
         try {
           var NewAdmin = {
            _id: id,
             AdminName : adminname,
             AdminBuilding : adminbuilding,
             AdminPresident: adminpresident,
             AdminVicePresident : adminvicepresident,
             AdminMembers : adminmembers,
             AdminImage : url
           }
        localDBAdmin.put(NewAdmin)
           .then((response) =>{
             Alert.alert('Your Schedule has been successfully added!')
             console.log(response)
             SyncAdmin()
           })
           .catch(err=>console.log(err))
           
         } catch (error) {
          console.log(error)
         }
         }
        }

  return (
    
    <View style={styles.container}>
      <View style={styles.contentcontainer}>
        {next? 
          <View style={[styles.inputcontainer, {backgroundColor: '#fddf54'}]}>
            <ImageBackground
          style = {{justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%'}} 
          resizeMode = 'cover'
          source = {require('../../../Assets/Img/admin-image.png')}>
            <Text style = {{fontSize: 30, fontWeight: 'bold', marginTop: 20, color: '#0f2ed6'}}>ADD ADMIN</Text>
                <CustomInput
                  onChangeText={(value) => setAdminName(value)}
                   value={adminname}
                   title = 'Admin Department  '
                   placeholder="e.g. Year-end Party 2022"
                />
                <CustomInput
                  onChangeText={(value) => setAdminBuilding(value)}
                  value={adminbuilding}
                  multiline
                  title='Admin Building'
                  placeholder="e.g. guidelines and other info"
              
                />
                <CustomInput
                  onChangeText={(value) => setAdminPresident(value)}
                  value={adminpresident}
                  multiline
                  title = 'Admin Director'
                  placeholder='The Event will be held on'
              
                />
                <CustomInput
                  onChangeText={(value) => setAdminVicePresident(value)}
                  value={adminvicepresident}
                  multiline
                  title = 'Admin Executive Assistant'
                  placeholder='The Event will be held at'
                />
                <CustomInput
                  onChangeText={(value) => setAdminMembers(value)}
                  value={adminmembers}
                  multiline
                  title = 'Admin Members'
                  placeholder='The Event will be held at'
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
                  <Text style = {{textAlign: 'center', color: '#fddf54', fontSize: 20, fontWeight: 'bold'}} >ADD EVENT</Text>
                </TouchableOpacity>
                
          </View>
        }
          <View style={styles.eventcontainer}>
               
          </View>
      </View>
              <CloseButton
                    onPress = {() => navigation.navigate('AdminHomeScreen')}
                    name = 'arrow-back'
                    size = {35}
                    color = '#000'
                    style = {{flexDirection: 'row', top: 0, left: 0, position: 'absolute', marginVertical: 27, marginHorizontal: 20}}
        />
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
    borderRightWidth: 3,
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
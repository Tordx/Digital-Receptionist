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
import React , {useState , useEffect , useMemo} from 'react'
import {localDBBuilding , SyncBuilding} from '../../../Database/pouchDb'
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

export default function AddBuildingScreen() {

  useEffect(() => {
    
  }, []);

  // useMemo(() => uploadImage(image), [image]);

  
    const navigation = useNavigation('');
    const dispatch = useDispatch()

    const [next, setNext] = useState(true);
    const [buildingname, setBuildingName] = useState('');
    const [buildinglocation, setBuildingLocation] = useState('');
    const [image, setImage] = useState('https://cdn.iconscout.com/icon/free/png-256/gallery-44-267592.png');
    const [transferred, setTransferred] = useState(0);

    const AddNewBuilding =  () => {
        
      buildingname === '' ? Alert.alert('Please Enter Building Name') : 
      (buildinglocation === '' ? Alert.alert('Please Enter Building Location') : 
      image === null ? Alert.alert('Please  Add Image') : 
      setNext(false))
  }

    const OpenGallery = async() => {

      // saves the photo you have, PS: Camera type not working but saving the file does modify mo ayang
      
  
      launchImageLibrary({cameraType: 'front' , maxHeight: 300 , maxWidth: 300 ,  mediaType: 'photo'}, response => {
        
        console.log(response)
  
        // navigation.navigate('GuestLoginScreen')
  
      }).then(image => {
        console.log(image.assets[0].uri)
        console.log('uri readed')
        setImage(image.assets[0].uri)
        dispatch(setImages(image.assets[0].uri))
      });
  
  }

     const setNewBuilding = async () => {

      navigation.navigate('AdminHomeScreen')
      console.log('Images')
      console.log(image)
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
      console.log('Image Uploaded')
      setImage(null);
      const url = await storage().ref(filename).getDownloadURL();
      // dispatch(setImages(url));
      setImage(url)
      console.log(url)
      console.log('url uploaded')
      
      const id = uuid.v4();

        if(image === 'https://cdn.iconscout.com/icon/free/png-256/gallery-44-267592.png'){
          Alert.alert('Please upload building image')
          console.log('No image uploaded')
        } else{
         try {
            var NewEvent = {
                _id: id,
                 BuildingName : buildingname,
                 BuildingLocation : buildinglocation,
                 BuildingPicture : url
           }
        localDBBuilding.put(NewEvent)
           .then((response) =>{
             Alert.alert('Your Schedule has been successfully added!')
             console.log(response)
             SyncBuilding()
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
                source = {require('../../../Assets/Img/building-image.png')}>
                  <Text style = {{fontSize: 30, fontWeight: 'bold', marginTop: 20, color: '#0f2ed6'}}>ADD BUILDING</Text>
                      <CustomInput
                        onChangeText={(value) => setBuildingName(value)}
                         value={buildingname}
                         title = 'Admin Department  '
                         placeholder="e.g. Year-end Party 2022"
                      />
                      <CustomInput
                        onChangeText={(value) => setBuildingLocation(value)}
                        value={buildinglocation}
                        multiline
                        title='Admin Building'
                        placeholder="e.g. guidelines and other info"                    
                      />
                     <TouchableOpacity
                      onPress={AddNewBuilding}
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
                        onPress={setNewBuilding}
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

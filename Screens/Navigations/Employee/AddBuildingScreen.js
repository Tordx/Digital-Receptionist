import { 
    
    View,
    Text, 
    StyleSheet,
    Pressable,
    ScrollView,
    TouchableOpacity,
    Alert,
    Image

} from 'react-native';
import React , {useState , useEffect , useMemo} from 'react'
import {TextInput} from 'react-native-paper'; 
import { Modal_apsg } from '../Components/Modalapsg';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {localDBBuilding , SyncBuilding} from '../../../Database/pouchDb'
import { useSelector } from 'react-redux';
import { Picker } from '@react-native-picker/picker';
import { CloseButton } from '../../../ScreenComponents/Buttons';
import { useNavigation } from '@react-navigation/native';
import uuid from 'react-native-uuid';
import { launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import { useDispatch } from 'react-redux';
import { setImages } from '../../../Redux/TaskReducer';

export default function AddBuildingScreen() {

  useEffect(() => {
    
  }, []);

  // useMemo(() => uploadImage(image), [image]);

  
    const navigation = useNavigation('');
    const dispatch = useDispatch()

    const [buildingname, setBuildingName] = useState('');
    const [buildinglocation, setBuildingLocation] = useState('');
    // const [eventwhen, setEventWhen] = useState('');
    // const [eventwhere, setEventWhere] = useState('');
    const [image, setImage] = useState(null);
    const [transferred, setTransferred] = useState(0);
    // const [eventcode, setEventCode] = useState('');
    // const [eventposter, setEventPoster] = useState('');
    // const [preptime, setPreptime] = useState('');
    // const [deliveryfee, setDeliveryfee] = useState('');
    // const [place, setPlace] = useState('');
    // const [status , setStatus] = useState('')

    const AddNewBuilding =  () => {
        
      buildingname === '' ? Alert.alert('Please Enter Building Name') : 
      (buildinglocation === '' ? Alert.alert('Please Enter Building Location') : 
      image === null ? Alert.alert('Please  Add Image') : 
      setNewBuilding())
  }

    const OpenGallary = async() => {

      // saves the photo you have, PS: Camera type not working but saving the file does modify mo ayang
      
  
      launchImageLibrary({cameraType: 'front' , maxHeight: 300 , maxWidth: 300 ,  mediaType: 'photo'}, response => {
        
        console.log(response)
  
        // navigation.navigate('GuestLoginScreen')
  
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

  // const uploadImage = async (image) => {

      
  //   };

     const setNewBuilding = async () => {

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

        if(1+1 == 3){
          console.log('hey')
        }
        // if((classname.length == 0) && (subject.length == 0) ) {
        //   console.log('ilove')}
       else{
         try {
            var NewEvent = {
                _id: id,
                 BuildingName : buildingname,
                 BuildingLocation : buildinglocation,
                //  EventWhen: eventwhen,
                //  EventWhere : eventwhere,
                 BuildingPicture : url
            //  place: place,
            //  Price : price,
            //  Preptime : preptime,
            //  Deliveryfee : deliveryfee,
            //  Status: status,
            //  Image: Images
           }
        //    console.log(Images)
        //    console.log('Images')
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
            Add Building </Text>
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
                    onChangeText={(value) => setBuildingName(value)}
                   value={buildingname}
                   label="Building Name"
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
                onChangeText={(value) => setBuildingLocation(value)}
                value={buildinglocation}
                mode ='Outlined'
                multiline
                label='Building Location'
                theme={{    
                    colors: {
                      primary: '#225'
                    }
                  }}
              
                />
                </View>
                {/* <View style = {styles.TextInput}>
                  <View
                    style = {{
                    alignContent: 'center',
                    justifyContent: 'center',
                    margin: 5,
                  }}
        
                    >
                </View>
                <TextInput
                onChangeText={(value) => setEventWhen(value)}
                value={eventwhen}
                mode ='Outlined'
                multiline
                label='The Event will be held on'
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
                onChangeText={(value) => setEventWhere(value)}
                value={eventwhere}
                mode ='Outlined'
                multiline
                label='The Event will be held at'
                theme={{    
                    colors: {
                      primary: '#225'
                    }
                  }}
              
                />
                </View> */}
               <View style={{alignSelf: 'center' , marginBottom: 50}}>
                <Image
                resizeMode="contain" style={{width: 250, height: 250}} source={{uri:image}}
                
                />

                
               </View>
           
                
                
                
                {/* <View style = {styles.TextInput}>
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
                </View> */}
               
             </ScrollView> 
             
             <Pressable
                        style = {{
                            justifyContent: 'center',
                            alignSelf: 'center',
                            height: 50,
                            width: 400,
                            backgroundColor: '#225',
                            borderRadius: 20,
                            position: 'absolute',
                            bottom: 100,
                            backgroundColor: 'green',
                            margin: 80
                        }}
                        onPress={OpenGallary}
                        >
                            <Text
                            
                            style = {{color: 'white', fontWeight: '900', textAlign: 'center'}}
                            >  ADD IMAGE </Text>
              </Pressable>   
                <Pressable
                        style = {{
                            justifyContent: 'center',
                            alignSelf: 'center',
                            height: 50,
                            width: 400,
                            backgroundColor: '#225',
                            borderRadius: 20,
                            position: 'absolute',
                            bottom: 100,
                        }}
                        onPress={AddNewBuilding}
                        >
                            <Text
                            
                            style = {{color: 'white', fontWeight: '900', textAlign: 'center'}}
                            >  ADD EVENT </Text>
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

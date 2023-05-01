import { 
    
    View,
    Text, 
    StyleSheet,
    Pressable,
    TouchableOpacity,
    Alert,
    ImageBackground,
    FlatList,
    TextInput,
    ActivityIndicator
} from 'react-native';
import React , {useState , useEffect} from 'react'
import {remoteDBCollege, remoteDBFaculty, remoteDBfacultyMember, SyncFaculty} from '../../../Database/pouchDb'
import { CloseButton } from '../../../Components/Buttons';
import { useNavigation } from '@react-navigation/native';
import uuid from 'react-native-uuid';
import { launchImageLibrary } from 'react-native-image-picker';
import { setImages } from '../../../Redux/TaskReducer';
import { useDispatch } from 'react-redux';
import storage from '@react-native-firebase/storage';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Picker } from '@react-native-picker/picker';

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
  

export default function AddCollege() {

  useEffect(() => {
    facultydatas()
  }, []);

    const dispatch = useDispatch();
    const navigation = useNavigation('');
    const [dataforFaculty, setDataForFaculty] = useState('');
    const [College, setCollege] = useState('');
    const [CollegeAcronym, setCollegeAcronym] = useState('');
    const [department, setDepartment] = useState([]);
    const [building, setBuilding] = useState('');
    const [dean, setDean] = useState('');
    const [image, setImage] = useState(null)
    const [coordinates, setCoordinate] = useState([])
    const [next, setNext] = useState(true);
    const [Collegeid , setCollegeId] = useState(null);
    const [Collegerev , setCollegeRev] = useState(null);
    const [transferred, setTransferred] = useState(0);
    const id = uuid.v4()

    const AddNewFaculty =  () => {
        
      College === '' ? Alert.alert('Please Enter Faculty Name') : 
      (building === '' ? Alert.alert('Please Enter Faculty Building') : 
      department === '' ? Alert.alert('Please Enter Faculty President') : 
      College === '' ? Alert.alert('Please Enter Faculty VicePresident') :
      CollegeAcronym === '' ? Alert.alert('Please Enter Faculty Member') :
      dean === '' ? Alert.alert('Please Enter Dean') :
      // image === null ? Alert.alert('Please Add Image') : 
      setNext(false))
  }

    const OpenGallery = async() => {

      
  
      launchImageLibrary({cameraType: 'front' , maxHeight: 300 , maxWidth: 300 ,  mediaType: 'photo'}, response => {
        
        console.log(response)
  
  
      }).then(image => {
        console.log('yyyyyyyyyyyyy')
        console.log(image.assets[0].uri)
        console.log('xxxxxxxxxxxx')
        setImage(image.assets[0].uri)
        dispatch(setImages(image.assets[0].uri))
      });
  
  }

     const setNewFaculty = async () => {
      
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
      setImage(url)
      console.log(url)
      console.log('url')
      console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')


         try {
           var NewFaculty = {
            _id: Collegeid === null ? id : Collegeid,
            _rev:Collegerev === null ? undefined : Collegerev,
             CollegeAcronym : CollegeAcronym,
             College : College,
             Department : department,
             Image : url,
             Building : building,
             Dean : dean,
             Coordinates : coordinates
           }
           remoteDBCollege.put(NewFaculty)
           .then((response) =>{
             Alert.alert('Your  has been successfully added!')
             console.log(response)
            //  SyncFaculty()
             navigation.navigate('AdminHomeScreen')
           })
           .catch(err=>console.log(err))
           
         } catch (error) {
          console.log(error)
         }
    }

    const facultydatas = async() => {

      var result = await remoteDBCollege.allDocs({
        include_docs: true,
        attachments: true,
      });
      if (result.rows) {
        let modifiedArr = result.rows.map(function (item) {
          return item.doc;
        });
        setDataForFaculty(modifiedArr)
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
                    setCollege(item.College)
                    setCollegeAcronym(item.CollegeAcronym)
                    setDepartment(item.Department)
                    setImage(item?.Image)
                    setCollegeId(item._id)
                    setCollegeRev(item._rev)
                    setDean(item.Dean)
                    setBuilding(item.Building)
                  }}
                  style = {{paddingLeft: 20}}
                >
                  <Icon
                    name = 'edit'
                    size = {25}
                    
                  />
            </TouchableOpacity>
              <Text style = {{fontSize: 20 , padding: 10, textAlign: 'left'}}>
                {item.College}
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
                    <Text style = {{fontSize: 30, fontWeight: 'bold', marginTop: 20, color: '#0f2ed6'}}>CONFIGURE COLLEGE</Text>
                        <CustomInput
                          onChangeText={(value) => setCollege(value)}
                           value={College}
                           title = 'College Name'
                           placeholder="e.g. College name"
                        />
                        <CustomInput
                          onChangeText={(value) => setCollegeAcronym(value)}
                          value={CollegeAcronym}
                          multiline
                          title='CollegeAcronym'
                          placeholder="e.g. collegeAcronym"
                      
                        />
                        <CustomInput
                          onChangeText={(value) => setDepartment(value)}
                          value={department}
                          multiline
                          title = 'College Department'
                          placeholder='e.g. office'
                      
                        />
                        <CustomInput
                          onChangeText={(value) => setBuilding(value)}
                          value={building}
                          multiline
                          title = 'College Building'
                          placeholder='e.g. Building 1'
                      
                        />
                         <CustomInput
                          onChangeText={(value) => setDean(value)}
                          value={dean}
                          multiline
                          title = 'College Dean'
                          placeholder='e.g. CSS, CAS'
                      
                        />
                       <TouchableOpacity
                        onPress={AddNewFaculty}
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
                          onPress={setNewFaculty}
                          style = {[styles.nextbutton, {bottom: 0, position: 'absolute'}]}>
                          <Text style = {{textAlign: 'center', color: '#fddf54', fontSize: 20, fontWeight: 'bold'}} >ADD/EDIT SUBMIT</Text>
                        </TouchableOpacity>
                        
                  </View>
                }
                  <View style={styles.eventcontainer}>
                      {dataforFaculty?  <FlatList
                       data={dataforFaculty}
                       renderItem={renderItem}
                       keyExtractor={item => item._id}
                       /> : <ActivityIndicator/>}
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
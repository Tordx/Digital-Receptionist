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
import {localDBFaculty, remoteDBFaculty, remoteDBfacultyMember, remoteAdminActivities} from '../../../Database/pouchDb'
import { CloseButton } from '../../../Components/Buttons';
import { useNavigation } from '@react-navigation/native';
import uuid from 'react-native-uuid';
import { launchImageLibrary } from 'react-native-image-picker';
import { setImages } from '../../../Redux/TaskReducer';
import { useDispatch } from 'react-redux';
import storage from '@react-native-firebase/storage';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Picker } from '@react-native-picker/picker';
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

    const {adminLoginInfo} = useSelector((store) => store.adminmodal)
    const dispatch = useDispatch();
    const navigation = useNavigation('');
    const [dataforFaculty, setDataForFaculty] = useState('');
    const [college, setCollege] = useState('');
    const [collegeAcronym, setCollegeAcronym] = useState('');
    const [department, setDepartment] = useState('');
    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [image, setImage] = useState(null)
    const [next, setNext] = useState(true);
    const [facultymemberid , setFacultyMembersId] = useState(null);
    const [facultymemberrev , setFacultyMembersRev] = useState(null);
    const [transferred, setTransferred] = useState(0);
    const [searchTerm, setSearchTerm] = useState('')
    const id = uuid.v4()
    const log = new Date();
    const date  = log.toLocaleDateString();
    const time = log.toLocaleTimeString();
    const localDate = new Date();
    const utcDate = new Date(localDate.getTime() - (localDate.getTimezoneOffset() * 60000));
    const timestamp = utcDate.toISOString();

    const AddNewFaculty =  () => {
        
      name === '' ? Alert.alert('Please Enter Faculty Name') : 
      (title === '' ? Alert.alert('Please Enter Faculty Building') : 
      department === '' ? Alert.alert('Please Enter Faculty President') :
      collegeAcronym === '' ? Alert.alert('Please Enter Faculty Member') :
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
            _id: facultymemberid === null ? id : facultymemberid,
            _rev:facultymemberrev === null ? undefined : facultymemberrev,
             CollegeAcronym : collegeAcronym,
             Department : department,
             Name: name,
             Title : title,
           }

           const adminactivity = {
            _id: id ,
            idofadmin : adminLoginInfo._id,
            Activity: "Added or Edit Faculty Data",
            timestamp : timestamp,
            Time: time,
            Date: date
          }
    
          await remoteAdminActivities
            .put(adminactivity)
            .then((response) => {
            })

          await remoteDBfacultyMember.put(NewFaculty)
           .then((response) =>{
            Alert.alert('Your Faculty has been successfully added!')
              navigation.navigate('AdminHomeScreen');
           })
           .catch(err=>console.log(err))
           
         } catch (error) {
          console.log(error)
         }
    }

    const facultydatas = async() => {

      var result = await remoteDBfacultyMember.allDocs({
        include_docs: true,
        attachments: true,
      });
      if (result.rows) {
        let modifiedArr = result.rows.map(function (item) {
          return item.doc;
        });
        let filteredData = modifiedArr.filter((item) => {
          return item && (
            new RegExp(searchTerm,'i').test(item.Name) ||
            new RegExp(searchTerm,'i').test(item.CollegeAcronym) ||
            new RegExp(searchTerm,'i').test(item.Department) ||
            new RegExp(searchTerm,'i').test(item.Title)
          )
        })
        setDataForFaculty(filteredData)
        console.log('modifiedArr')
        console.log(modifiedArr)
        console.log('modifiedArr')
  
      }
  }
        
      useEffect(() => {
        facultydatas()
      }, [searchTerm]);


        const renderItem = ({ item }) => {
          return(
            <View style = {{flex: 1, justifyContent: 'flex-start', alignContent: 'center', flexDirection: 'row', height: 100 }}>
              <View style = {{borderBottomWidth: 1, width: '100%', flexDirection: 'row',  alignItems: 'center',}}>
                <TouchableOpacity 
                  onPress={() => {
                    setCollegeAcronym(item.CollegeAcronym)
                    setDepartment(item.Department)
                    setName(item.Name)
                    setTitle(item.Title)
                    setImage(item?.Image)
                    setFacultyMembersId(item._id)
                    setFacultyMembersRev(item._rev)
                  }}
                  style = {{paddingLeft: 20}}
                >
                  <Icon
                    name = 'edit'
                    size = {25}
                    
                  />
            </TouchableOpacity>
              <Text style = {{fontSize: 20 , padding: 10, textAlign: 'left'}}>
                {item.Name}
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
                    <Text style = {{fontSize: 30, fontWeight: 'bold', marginTop: 20, color: '#0f2ed6'}}>CONFIGURE FACULTY MEMBERS</Text>
                        <CustomInput
                          onChangeText={(value) => setName(value)}
                           value={name}
                           title = 'Faculty Name'
                           placeholder="e.g. admin name"
                        />
                        <CustomInput
                          onChangeText={(value) => setTitle(value)}
                          value={title}
                          multiline
                          title='Faculty Title'
                          placeholder="e.g. position"
                      
                        />
                        <CustomInput
                          onChangeText={(value) => setDepartment(value)}
                          value={department}
                          multiline
                          title = 'Faculty Department'
                          placeholder='e.g. office'
                      
                        />
                        <View style = {{justifyContent: 'flex-start', margin: 5}}>
                        <Text style = {{color: '#000', fontWeight: '500',fontSize: 20, textAlign: 'left', justifyContent: 'flex-start', alignSelf: 'flex-start', width: '50%'}}>Subject</Text>
                            <View
                              style = {styles.TextInput}> 
                    
                            <Picker
                              title = 'Select Category'
                              value = {department}
                              selectedValue={department}
                              mode="dropdown"
                              style={{
                                transform: [
                                { scaleX: 1 }, 
                                { scaleY: 1 },
                              ],
                              width: '100%',
                              bottom: 0,
                              color: '#202020',
                    
                              }}
                              onValueChange={(itemValue, itemIndex) => setDepartment(itemValue)}
                            >
                                <Picker.Item enabled = {false} label="Select" value="" />
                                <Picker.Item label="Language Department" value="Language Department" />
                                <Picker.Item label="Economics Department" value="Economics Department" />
                                <Picker.Item label="Natural Science Department" value="Natural Science Department" />
                                <Picker.Item label="Nutrition and Dietetics Department" value="Nutrition and Dietetics Department" />
                                <Picker.Item label="Social Work Department" value="Social Work Department" />
                                <Picker.Item label="Information Technology" value="Information Technology" />
                                <Picker.Item label="Mathematics" value="Mathematics" />
                                <Picker.Item label="BS Computer Science" value="BS Computer Science" />
                                <Picker.Item label="Hospitality Management" value="Hospitality Management" />
                                <Picker.Item label="Social Studies Education Department" value="Social Studies Education Departmen" />
                                <Picker.Item label="Teacher Education Specialization Courses Department" value="Teacher Education Specialization Courses Department" />
                                <Picker.Item label="Technology Department" value="Technology Department" />
                                <Picker.Item label="Computer Science" value="Computer Science" />
                              </Picker>
                    
                            </View>
                        </View>
                        <CustomInput
                          onChangeText={(value) => setCollegeAcronym(value)}
                          value={collegeAcronym}
                          multiline
                          title = 'College Acronym'
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
                          <Text style = {{textAlign: 'center', color: '#fddf54', fontSize: 20, fontWeight: 'bold'}} >ADD/EDIT FACULTY</Text>
                        </TouchableOpacity>
                        
                  </View>
                }
                  <View style={styles.eventcontainer}>
                  <View style = {styles.TextInput}>
                    <TextInput
                        style  = {{width: '100%', fontSize: 17}}
                        value={searchTerm} 
                        onChange={(event) => {
                          setSearchTerm(event.nativeEvent.text) }}
                        placeholder = 'Search Faculty Members...'
                      
                    />
                    
                  </View>
                      {dataforFaculty?  
                      <FlatList
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
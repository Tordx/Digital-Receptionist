import React , {useState , useEffect} from 'react';
import { 
    
    View, 
    FlatList, 
    StyleSheet, 
    Text,  
    TextInput,
    ImageBackground,
    Pressable,
    ActivityIndicator,
    Modal,
    Image,
    StatusBar,
} from 'react-native';
import { CloseButton , SearchButton } from '../../../ScreenComponents/Buttons';
import { useNavigation } from '@react-navigation/native';
import { remoteDBCourses } from '../../../Database/pouchDb';
import { useDispatch, useSelector } from 'react-redux';
import { setCourseData } from '../../../Redux/ClassSlice';
  
export const ClassScreen = () => {

    const navigation = useNavigation()
    const dispatch = useDispatch()
    const {courseData} = useSelector((store) => (store.classmodal))
    const [newSearch, setNewSearch] = useState();
    const [searchTerm, setSearchTerm] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [image, setImage] = useState('https://www.caltrain.com/files/images/2021-09/default.jpg')
  
    useEffect(() => {
      rendertickets();
    }, [searchTerm]);
  
    const rendertickets = async () => {
      var result = await remoteDBCourses.allDocs({
        include_docs: true,
        attachments: true,
      });
      if (result.rows) {
        let modifiedArr = result.rows.map(function(item) {
          return item.doc;
        });
        let filteredData = modifiedArr.filter((item) => {
          return item && 
          (
            
          new RegExp(searchTerm, 'i').test(item.Course) ||
          new RegExp(searchTerm, 'i').test(item.CourseAcronym) ||
          new RegExp(searchTerm, 'i').test(item.Department) ||
          new RegExp(searchTerm, 'i').test(item.DepartmentAcronym) 
          )
        });
        if (filteredData) {
          let newFilterData = filteredData.map((item) => {
            return item;
          });
          setNewSearch(newFilterData);
          console.log(newSearch)
        }
      }
    };


    const renderItem = ({ item }) => {

      return(
        <Pressable
         style = {styles.item}
        android_ripple={{
          color: 'red',
          borderRadius: 100,
        }}
        onPress={() => {
         dispatch(setCourseData(item)); setOpenModal(true); console.log('error')

        }} >
        <Image resizeMode='contain' style = {{width: 150, height: 150}} source = {{uri:  item.Image || image}}/>
          <Text style = {styles.title}>
              {item.CourseAcronym}
          </Text>
       </Pressable>
      )
  }

  return (
    <ImageBackground 
      source = {require('../../../Assets/Img/Background_image.png')} 
      style={styles.container}
      resizeMode = 'cover'
    >
        <View style = {styles.contentcontainer}>
          <View style = {{backgroundColor: '#0f2ed6', padding: 10, borderRadius: 5}}>
          <Text style = {{fontSize: 20, fontWeight: 'bold', color: '#fff'}}>PANGASINAN STATE UNIVERSITY, LINGAYEN CAMPUS — COURSES OFFERED</Text>
          </View>
        {newSearch ? (
          <View style = {{justifyContent: 'center', alignItems: 'center'}}>
        <FlatList
          data={newSearch}
          numColumns = {5}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          
        />
        </View>
      ) : (
        <ActivityIndicator size="large" color="#fddf54"/>
      )}
           </View>
          
        <View style = {styles.TextInput}>
        <TextInput
            style  = {{width: '100%', fontSize: 17}}
            value={searchTerm} 
            onChange={(event) => {
              setSearchTerm(event.nativeEvent.text) }}
         
        />
        <SearchButton onPress = {(event) => {
        setSearchTerm(event.nativeEvent.text);
        }} />
        </View>
        <CloseButton

          onPress = {() => navigation.navigate('StudentHomeScreen')}     
          name = 'arrow-back'
          size = {40}
          style = {{flexDirection: 'row', top: 25, left: 25, position: 'absolute'}}
  />
    <Modal
      visible = {openModal}
      transparent
      animationType='fade'
      onRequestClose = {() => setOpenModal(false)}
    >
      <StatusBar
      hidden
      />
      <View style = {{width: '100%', height: '100%', backgroundColor: '#00000059', justifyContent: 'center', alignSelf: 'center', alignItems: 'center'}}>
        <View style = {{justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', width: '95%', height: '90%'}}>
        <Text>{courseData.Course}</Text>
        </View>
      </View>
    </Modal>

    </ImageBackground>
  )

  }

  const styles = StyleSheet.create({

    container: {

        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f2f3f7',
        
    },

    contentcontainer: {

      width: '100%',
      position: 'absolute',
      top: 100,
      justifyContent: 'center',
      alignItems: 'center',

    },

    item: {

      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
      width: 245,
      height: 230,
      borderRadius: 5,
      marginVertical: 5,
      marginHorizontal: 5,
      elevation: 1,
      flexDirection: 'column'

    },

    title: {

      fontSize: 25,

    },

    text: {

      fontSize: 25,
      fontWeight: '500',
      left: 0,
      textAlign: 'center',
      color: 'white'

    },

    TextInput: { 

      position: 'absolute', 
      top: 20, 
      alignSelf:'center', 
      flexDirection: 'row',
      backgroundColor: '#ffff',
      width: 600,
      borderRadius: 4,
      height: 50,
      elevation: 1,
      borderWidth: .5,
      borderColor: '#a2a2a2'

    }

  });

  export default ClassScreen;
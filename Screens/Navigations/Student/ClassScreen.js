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
    RefreshControl,
    ScrollView,
} from 'react-native';
import { CloseButton , SearchButton } from '../../../Components/Buttons';
import { useNavigation } from '@react-navigation/native';
import { remoteDBCourses, remoteDBOrg } from '../../../Database/pouchDb';
import { useDispatch, useSelector } from 'react-redux';
import { setCourseData, setOrgData } from '../../../Redux/ClassSlice';
import LinearGradient from 'react-native-linear-gradient';

export const ClassScreen = () => {

    const navigation = useNavigation()
    const dispatch = useDispatch()
    const [courseRefresh, setCourseRefresh] = useState(false);
    const {courseData} = useSelector((store) => (store.classmodal))
    const [neworg, setNewOrg] = useState();
    const [newSearch, setNewSearch] = useState();
    const [searchTerm, setSearchTerm] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [image, setImage] = useState('https://i.imgur.com/CY1O1Y9.png');
    const [showSearch, setShowSearch] = useState(false)
  
    useEffect(() => {
      renderCourse();
      renderOrg();
    }, [searchTerm]);
  
    const renderCourse = async () => {
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

    const renderOrg = async () => {
      var result = await remoteDBOrg.allDocs({
        include_docs: true,
        attachments: true,
      });
      if (result.rows) {
        let modifiedArr = result.rows.map(function(item) {
          return item.doc;
        });
        let filteredData = modifiedArr.filter((item) => {
          return item
        });
        if (filteredData) {
          let newFilterData = filteredData.map((item) => {
            return item;
          });
          setNewOrg(newFilterData);
          dispatch(setOrgData(newFilterData))
          console.log(newFilterData)
        }
      }
    };

    const RefreshList = () => {

        setCourseRefresh(true);
        renderCourse();
        setCourseRefresh(false);

    }


    const renderItem = ({ item }) => {

      return(
        <Pressable
         style = {styles.item}
          android_ripple={{
          color: 'white',
          borderRadius: 100,
          radius: 200,
        }}
        onPress={() => {
         dispatch(setCourseData(item)); navigation.navigate('CourseMapScreen');

        }} >
          <ImageBackground style = {{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center',}} resizeMode='cover' source={require('../../../Assets/Img/background-lion.png')} >
        <Image resizeMode='contain' style = {{width: 150, height: 150, marginBottom: 20, borderRadius: 300}} source = {{uri:  item.Image || image }}/>
          <Text style = {styles.title}>
              {item.Course}
          </Text>
          </ImageBackground>
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
        {newSearch ? (
          <ScrollView nestedScrollEnabled>
        <FlatList
          style = {{paddingTop: 100}}
          data={newSearch}
          numColumns = {5}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          refreshControl = {
            <RefreshControl
              refreshing = {courseRefresh}
              onRefresh = {RefreshList}
            />
            
          }
          
        />
        </ScrollView>
       
      ) : (
        <ActivityIndicator size="large" color="#fddf54"/>
      )}
           </View>
           <LinearGradient colors = {['#f6f6f6', '#00000000']} style = {{position: 'absolute', top: 0, justifyContent: 'center', alignItems: 'center', width: '100%', height: 100}}>
         
           <View style = {{backgroundColor: '#0f2ed6', padding: 10, borderRadius: 20, position: 'absolute', top: 20, elevation: 10, shadowColor: '#000'}}>
          {showSearch ? null : <Text style = {{fontSize: 30, fontWeight: 'bold', color: '#fff'}}>UNIVERSITY COURSES</Text>}
          </View>
        {showSearch ?
          <View style = {styles.TextInput}>
          <TextInput
              style  = {{width: '100%', fontSize: 17}}
              value={searchTerm} 
              onChange={(event) => {
                setSearchTerm(event.nativeEvent.text) }}
              placeholder = 'Search Citizen Charter...'
            
          />
              <CloseButton
            style={styles.searchButtonExit}
            name='close'
            size={35}
            color={'black'}
            onPress={() => setShowSearch(!showSearch)}
          />
          
          </View>
       :  <CloseButton
       style={styles.searchButton}
       name='search'
       size={35}
       color={'#0f2ed6'}
       onPress={() => setShowSearch(!showSearch)}
     />}
        <CloseButton

          onPress = {() => navigation.navigate('StudentHomeScreen')}     
          name = 'arrow-back'
          size = {40}
          color  = '#404040'
          style = {{flexDirection: 'row', top: 25, left: 25, position: 'absolute'}}
        />
        </LinearGradient>
    
    </ImageBackground>
  )

  }

  const styles = StyleSheet.create({

    container: {

        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        
    },

    contentcontainer: {

      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',

    },

    item: {

      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FFFF',
      borderWidth: 1,
      borderColor: '#0f2ed6',
      width: 245,
      height: 300,
      borderRadius: 30,
      marginVertical: 5,
      marginHorizontal: 5,
      elevation: 1,
      flexDirection: 'column'

    },

    title: {

      fontSize: 16,
      textAlign: 'center',
      color: '#404040',
      width: '85%',
      fontFamily: 'regular'


    },

    text: {

      fontSize: 25,
      left: 0,
      textAlign: 'center',
      color: 'white',
      fontFamily: 'regular'

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

    },
    closeButton: {
      position: 'absolute',
      top: 20,
      left: 20,
    },
    searchButton: {
      position: 'absolute',
      top: 20,
      right: 20,
    },
    searchButtonExit: {
      position: 'absolute',
      top: 5,
      right: 10,
  },

  });

  export default ClassScreen;
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

export const CitizenChartScreen = () => {

    const navigation = useNavigation()
    const dispatch = useDispatch()
    const [courseRefresh, setCourseRefresh] = useState(false);
    const {courseData} = useSelector((store) => (store.classmodal))
    const [newSearch, setNewSearch] = useState();
    const [searchTerm, setSearchTerm] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [image, setImage] = useState('https://i.imgur.com/hYraFON.png');
  
    useEffect(() => {
      renderCourse();
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
          color: 'yellow',
          borderRadius: 100,
          radius: 200,
        }}
        onPress={() => {
         dispatch(setCourseData(item)); navigation.navigate('CourseMapScreen');

        }} >
        <Image resizeMode='contain' style = {{width: 150, height: 150}} source = {{uri:  item.Image || image }}/>
          <Text style = {styles.title}>
              {item.Course}
          </Text>
       </Pressable>
      )
  }

  return (
    <>
    {<ImageBackground 
      source = {require('../../../Assets/Img/Background_image.png')} 
      style={styles.container}
      resizeMode = 'cover'
    ></ImageBackground>
    }
    </>
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
      justifyContent: 'center',
      alignItems: 'center',

    },

    item: {

      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
      width: '90%',
      height: 230,
      borderRadius: 5,
      marginVertical: 5,
      marginHorizontal: 5,
      elevation: 1,
      flexDirection: 'column'

    },

    title: {

      fontSize: 16,
      textAlign: 'center'

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

  export default CitizenChartScreen;
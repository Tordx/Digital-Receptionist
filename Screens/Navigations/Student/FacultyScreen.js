import React , {useState , useEffect} from 'react';
import { 
    
    View, 
    FlatList, 
    StyleSheet, 
    Text,
    ImageBackground, 
    Pressable,
    Modal,
    TextInput,
    ActivityIndicator,
    RefreshControl
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CloseButton , SearchButton } from '../../../Components/Buttons';
import { useNavigation } from '@react-navigation/native';
import { remoteDBFaculty } from '../../../Database/pouchDb';
import { setFacultyDatas } from '../../../Redux/FacultySlice';
import { useDispatch, useSelector } from 'react-redux';

   export default function FacultyScreen () {

    const dispatch = useDispatch();
    
    const {facultyDatas} = useSelector((store) => (store.facultymodal))
    const [searchTerm, setSearchTerm] = useState('');
    const [openModal, setOpenModal] = useState(false)
    const [newSearch, setNewSearch] = useState();
    const [facultyRefresh, setFacultyRefresh] = useState(false)

    useEffect(() => {
      renderFaculty();
    }, [searchTerm]);

    const renderFaculty = async() => {

      var result = await remoteDBFaculty.allDocs({
        include_docs: true,
        attachments: true,
      })
      if(result.rows){
        let modifiedArr = result.rows.map(function(item)
        {
          return item.doc;
        });
        let filteredData = modifiedArr.filter(item => {
          return item && (
            new RegExp(searchTerm, 'i').test(item.College) ||
            new  RegExp(searchTerm, 'i').test(item.Building) ||
            new RegExp(searchTerm, 'i').test(item.Dean)
            // include more parameters
          )
        });
        if(filteredData) {
          let newFilterData = filteredData.map(item => {
            return item;
          });
          setNewSearch(newFilterData);
        }
      }
    }

    const navigation = useNavigation();

    const RefreshList = () => {

      setFacultyRefresh(true);
      renderCourse();
      setCourseRefresh(false);

  }

      const renderItem = ({ item }) => {

        return(
          <Pressable 
          style = {styles.item}
          android_ripple={{
            color: 'red',
            borderRadius: 100,
            radius: 200,
          }} 
          onPress={() => {
             dispatch(setFacultyDatas(item)); navigation.navigate('Maps')
          }} >
            <Text style = {styles.title}>
              {item.College}</Text>
            <Text style = {styles.title}>
              {item.Building}
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
              <Text style = {{fontSize: 20, fontWeight: 'bold', color: '#fff'}}>UNIVERSITY COURSES</Text>
              </View>
            {newSearch ? (
              <View style = {{justifyContent: 'center', alignItems: 'center'}}>
            <FlatList
              data={newSearch}
              numColumns = {5}
              renderItem={renderItem}
              keyExtractor={(item) => item._id}
              refreshControl = {
                <RefreshControl
                  refreshing = {facultyRefresh}
                  onRefresh = {RefreshList}
                />
              }
              
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
              style = {{flexDibrection: 'row', top: 25, left: 25, position: 'absolute'}}
      />
    
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
    
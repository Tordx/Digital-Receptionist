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
    RefreshControl,
    Image,
    ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CloseButton , SearchButton } from '../../../Components/Buttons';
import { useNavigation } from '@react-navigation/native';
import { remoteDBFaculty , remoteDBCollege } from '../../../Database/pouchDb';
import { setFacultyDatas } from '../../../Redux/FacultySlice';
import { useDispatch, useSelector } from 'react-redux';
import defaultLogo from '../../../Assets/Img/psu_logo.png'
import { setCourseData } from '../../../Redux/ClassSlice';

   export default function FacultyScreen () {

    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState('');
    const [newSearch, setNewSearch] = useState();
    const [facultyRefresh, setFacultyRefresh] = useState(false)
    const [image, setImage] = useState('https://i.imgur.com/CY1O1Y9.png');
    const [showSearch, setShowSearch] = useState(false)

    useEffect(() => {
      renderFaculty();
    }, [searchTerm]);

    const renderFaculty = async() => {

      var result = await remoteDBCollege.allDocs({
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
            new RegExp(searchTerm, 'i').test(item.Dean) ||
            new RegExp(searchTerm, 'i').test(item.CollegeAcronym)
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
      renderFaculty();
      setFacultyRefresh(false);

  }

      const renderItem = ({ item }) => {

        return(
          <Pressable 
          style = {styles.item}
          android_ripple={{
            color: 'blue',
            borderRadius: 100,
            radius: 200,
          }} 
          onPress={() => {
             dispatch(setFacultyDatas(item)); navigation.navigate('FacultyScreen2'); console.log('bug');
          }} >
            <View style = {{justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%'}}>
             
                <Image  resizeMode='contain' style = {{width: 150, height: 150, borderRadius: 500}} source = {{uri:  item.Image || image }}/>
            
            <Text style = {{fontSize: 18, fontWeight: 'bold', justifyContent: 'center', textAlign: 'center', marginTop: 30, color: '#404040', width: '90%'}}>
              {item.College.toUpperCase()}
            </Text>
            </View>
        </Pressable>
        )
      }

      return (
        <ImageBackground 
      source = {require('../../../Assets/Img/Background_image.png')} 
      style={styles.container}
      resizeMode = 'cover'
    >
      
      {newSearch ? (
        <View style = {styles.contentcontainer}>
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
       color={'#fddf54'}
       onPress={() => setShowSearch(!showSearch)}
     />}
        <FlatList
          style = {{paddingTop: showSearch ? 5: 50}}
          data={newSearch}
          showsVerticalScrollIndicator = {false}
          numColumns = {3}
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
        <CloseButton

          onPress = {() => navigation.navigate('StudentHomeScreen')}     
          name = 'arrow-back'
          color = '#404040'
          size = {40}
          style = {{flexDirection: 'row', top: 25, left: 25, position: 'absolute'}}
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
            alignContent: 'center',
            backgroundColor: '#f2f3f7',
            
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
          backgroundColor: '#fddf54',
          borderWidth: 2,
          borderColor: 'white',
          width: 300,
          height: 325,
          borderRadius: 30,
          marginVertical: 5,
          marginHorizontal: 5,
          elevation: 4,
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

         
          alignItems: 'center',
          alignSelf:'center',
          justifyContent: 'center',
          flexDirection: 'row',
          backgroundColor: '#ffff',
          width: 600,
          borderRadius: 4,
          height: 50,
          elevation: 1,
          borderWidth: .5,
          borderColor: '#a2a2a2',
          marginTop: 10,
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
    
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
    Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CloseButton , SearchButton } from '../../../Components/Buttons';
import { useNavigation } from '@react-navigation/native';
import { remoteDBFaculty , remoteDBCollage , remoteDBCourses } from '../../../Database/pouchDb';
import { setFacultyDatas } from '../../../Redux/FacultySlice';
import { useDispatch, useSelector } from 'react-redux';
import defaultLogo from '../../../Assets/Img/psu_logo.png'

   export default function FacultyScreen2 () {

    const dispatch = useDispatch();
    const {facultyDatas} = useSelector((store) => (store.facultymodal))

    const [searchTerm, setSearchTerm] = useState('');
    const [newSearch, setNewSearch] = useState();
    const [facultyRefresh, setFacultyRefresh] = useState(false)
    const [image, setImage] = useState('https://i.imgur.com/CY1O1Y9.png');

    useEffect(() => {
      renderFaculty();
    }, [searchTerm]);

    const renderFaculty = async() => {

        var result = await remoteDBCourses.allDocs({
          include_docs: true,
          attachments: true,
        });
        if (result.rows) {
          let modifiedArr = result.rows.map(function (item) {
            return item.doc;
          });
          let filteredData = modifiedArr.filter((item) => {
            return item.College  === facultyDatas.Collage
          })
          if (filteredData){
            const newFilterData = filteredData.filter((item) => {
              return item
            })
            setNewSearch(newFilterData)
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
             dispatch(setFacultyDatas(item)); navigation.navigate('FacultyMapScreen')
          }} >
             <Image resizeMode='contain' style = {{width: 125, height: 150}} source = {{uri:  item.Image || image }}/>
            <Text style = {styles.title}>
              {item.College}</Text>
            <Text style = {{fontSize: 14}}>
              {item.Collage}
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
              <Text style = {{fontSize: 20, fontWeight: 'bold', color: '#fff'}}>UNIVERSITY DEPARTMENT</Text>
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
                  style = {{backgroundColor: 'green'}}
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
    
              onPress = {() => navigation.navigate('FacultyScreen')}     
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
    
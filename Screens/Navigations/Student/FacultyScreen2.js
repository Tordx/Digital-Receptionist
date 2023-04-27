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
             <Image resizeMode='contain' style = {{width: 150, height: 150, marginBottom: 20}} source = {{uri:  item.Image || image }}/>
              <Text style = {styles.title}>
                  {item.Course}
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
              
              
            <Image  resizeMode='contain' style = {{width: 250, height: 250, borderRadius: 500, marginTop: 30, marginBottom: 20  }} source = {{uri:  facultyDatas.Image }}/>
              <View style = {{backgroundColor: '#fddf54', padding: 10, borderRadius: 5, justifyContent: 'center', alignItems: 'center', borderRadius: 30}}>
              <Text style = {{fontSize: 25, fontWeight: 'bold', color: '#404040',paddingHorizontal: 20,paddingTop: 10}}>{facultyDatas.Collage}</Text>
              <Text style = {{fontSize: 20, color: '#404040', marginTop: 5,fontWeight: '500'}}>{facultyDatas.Dean}</Text>
              <Text style = {{fontSize: 17, color: '#404040', marginTop: 5,fontWeight: '400'}}>College Dean</Text>
              </View>
              {newSearch ? (
              <FlatList
                style = {{marginTop: 20}}
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
              ) : (
              <ActivityIndicator size="large" color="#fddf54"/>
              )}
               </View>
            
            <CloseButton
    
              onPress = {() => navigation.goBack('FacultyScreen')}     
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
        backgroundColor: '#FFFF',
        borderWidth: 1,
        borderColor: '#0f2ed6',
        width: 245,
        height: 300,
        borderRadius: 30,
        marginVertical: 0,
        marginHorizontal: 5,
        elevation: 4,
        flexDirection: 'column',
  
      },
  
      title: {
  
        fontSize: 16,
        textAlign: 'center',
        color: '#404040',
        width: '85%'
  
      },
  
      text: {
  
        fontSize: 25,
        fontWeight: '500',
        left: 0,
        textAlign: 'center',
        color: 'white'
  
      },
  
      TextInput: { 

        alignSelf:'center', 
        flexDirection: 'row',
        backgroundColor: '#ffff',
        width: 600,
        borderRadius: 4,
        height: 50,
        elevation: 1,
        borderWidth: .5,
        borderColor: '#a2a2a2',
        marginTop: 10,
  
      }
  
    });
  
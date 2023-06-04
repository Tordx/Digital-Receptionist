import { View, Text, StyleSheet, FlatList, TextInput , TouchableOpacity , Image, ImageBackground, Platform, Pressable, Modal, StatusBar, ScrollView, RefreshControl } from 'react-native'
import React , {useState , useEffect ,useMemo} from 'react';
import { CloseButton } from '../../../Components/Buttons';
import { useNavigation } from '@react-navigation/native';
import EventModal from '../../../Modal/EventModal';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setEventData } from '../../../Redux/EventSlice';
import { remoteDBEvent , remoteDBBuilding } from '../../../Database/pouchDb';
import { setBuildingData } from '../../../Redux/BuildingSlice';

export default function EventScreen() {

  useEffect(() => {
    EventData()
    
  }, [searchTerm]);



  const dispatch = useDispatch()
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [showSearch, setShowSearch] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [courseRefresh, setCourseRefresh] = useState(false);
  StatusBar.setHidden(true);


  
  const EventData = async() => {
  
    try {

      var result = await remoteDBBuilding.allDocs({
        include_docs: true,
        attachments: true,
      });
      if(result.rows) {
        let modifiedArr =  result.rows.map(function(item) {
          return item.doc
        });
        let filteredData = modifiedArr.filter(item => {
          return item && (
            new RegExp(searchTerm, 'i').test(item.BuildingName)
          )
        })
        if(filteredData){
         let newFilterData = filteredData.map((item) => {
          return item 
         })
         setData(newFilterData);
        }
      }
      
    } catch (error) {
      console.log(error);
    }
  }
  const memoizedData = useMemo(() => data, [data]);

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
        color: 'blue',
        borderRadius: 100,
        radius: 200,
      }} 
      onPress={() => {
         dispatch(setBuildingData(item), navigation.navigate('BuildingMapScreen'))
      }} >
        <View style = {{marginLeft: 10, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
        <Image  resizeMode='cover' style = {{width: 175, height: 230, borderRadius: 30}} source = {{uri:  item.BuildingPicture}}/>
        <View style = {{width: '50%', height: '98%', alignItems: 'flex-start', marginLeft: 10}}>
          <Text style ={{fontSize: 20, top: 0, fontFamily: 'black', color: '#404040'}} >{item.BuildingName} </Text>
          <Text style ={{fontSize: 17, top: 0, fontFamily: 'regular', color: '#404040'}} >{item.Rooms ? `${item.Rooms.length} room(s)` : 'No rooms'}</Text>
        </View>
        </View> 
    </Pressable>
    )
  }

    return (
      <View style={styles.container}>
        <FlatList
          style = {{paddingTop: 100}}
          data={memoizedData}
          numColumns = {3}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator = {false}
          refreshControl = {
            <RefreshControl
              refreshing = {courseRefresh}
              onRefresh = {RefreshList}
            />
            
          }
          />
        <CloseButton style = {{position: 'absolute', top: 10, left: 10}}
        name = 'arrow-back'
        size = {35}
        color = {'#404040'}
        onPress = {() => navigation.goBack('StudentHomeScreen')}
        />
           <View style = {{backgroundColor: '#0f2ed6', padding: 10, borderRadius: 20, position: 'absolute', top: 20, elevation: 10, shadowColor: '#000'}}>
          {showSearch ? null : <Text style = {{fontSize: 30, fontWeight: 'bold', color: '#fff'}}>CAMPUS BUILDINGS</Text>}
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
           </View>
    )

};



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
  justifyContent: 'flex-start',
  backgroundColor: '#FFFF',
  borderWidth: 1,
  borderColor: '#0f2ed6',
  width: 400,
  height: 250,
  borderRadius: 30,
  marginVertical: 5,
  marginHorizontal: 5,
  elevation: 1,
  flexDirection: 'row'

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
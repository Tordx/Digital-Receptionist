import { View, Text, StyleSheet, FlatList, SafeAreaView , TouchableOpacity , Image, ImageBackground, Platform, Pressable, Modal, StatusBar } from 'react-native'
import React , {useState , useEffect ,useCallback} from 'react';
import { CloseButton } from '../../../Components/Buttons';
import { useNavigation } from '@react-navigation/native';
import EventModal from '../../../Modal/EventModal';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setEventData } from '../../../Redux/EventSlice';
import { remoteDBEvent } from '../../../Database/pouchDb';

export default function EventScreen() {

    useEffect(() => {
      EventData()
    }, [event]);

  const navigation = useNavigation();
  const [event, setEvent] = useState();
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(true)
  const [when, setWhen] = useState()

  StatusBar.setHidden(true);

  const handleViewableItemsChanged = useCallback(
    ({ viewableItems, changed }) => {
      setData(viewableItems[0].item)
    },
    []
  );


  
  const EventData = async() => {

    var result = await remoteDBEvent.allDocs({
      include_docs: true,
      attachments: true,
    });
    if(result.rows) {
      let modifiedArr =  result.rows.map(function(item) {
        return item.doc
      });
      let filteredData = modifiedArr.filter(item => {
        return item.Status === 'Active'
      })
      if(filteredData){
       let newFilterData = filteredData.map((item) => {
        return item 
       })
       setEvent(newFilterData);
       setLoading(false)
       setWhen(newFilterData[0].EventWhen.toString())
       console.log(newFilterData)
      }
    }

  }

    const renderItem = ({item}) => {

      return (
     <View  style = {{width: 640, height: '100%', alignItems: 'center',}}>
          <Image
            source = {{uri: item.EventImage}}
            style = {{width: '100%', height: '100%', alignSelf: 'center'}}
          />
       </View>
      )
    }

    return (
      <View style={styles.container}>
        <View style={styles.contentcontainer}>
          <View style={[styles.inputcontainer, {backgroundColor: '#fddf54'}]}>
          <FlatList
            data = {event}
            horizontal
            renderItem = {renderItem}
            keyExtractor = {item => item._id}
            onViewableItemsChanged={handleViewableItemsChanged}
            pagingEnabled
          />
        </View>
          <CloseButton style = {{position: 'absolute', top: 10, left: 10}}
          name = 'arrow-back'
          size = {35}
          color = {'#fff'}
        o   onPress = {() => navigation.goBack('StudentHomeScreen')}
          
          />
            <View style={{width: '50%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f6f6f6', borderTopLeftRadius: 20, borderBottomLeftRadius: 20}}>
            <StatusBar barStyle= 'light-content'/>
              <ImageBackground source={require('../../../Assets/Img/announcement-event-image.png')} resizeMode='cover' style = {{width: '100%', height: '100%'}}>
              <View style = {{padding: 20, justifyContent: 'flex-start', height: '100%'}}>
              <Text style = {{color: '#303030', fontSize: 35, fontFamily: 'black'}}>{data.EventName}</Text>
              <View style = {{flexDirection: 'row', marginTop: 5}}>
                <Text style = {{marginRight: 5, color: '#303030', fontSize: 15, fontFamily: 'extrabold', padding: 10, backgroundColor: '#fddf54', color: '#303030', width: '40%', borderRadius: 30, textAlign: 'center'}}>{data && data.EventWhen.toString().toUpperCase()}</Text>
                <Text style = {{color: '#303030', fontSize: 15, fontFamily: 'extrabold', padding: 10, backgroundColor: '#fddf54', color: '#303030', width: '40%', borderRadius: 30, textAlign: 'center'}}>{data && data.EventWhere.toUpperCase()}</Text>
              </View>
              <Text style = {{color: '#101010', fontSize: 25, fontFamily: 'extrabold', textAlign: 'justify', marginTop: 50, textShadowRadius: 5, textShadowColor: '#fff'}}>{data.EventDescription}</Text>
              </View>
              </ImageBackground>
          </View>
          </View>
          <Modal
          statusBarTranslucent
            visible = {loading}
            animationType='fade'
          >
            <View style = {[styles.contentcontainer, {backgroundColor: '#fddf54'}]}>
              <Text>loading Data</Text>
            </View>
          </Modal>
      </View>
    )

};



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
          borderRightWidth: 3,
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
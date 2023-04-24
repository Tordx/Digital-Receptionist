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
  const [data, setData] = useState("");
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
       console.log(newFilterData)
      }
    }

  }

    const renderItem = ({item}) => {

      return (
     <View>
          <Image
            source = {{uri: item.EventImage}}
            style = {{width: 1300, height: '100%', alignSelf: 'center', backgroundColor: 'black'} }
            resizeMode = 'contain'
          />
       </View>
      )
    }

    return (
      <View style={styles.container}>

        <View>
        <FlatList
          data = {event}
          horizontal
          renderItem = {renderItem}
          keyExtractor = {item => item._id}
          onViewableItemsChanged={handleViewableItemsChanged}
        />
      </View>
        <CloseButton style = {{position: 'absolute', top: 10, left: 10}}
        name = 'arrow-back'
        size = {35}
        color = {'#fff'}
        onPress = {() => navigation.goBack('StudentHomeScreen')}
        />
         <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
         <StatusBar barStyle= 'light-content'/>
           <View style = {{width: '100%', height: '100%', backgroundColor: '#00000070' }}>
            <View style = {{padding: 20, paddingLeft: 50, justifyContent: 'flex-start', height: '100%'}}>
            <Text style = {{color: '#fff', fontSize: 35, fontWeight: '500'}}>Event Name:{data.EventName}</Text>
            <Text style = {{color: '#fff', fontSize: 25}}>Event Tagline: {data.EventTagline}</Text>
            <Text style = {{color: '#fff', fontSize: 25}}>Event Where: {data.EventWhere}</Text>
            <Text style = {{color: '#fff', fontSize: 25}}>Event When: {data.EventWhen}</Text>
            <Text style = {{color: '#fff', fontSize: 25}}>Event Description: {data.EventDescription}</Text>
            </View>
           </View>
        </View>

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
          width: '100%', 
          height: '100%', 
          justifyContent: 'center', 
          alignItems: 'center',
        
        },
      
        inputcontainer:{
          
          justifyContent: 'center', 
          alignItems: 'center', 
          width: '100%',
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
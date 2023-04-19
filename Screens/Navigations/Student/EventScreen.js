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

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [event, setEvent] = useState();
  const [data, setData] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const {eventData} = useSelector((store) => (store.eventmodal))
  StatusBar.setHidden(true);

  const handleViewableItemsChanged = useCallback(
    ({ viewableItems, changed }) => {
      // Run your function here
      console.log('====================================changed');
      console.log(changed[0].item.EventName);
      setData(changed[0].item)
        // dispatch(setEventData(changed[0].item))
      console.log('====================================changed');
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

  // const handleViewableItemsChanged = ({ viewableItems, changed }) => {

  //   // Run your function here
  
  //   console.log('Viewable items changed:', viewableItems);
  // };


  
    const renderItem = ({item}) => {
      console.log('====================================item EventImage');
      console.log(item.EventName);
      console.log('====================================item EventImage');
      
  
      return (
     <View>
          <Image
            source = {{uri: item.EventImage}}
            style = {{width: 650, height: '100%', alignSelf: 'center'}}
            // resizeMode = 'contain'
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
        />
      </View>
        <CloseButton style = {{position: 'absolute', top: 10, left: 10}}
        name = 'arrow-back'
        size = {35}
        color = {'#fff'}
        onPress = {() => navigation.goBack('StudentHomeScreen')}
        />
        {/* <Modal
          statusBarTranslucent 
          visible = {openModal}
          onRequestClose = {() => setOpenModal(false)}
          animationType = 'fade'
          transparent
        > */}
         <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
         <StatusBar barStyle= 'light-content'/>
           {/* <Image
            source = {{uri: eventData.EventImage}}
            resizeMode = 'contain'asd
            style = {{width: '100%', height: 800}}
           /> */}
           <View style = {{width: '100%', height: 400, backgroundColor: '#00000070' }}>
            <View style = {{padding: 20, paddingLeft: 50, justifyContent: 'flex-start', height: '100%'}}>
            <Text style = {{color: '#fff', fontSize: 25, fontWeight: '500'}}>{data.EventName}</Text>
            <Text style = {{color: '#fff', fontSize: 17}}>{data.EventTagline}</Text>
            <Text style = {{color: '#fff', fontSize: 17}}>{data.EventWhere}</Text>
            <Text style = {{color: '#fff', fontSize: 17}}>{data.EventWhen}</Text>
            </View>
           </View>
        </View>
        {/* </Modal> */}
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
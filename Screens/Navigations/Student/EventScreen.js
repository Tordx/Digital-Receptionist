import { View, Text, StyleSheet, FlatList, SafeAreaView , TouchableOpacity , Image, ImageBackground, Platform, Pressable, Modal, StatusBar } from 'react-native'
import React , {useState , useEffect} from 'react';
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
  const [openModal, setOpenModal] = useState(false);
  const {eventData} = useSelector((store) => (store.eventmodal))
  StatusBar.setHidden(true);
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
      console.log('====================================item EventImage');
      console.log(item.EventImage);
      console.log('====================================item EventImage');
      
      

      return (
        <Pressable style = {{justifyContent: 'center', alignContent: 'center', alignSelf: 'center',}}
          onPress = {() => { dispatch(setEventData(item)); setOpenModal(true)}}
        >
          <Image
            source = {{uri: item.EventImage}}
            style = {{width: 1280, height: '100%', alignSelf: 'center'}}
            resizeMode = 'contain'
          />
        </Pressable>
      )
    }
    
    return (
      <View style = {{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000'}}>
       
        <FlatList
          data = {event}
          horizontal
          renderItem = {renderItem}
          keyExtractor = {item => item._id}
        />

        <CloseButton style = {{position: 'absolute', top: 10, left: 10}}
        name = 'arrow-back'
        size = {35}
        color = {'#fff'}
        onPress = {() => navigation.goBack('StudentHomeScreen')}
        />
        <Modal
          statusBarTranslucent 
          visible = {openModal}
          onRequestClose = {() => setOpenModal(false)}
          animationType = 'fade'
          transparent
        >
         <Pressable style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} onPress = {() => setOpenModal(false)}>
         <StatusBar barStyle= 'light-content'/>
           {/* <Image
            source = {{uri: eventData.EventImage}}
            resizeMode = 'contain'
            style = {{width: '100%', height: 800}}
           /> */}
           <View style = {{width: '100%', height: 150, backgroundColor: '#00000070', position: 'absolute', bottom: 0, justifyContent: 'center', }}>
            <View style = {{padding: 20, paddingLeft: 50, justifyContent: 'flex-start', height: '100%'}}>
            <Text style = {{color: '#fff', fontSize: 25, fontWeight: '500'}}>{eventData.EventName}</Text>
            <Text style = {{color: '#fff', fontSize: 17}}>{eventData.EventTagline}</Text>
            <Text style = {{color: '#fff', fontSize: 17}}>{eventData.EventWhere}</Text>
            <Text style = {{color: '#fff', fontSize: 17}}>{eventData.EventWhen}</Text>
            </View>
           </View>
        </Pressable>
        </Modal>
      </View>
    )

};
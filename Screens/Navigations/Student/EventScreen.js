import { View, Text, StyleSheet, FlatList, SafeAreaView , TouchableOpacity , Image } from 'react-native'
import React , {useState , useEffect} from 'react';
import { CloseButton } from '../../../ScreenComponents/Buttons';
import { useNavigation } from '@react-navigation/native';
import { remoteDBEvent } from '../../../Database/pouchDb';
import EventModal from '../../../Modal/EventModal';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { openEventModal } from '../../../Redux/EventSlice';
import { setEventData } from '../../../Redux/EventSlice';

export default function EventScreen() {

  const user = useSelector(state => state.essensials.user)
  const dispatch = useDispatch()
  const [EventData , setEventDatas] = useState('')
  // const {isOpen} = useSelector((store) => store.modal)

    useEffect(() => {

      getEventData()

    }, []);

    const navigation = useNavigation();

    const getEventData = async() => {

    var result = await remoteDBEvent.allDocs({
      include_docs: true,
      attachments: true
    });
    if(result.rows){
        let modifiedArr = result.rows.map(function(item){
        return item.doc
    });
    let filteredData = modifiedArr.filter(item => {
        return item;
      });
      if(filteredData) {
          let newFilterData = filteredData.map(item => {
              return item
          })
          setEventDatas(newFilterData)
           
      }
  }  
};
      const back = () => {
        if(user == 'STUDENT'){
          navigation.navigate('Student_HomeScreen')
        }else{
          navigation.navigate('GuestHomeScreen')
        }
      }


      const renderItem = ({ item }) => {
          // console.log(item.EventImage)
          // console.log('item.EventImage')
        return(
        <TouchableOpacity onPress={() => {
          dispatch(openEventModal()) ; dispatch(setEventData(item))
        }} >
          <View style = {styles.item}>
            <Text style = {styles.title}>
              {item.EventName}
            </Text>
            <Image
                resizeMode="cover" style={{width: 550, height: 700}} source={{uri:item.EventImage}}
                
                />
          </View>
        </TouchableOpacity>
        )
      }

    return (
      <SafeAreaView style={styles.container}>
        
        <FlatList
          horizontal
          data={EventData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />

        <CloseButton
          
          onPress = {back}
          name = 'arrow-back'
          size = {50}
          style = {{flexDirection: 'row', top: 0, left: 0, position: 'absolute', marginVertical: 27, marginHorizontal: 20}}

        />
        <EventModal/>
      </SafeAreaView>
    );
  

}

const styles = StyleSheet.create({

  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      
  },

  item: {

      justifyContent: 'center',
      backgroundColor: 'white',
      padding: 30,
      width: 600,
      margin: 20,
      marginBottom: 20,
      height: 800,
      borderRadius: 10,

  },

  title: {

    fontSize: 32,
  },
});
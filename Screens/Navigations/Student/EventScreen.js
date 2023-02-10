import { View, Text, StyleSheet, FlatList, SafeAreaView , TouchableOpacity , Image } from 'react-native'
import React , {useState , useEffect} from 'react';
import { CloseButton } from '../../../Components/Buttons';
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
      FakeData()
      // getEventData()

    }, []);

    const navigation = useNavigation();

//     const getEventData = async() => {

//     var result = await remoteDBEvent.allDocs({
//       include_docs: true,
//       attachments: true
//     });
//     if(result.rows){
//         let modifiedArr = result.rows.map(function(item){
//         return item.doc
//     });
//     let filteredData = modifiedArr.filter(item => {
//         return item;
//       });
//       if(filteredData) {
//           let newFilterData = filteredData.map(item => {
//               return item
//           })
//           setEventDatas(newFilterData)
           
//       }
//   }  
// };

const FakeData = async() => {

  const data = ([
    {
      "_id": "63de6f6b8ac3f37a9d5967f3",
      "EventName": "Maddox",
      "EventTagline": "Robin",
      "EventWhere": "Jami",
      "EventWhen": "Fri Sep 25 2020 17:59:37 GMT+0800 (China Standard Time)",
      "picture": "http://placehold.it/32x32",
      "AdminVicePresident": "Stark"
    },
    {
      "_id": "63de6f6b2c54f9baf8c1741b",
      "EventName": "Ward",
      "EventTagline": "Hooper",
      "EventWhere": "Leila",
      "EventWhen": "Fri Jul 24 1992 01:31:39 GMT+0800 (China Standard Time)",
      "picture": "http://placehold.it/32x32",
      "AdminVicePresident": "Fern"
    },
    {
      "_id": "63de6f6bb08760168a676847",
      "EventName": "Lambert",
      "EventTagline": "Ward",
      "EventWhere": "Perez",
      "EventWhen": "Mon Jan 03 2000 08:09:17 GMT+0800 (China Standard Time)",
      "picture": "http://placehold.it/32x32",
      "AdminVicePresident": "Klein"
    },
    {
      "_id": "63de6f6bce468c85e67952d4",
      "EventName": "Spence",
      "EventTagline": "Louise",
      "EventWhere": "Jennings",
      "EventWhen": "Mon May 19 1980 01:46:05 GMT+0800 (China Standard Time)",
      "picture": "http://placehold.it/32x32",
      "AdminVicePresident": "Claudine"
    },
    {
      "_id": "63de6f6b3bf7114fc8de2127",
      "EventName": "Graham",
      "EventTagline": "Ernestine",
      "EventWhere": "Ashlee",
      "EventWhen": "Fri Nov 27 1987 10:13:53 GMT+0800 (China Standard Time)",
      "picture": "http://placehold.it/32x32",
      "AdminVicePresident": "Marissa"
    },
    {
      "_id": "63de6f6b1980ba2e4b5b92eb",
      "EventName": "Mcintyre",
      "EventTagline": "Cherie",
      "EventWhere": "Randi",
      "EventWhen": "Wed May 07 2008 05:56:57 GMT+0800 (China Standard Time)",
      "picture": "http://placehold.it/32x32",
      "AdminVicePresident": "Hamilton"
    },
    {
      "_id": "63de6f6b6ef32249804054f0",
      "EventName": "Pierce",
      "EventTagline": "Huber",
      "EventWhere": "Diaz",
      "EventWhen": "Sun Oct 03 1971 15:09:41 GMT+0800 (China Standard Time)",
      "picture": "http://placehold.it/32x32",
      "AdminVicePresident": "Jacobs"
    },
    {
      "_id": "63de6f6bd9b41f60ba41d1e2",
      "EventName": "Cain",
      "EventTagline": "Sargent",
      "EventWhere": "Savage",
      "EventWhen": "Mon Nov 05 1984 21:13:23 GMT+0800 (China Standard Time)",
      "picture": "http://placehold.it/32x32",
      "AdminVicePresident": "Garza"
    },
    {
      "_id": "63de6f6b3d9293e17455ecf3",
      "EventName": "Cobb",
      "EventTagline": "Celeste",
      "EventWhere": "Meagan",
      "EventWhen": "Wed Feb 16 1977 18:16:02 GMT+0800 (China Standard Time)",
      "picture": "http://placehold.it/32x32",
      "AdminVicePresident": "Payne"
    },
    {
      "_id": "63de6f6b71f2c5db91e937f4",
      "EventName": "Whitley",
      "EventTagline": "Jerri",
      "EventWhere": "Trevino",
      "EventWhen": "Wed Aug 16 1989 04:50:24 GMT+0900 (China Daylight Time)",
      "picture": "http://placehold.it/32x32",
      "AdminVicePresident": "Beck"
    }
  ])
  setEventDatas(data)

}
      const back = () => {
        if(user == 'STUDENT'){
          navigation.navigate('StudentHomeScreen')
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
          
          onPress = {() => navigation.navigate('StudentHomeScreen')}
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
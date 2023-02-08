import React , {useState , useEffect} from 'react';
import { 
    
    View, 
    FlatList, 
    StyleSheet, 
    Text,  
    TextInput,
    ImageBackground,
    TouchableOpacity,
    Pressable
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CloseButton , AddButton, SearchButton } from '../../../ScreenComponents/Buttons';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Button } from 'react-native-paper';
import { remoteDBSchedules } from '../../../Database/pouchDb';
import ClassModal from '../../../Modal/ClassModal';
import { useDispatch } from 'react-redux';
import { openClassModal, setClassData } from '../../../Redux/ClassSlice';

  export const ClassScreen = () => {

    useEffect(() => {
      FakeData()
      // Nextclass()
      // Ongoingclass()
      // PreviousClass()
    }, []);

    // const [itemdata,setItemdata] = useState('')
    const [nextclass,setNextclass] = useState('')
    const [ongoingclass,setOngoingclass] = useState('')
    const [previousclass,setPreviousclass] = useState('')
    // const [previousclasstime,setPreviousClassTime] = useState('')
    // const [ongoingcclasstime,setOngoingClassTime] = useState('')
    // const [nextclasstime,setNextClassTime] = useState('')
   
//     const Nextclass = async() => {

//       var date = new Date();
//       function addHours(numOfHours, date = new Date()) {
//         date.setHours(date.getHours() + numOfHours);
      
//         return date;
//       }
//       const newadd = (addHours(1, date));
//       var xxxxx = newadd.getHours() + ":" + newadd.getMinutes() + ":" + newadd.getSeconds();
//       xxxxx = xxxxx.split(':');// here the time is like "16:14"
//       let newadds = xxxxx[0] >= 12 && (xxxxx[0]-12 || 12) + ':' + '00' + ' PM' || (Number(xxxxx[0]) || 12) + ':' + '00' + ' AM';
//       console.log(newadds)
//       // setNextClassTime(newadds)
        
//       var result = await remoteDBSchedules.allDocs({
//         include_docs: true,
//         attachments: true
//       });
//       if(result.rows){
//           let modifiedArr = result.rows.map(function(item){
//            return item.doc
//       });
//       let filteredData = modifiedArr.filter(item => {
//           return item.StartTime === newadds;
//         });
//         if(filteredData) {
//             let newFilterData = filteredData.map(item => {
//                 return item
//             })
//             setNextclass(newFilterData)
//         }
//   }  
// }
//       const Ongoingclass = async() => {

//         var date = new Date();
//         var time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
//         time = time.split(':');// here the time is like "16:14"
//         let meridiemTime = time[0] >= 12 && (time[0]-12 || 12) + ':' + '00' + ' PM' || (Number(time[0]) || 12) + ':' + '00' + ' AM';
//         console.log(meridiemTime)
//         // setOngoingClassTime(meridiemTime)
              
//         var result = await remoteDBSchedules.allDocs({
//           include_docs: true,
//           attachments: true
//         });
//         if(result.rows){
//             let modifiedArr = result.rows.map(function(item){
//             return item.doc
//         });
//         let filteredData = modifiedArr.filter(item => {
//             return item.StartTime === meridiemTime;
//           });
//           if(filteredData) {
//               let newFilterData = filteredData.map(item => {
//                   return item
//               })
//               setOngoingclass(newFilterData)
//           }
//       }  
//       }

//       const PreviousClass = async() => {

//         var date = new Date();
//         function subtractHours(numOfHours, date = new Date()) {
//           date.setHours(date.getHours() - numOfHours);
        
//           return date;
//         }
//         const newsubtracted = (subtractHours(1, date));
//         var xxxx = newsubtracted.getHours() + ":" + newsubtracted.getMinutes() + ":" + newsubtracted.getSeconds();
//         xxxx = xxxx.split(':');// here the time is like "16:14"
//         let meridiemTimex = xxxx[0] >= 12 && (xxxx[0]-12 || 12) + ':' + '00' + ' PM' || (Number(xxxx[0]) || 12) + ':' + '00' + ' AM';
//         console.log(meridiemTimex)
//         // setPreviousClassTime(meridiemTimex)
    
              
//         var result = await remoteDBSchedules.allDocs({
//           include_docs: true,
//           attachments: true
//         });
//         if(result.rows){
//             let modifiedArr = result.rows.map(function(item){
//             return item.doc
//         });
//         let filteredData = modifiedArr.filter(item => {
//             return item.StartTime === meridiemTimex;
//           });
//           if(filteredData) {
//               let newFilterData = filteredData.map(item => {
//                   return item
//               })
//               setPreviousclass(newFilterData)
//           }
//       }  
//       }

const FakeData = async() => {

  const data = ([
    {
      "_id": "63de71c7034da5070d40bc49",
      "Classname": "AB English Language",
      "Subject": "Lowery",
      "Room": "Shawn",
      "StartTime": "Tue May 08 2018 18:32:16 GMT+0800 (China Standard Time)",
      "picture": "http://placehold.it/32x32"
    },
    {
      "_id": "63de71c73053a8bc9df4644d",
      "Classname": "AB Economics",
      "Subject": "Alice",
      "Room": "Coffey",
      "StartTime": "Wed Apr 26 2006 03:01:11 GMT+0800 (China Standard Time)",
      "picture": "http://placehold.it/32x32"
    },
    {
      "_id": "63de71c725ffe1d441d85621",
      "Classname": "Bachelor of Secondary Education",
      "Subject": "Antonia",
      "Room": "Callie",
      "StartTime": "Mon Dec 29 1975 07:25:59 GMT+0800 (China Standard Time)",
      "picture": "http://placehold.it/32x32"
    },
    {
      "_id": "63de71c7560cabe453f108ae",
      "Classname": "Bachelor of Technology and Livelihood Education",
      "Subject": "Lucy",
      "Room": "Elisabeth",
      "StartTime": "Mon May 30 1977 00:29:15 GMT+0800 (China Standard Time)",
      "picture": "http://placehold.it/32x32"
    },
    {
      "_id": "63de71c76477bdc469b1e124",
      "Classname": "Bachelor of Technical and Vocational Teacher Education",
      "Subject": "Meghan",
      "Room": "Robyn",
      "StartTime": "Thu May 04 2017 07:56:20 GMT+0800 (China Standard Time)",
      "picture": "http://placehold.it/32x32"
    },
    {
      "_id": "63de71c7b171b2747bcce609",
      "Classname": "Bachelor of Public Administration",
      "Subject": "Holcomb",
      "Room": "Patsy",
      "StartTime": "Wed Dec 07 1977 22:14:36 GMT+0800 (China Standard Time)",
      "picture": "http://placehold.it/32x32"
    },
    {
      "_id": "63de71c753351329eeda34c4",
      "Classname": "BS Biology",
      "Subject": "Alba",
      "Room": "Roslyn",
      "StartTime": "Tue May 06 1975 12:41:04 GMT+0800 (China Standard Time)",
      "picture": "http://placehold.it/32x32"
    },
    {
      "_id": "63de71c7adfe589108c9e4d5",
      "Classname": "BS Computer Science",
      "Subject": "Cooley",
      "Room": "Hope",
      "StartTime": "Sun Mar 11 1990 04:54:30 GMT+0800 (China Standard Time)",
      "picture": "http://placehold.it/32x32"
    },
    {
      "_id": "63de71c767b95681962d8aeb",
      "Classname": "BS Information Technology",
      "Subject": "Hart",
      "Room": "Oneill",
      "StartTime": "Sat Jul 24 2021 17:22:49 GMT+0800 (China Standard Time)",
      "picture": "http://placehold.it/32x32"
    },
    {
      "_id": "63de71c7afebd3874ec16427",
      "Classname": "BS Hospitality Management",
      "Subject": "Chen",
      "Room": "Travis",
      "StartTime": "Thu Mar 20 2014 14:36:59 GMT+0800 (China Standard Time)",
      "picture": "http://placehold.it/32x32"
    }
  ])
  setNextclass(data)
  setOngoingclass(data)
  setPreviousclass(data)

}

    const filterData = () => {

      if (!searchTerm) return;

      setFilteredData(
        ongoingclass.filter(item =>
        item.Classname.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    };

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState(ongoingclass);
    const navigation = useNavigation();
    
    const dispatch = useDispatch();
    const renderItem = ({ item }) => {

      return(
        <Pressable
        style = {styles.item}
        android_ripple={{
          color: 'red'
        }}
        onPress={() => {
          dispatch(openClassModal()) ; dispatch(setClassData(item))
        }} >
          
            <Text style = {styles.title}>
              {item.Classname}
            </Text>
            <Text  style = {{position: 'absolute', right: 20}}>Learn more</Text>
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
        
        <View style = {{marginTop: 75}}>
         
            <FlatList
              data={filteredData}
              renderItem={renderItem}
              keyExtractor={item => item.id}
          />
           </View> 
        <View style = {styles.TextInput}>
        <TextInput
            style  = {{width: '100%', fontSize: 17}}
         
        />
        <SearchButton onPress={filterData}/>
        </View>
        <CloseButton

          onPress = {() => navigation.navigate('StudentHomeScreen')}     
          name = 'arrow-back'
          size = {40}
          style = {{flexDirection: 'row', top: 25, left: 25, position: 'absolute'}}
  />
      </View>

    </ImageBackground>
  )

      // return (
      //   <ImageBackground style={styles.container}
      //   source = {require('../../../Assets/Img/Background_image.png')}

      //   >
       
        // <ScrollView>
        // <View>
         
        //     <FlatList
        //       data={ongoingclass}
        //       renderItem={renderItem}
        //       keyExtractor={item => item.id}
        //   />
        //    </View> 
        // </ScrollView>
      //   <View style = {styles.TextInput}>
      //       <Icon
            
      //       name = 'search'
      //       size={30}
      //       style = {{margin: 10}}

      //       />
      //       <TextInput
      //           placeholder='Search Classes'
      //           style = {{fontSize: 20,}}
                
      //       />
        
        
      //   </View>
      //   <CloseButton

      //     onPress = {() => navigation.navigate('StudentHomeScreen')}
      //     name = 'arrow-back'
      //     size = {50}
      //     style = {{flexDirection: 'row', top: 0, left: 0, position: 'absolute', margin: 20}}
      //   />
      //   <ClassModal/>
      //   </ImageBackground>
      // );
    

  }

  const styles = StyleSheet.create({


    contentcontainer: {

      width: '95%',
      height: '95%',
      backgroundColor: '#fff',
      shadowColor: "#000",
      shadowOffset: {
        width: 1,
        height: 2,
      },
      shadowOpacity: 1,
      shadowRadius: 3.41,
      elevation: 5,
      justifyContent: 'center',
      alignContent: 'center',
      borderRadius: 4,

    },
    container: {

        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f2f3f7',
        
    },

    item: {

        justifyContent: 'center',
        alignself: 'center',
        backgroundColor: '#fff',
        padding: 30,
        width: '98%',
        height: 100,
        borderRadius: 3,
        marginVertical: 8,
        marginHorizontal: 16,
        shadowColor: "#000",
        shadowOffset: {
	        width: 1,
	        height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 3.41,
        elevation: 5,

    },

    title: {

      fontSize: 32,

    },

    text: {

      fontSize: 25,
      fontWeight: '500',
      left: 0,
      textAlign: 'center',
      color: 'white'

    },

    status: {
      
      width: 200, 
      height: 50, 
      backgroundColor: 'red', 
      margin: 20,
      borderRadius: 20,
      justifyContent: 'center'

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

  export default ClassScreen;
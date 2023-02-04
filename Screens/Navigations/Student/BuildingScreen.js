import React , {useEffect , useState} from 'react';
import { 
    
    View, 
    FlatList, 
    StyleSheet, 
    Text,
    ImageBackground,
    TouchableOpacity,
    Image  
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CloseButton } from '../../../ScreenComponents/Buttons';
import { useNavigation } from '@react-navigation/native';
import { SearchBar } from '../../../ScreenComponents/SearchBar';
import { useSelector } from 'react-redux';
import { remoteDBBuilding } from '../../../Database/pouchDb';
import { useDispatch } from 'react-redux';
import { openBuildingModal , setBuildingData } from '../../../Redux/BuildingSlice';
import BuildingModal from '../../../Modal/BuildingModal';


  export default function BuildingScreen () {

    const dispatch = useDispatch()
    const user = useSelector(state => state.essensials.user)
    const navigation = useNavigation();

    // const dispatch = useDispatch()
    const [buidlingdata , setBuildingDatas] = useState('')
  // const {isOpen} = useSelector((store) => store.modal)

    useEffect(() => {
      FakeData()
      // getEventData()

    }, []);


//     const getEventData = async() => {

//     var result = await remoteDBBuilding.allDocs({
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
//           setBuildingDatas(newFilterData)
           
//       }
//   }  
// };

const FakeData = async() => {

  const data = ([
    {
      "_id": "63de6ebc0c3b6dafa15a6322",
      "name": "Hickman",
      "AdminName": "Lavonne",
      "BuildingName": "Maggie",
      "BuildingLocation": "Bennett",
      "picture": "http://placehold.it/32x32",
      "AdminVicePresident": "Becker"
    },
    {
      "_id": "63de6ebc5fc8b4a9554135c4",
      "name": "Price",
      "AdminName": "Schultz",
      "BuildingName": "Angeline",
      "BuildingLocation": "Lakisha",
      "picture": "http://placehold.it/32x32",
      "AdminVicePresident": "Anna"
    },
    {
      "_id": "63de6ebc84f052f15d5ddcef",
      "name": "Gray",
      "AdminName": "Landry",
      "BuildingName": "Reid",
      "BuildingLocation": "Poole",
      "picture": "http://placehold.it/32x32",
      "AdminVicePresident": "Lott"
    },
    {
      "_id": "63de6ebc7286ee6372489006",
      "name": "Rosario",
      "AdminName": "Marilyn",
      "BuildingName": "Neal",
      "BuildingLocation": "Lindsey",
      "picture": "http://placehold.it/32x32",
      "AdminVicePresident": "Ortega"
    },
    {
      "_id": "63de6ebccb5b0f0c87cf92cc",
      "name": "Bird",
      "AdminName": "Eva",
      "BuildingName": "Bailey",
      "BuildingLocation": "Goff",
      "picture": "http://placehold.it/32x32",
      "AdminVicePresident": "Sherri"
    },
    {
      "_id": "63de6ebce4c2d1d678d1b04b",
      "name": "Benton",
      "AdminName": "Juliana",
      "BuildingName": "Adrienne",
      "BuildingLocation": "Walls",
      "picture": "http://placehold.it/32x32",
      "AdminVicePresident": "Fern"
    },
    {
      "_id": "63de6ebc10a3bea7420007a9",
      "name": "Hogan",
      "AdminName": "Aileen",
      "BuildingName": "Russo",
      "BuildingLocation": "Deleon",
      "picture": "http://placehold.it/32x32",
      "AdminVicePresident": "Hilda"
    },
    {
      "_id": "63de6ebccde096a991909a0e",
      "name": "Ware",
      "AdminName": "Ellis",
      "BuildingName": "Burks",
      "BuildingLocation": "Earnestine",
      "picture": "http://placehold.it/32x32",
      "AdminVicePresident": "Valentine"
    },
    {
      "_id": "63de6ebc97c7d1d775fef7c6",
      "name": "Conner",
      "AdminName": "Shelia",
      "BuildingName": "Lily",
      "BuildingLocation": "Silva",
      "picture": "http://placehold.it/32x32",
      "AdminVicePresident": "Stevens"
    },
    {
      "_id": "63de6ebc17125fbdb6411590",
      "name": "Mullins",
      "AdminName": "Adeline",
      "BuildingName": "Dora",
      "BuildingLocation": "Nancy",
      "picture": "http://placehold.it/32x32",
      "AdminVicePresident": "Gomez"
    }
  ])
  setBuildingDatas(data)

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
        dispatch(openBuildingModal()) ; dispatch(setBuildingData(item))
      }} >
      <View style = {styles.item}>
        <Text style = {styles.title}>
          {item.BuildingName}
        </Text>
        <Image
            resizeMode="cover" style={{width: 550, height: 300}} source={{uri:item.BuildingPicture}}
            
            />
      </View>
    </TouchableOpacity>
    )
  }


    // const renderItem = ({ item }) => (
    //     <Item title={item.title} />
    //   );

      return (
        <ImageBackground style={styles.container}
        source = {require('../../../Assets/Img/Background_image.png')}

        >
           
            <SafeAreaView style = {{
                justifyContent: 'center',
                alignItems: 'center',}}>
                
                <SearchBar
                    placeholder = 'Search Buildings'
                    style={{top: 75}}
                />
                <CloseButton
                    onPress = {back}
                    name = 'arrow-back'
                    size = {50}
                    style = {{flexDirection: 'row', top: 0, left: 0, position: 'absolute', marginVertical: 27, marginHorizontal: 20}}
/>
            <View style = {{justifyContent: 'center', alignSelf: 'center', paddingTop: 100}}>
                <FlatList
                    showsVerticalScrollIndicator = {false}
                    numColumns = '2'
                    data={buidlingdata}
                    renderItem={renderItem}
                    keyExtractor={item => item._id}
                />
            </View>
            </SafeAreaView>
            <BuildingModal/>
        </ImageBackground>
      );
    

  }

  const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        
    },

    item: {

        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        padding: 30,
        width: 600,
        height: 300,
        borderRadius: 10,
        marginVertical: 16,
        marginHorizontal: 16,
        shadowColor: "#000",
        shadowOffset: {
	        width: 1,
	        height: 2,
        },
        shadowOpacity: 0.6,
        shadowRadius: 2,
        elevation: 3,

    },

    title: {

      fontSize: 32,
    },
  });
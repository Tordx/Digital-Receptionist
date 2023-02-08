import React , {useState , useEffect} from 'react';
import { 
    
    View, 
    FlatList, 
    StyleSheet, 
    Text,
    ImageBackground, 
    TouchableOpacity 
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CloseButton , AddButton } from '../../../ScreenComponents/Buttons';
import { useNavigation } from '@react-navigation/native';
import { SearchBar } from '../../../ScreenComponents/SearchBar';
import { remoteDBAdmin } from '../../../Database/pouchDb';
import AdminModal from '../../../Modal/AdminModal';
import { useDispatch } from 'react-redux';
import { openAdminModal } from '../../../Redux/AdminSlice';
import { setAdminData } from '../../../Redux/AdminSlice';
import { useSelector } from 'react-redux';

  export default function AdminScreen () {
    
    

    const user = useSelector(state => state.essensials.user)
    const dispatch = useDispatch()
    const [admindata , setAdminDatas] = useState([])

    useEffect(() => {
      FakeData()
      // getAdminData()

    }, []);



    const navigation = useNavigation();

    // const getAdminData = async() => {

  //   var result = await remoteDBAdmin.allDocs({
  //     include_docs: true,
  //     attachments: true
  //   });
  //   if(result.rows){
  //       let modifiedArr = result.rows.map(function(item){
  //       return item.doc
  //   });
  //   let filteredData = modifiedArr.filter(item => {
  //       return item;
  //     });
  //     if(filteredData) {
  //         let newFilterData = filteredData.map(item => {
  //             return item
  //         })
  //         setAdminDatas(newFilterData)
  //     }
  // // }  
  //   }

 const FakeData = async() => {

  const data = ([
    {
      "_id": "63de6da17c07193d98cdf9f6",
      "name": "Rojas",
      "AdminName": "Deanne",
      "AdminBuilding": "Maddox",
      "AdminPresident": "Raymond",
      "picture": "http://placehold.it/32x32",
      "AdminVicePresident": "Barry"
    },
    {
      "_id": "63de6da14279fdac7417e802",
      "name": "Mcbride",
      "AdminName": "Dalton",
      "AdminBuilding": "Shirley",
      "AdminPresident": "Felicia",
      "picture": "http://placehold.it/32x32",
      "AdminVicePresident": "Michael"
    },
    {
      "_id": "63de6da1e09d9cb4d42f0ed4",
      "name": "Heath",
      "AdminName": "Clayton",
      "AdminBuilding": "Gonzalez",
      "AdminPresident": "Valdez",
      "picture": "http://placehold.it/32x32",
      "AdminVicePresident": "Willie"
    },
    {
      "_id": "63de6da1e019d0b6c6aa3be3",
      "name": "Ramsey",
      "AdminName": "Stephenson",
      "AdminBuilding": "Maynard",
      "AdminPresident": "Audrey",
      "picture": "http://placehold.it/32x32",
      "AdminVicePresident": "Lola"
    },
    {
      "_id": "63de6da174412d92266efd50",
      "name": "Jones",
      "AdminName": "Chambers",
      "AdminBuilding": "Merritt",
      "AdminPresident": "Francis",
      "picture": "http://placehold.it/32x32",
      "AdminVicePresident": "Odonnell"
    },
    {
      "_id": "63de6da1cfcfd0d50227af1e",
      "name": "Acevedo",
      "AdminName": "Townsend",
      "AdminBuilding": "Jeanine",
      "AdminPresident": "Rosales",
      "picture": "http://placehold.it/32x32",
      "AdminVicePresident": "Wooten"
    },
    {
      "_id": "63de6da180dd96c367dd8b05",
      "name": "Thompson",
      "AdminName": "Donna",
      "AdminBuilding": "Maggie",
      "AdminPresident": "Debora",
      "picture": "http://placehold.it/32x32",
      "AdminVicePresident": "Coleen"
    },
    {
      "_id": "63de6da1557736a588b95158",
      "name": "Marshall",
      "AdminName": "Mcconnell",
      "AdminBuilding": "Washington",
      "AdminPresident": "Leticia",
      "picture": "http://placehold.it/32x32",
      "AdminVicePresident": "Peterson"
    },
    {
      "_id": "63de6da13558cbea49425abf",
      "name": "Roberts",
      "AdminName": "Small",
      "AdminBuilding": "Lina",
      "AdminPresident": "Thomas",
      "picture": "http://placehold.it/32x32",
      "AdminVicePresident": "Velazquez"
    },
    {
      "_id": "63de6da167e09e748289293a",
      "name": "Silva",
      "AdminName": "Nicole",
      "AdminBuilding": "Lott",
      "AdminPresident": "Leon",
      "picture": "http://placehold.it/32x32",
      "AdminVicePresident": "Valencia"
    }
  ])
  setAdminDatas(data)

}

    const renderItem = ({ item }) => {
 
      return(
        <TouchableOpacity onPress={() => {
          dispatch(openAdminModal()) ; dispatch(setAdminData(item))
        }} >
        <View style = {styles.item}>
          <Text style = {styles.title}>
            {item.AdminName}
          </Text>
        </View>
      </TouchableOpacity>
      )
  }

      return (
        <ImageBackground style={styles.container}
        source = {require('../../../Assets/Img/Background_image.png')}

        >
           
            <SafeAreaView style = {{
                justifyContent: 'center',
                alignItems: 'center',}}>
                
               
            <View style = {{justifyContent: 'center', alignSelf: 'center', paddingTop: 100}}>
                <FlatList
                    showsVerticalScrollIndicator = {false}
                    numColumns = '4'
                    data={admindata}
                    renderItem={renderItem}
                    keyExtractor={item => item._id}
                />
            </View>
            </SafeAreaView>
            
            <CloseButton
                    onPress = {() => navigation.navigate('StudentHomeScreen')}
                    name = 'arrow-back'
                    size = {50}
                    style = {{flexDirection: 'row', top: 0, left: 0, position: 'absolute', margin: 20}}
            />
            <AdminModal/>
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
        width: 275,
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
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

      getEventData()

    }, []);


    const getEventData = async() => {

    var result = await remoteDBBuilding.allDocs({
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
          setBuildingDatas(newFilterData)
           
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
                    keyExtractor={item => item.id}
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
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
    const [admindata , setAdminDatas] = useState('')

    useEffect(() => {

      getAdminData()

    }, []);

    const navigation = useNavigation();

    const getAdminData = async() => {

    var result = await remoteDBAdmin.allDocs({
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
          setAdminDatas(newFilterData)
      }
  }  

}
    const back = () => {
      if(user == 'STUDENT'){
        navigation.navigate('StudentHomeScreen')
      }else{
        navigation.navigate('GuestHomeScreen')
      }
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
                
                <SearchBar
                    placeholder = 'Search Admin'
                    style={{top: 75}}
                />
               
            <View style = {{justifyContent: 'center', alignSelf: 'center', paddingTop: 100}}>
                <FlatList
                    showsVerticalScrollIndicator = {false}
                    numColumns = '4'
                    data={admindata}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </View>
            </SafeAreaView>
            
            <CloseButton
                    onPress = {back}
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
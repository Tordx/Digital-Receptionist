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
import { remoteDBFaculty } from '../../../Database/pouchDb';
import FacultyModal from '../../../Modal/FacultyModal';
import { openFacultyModal } from '../../../Redux/FacultySlice';
import { setFacultyData } from '../../../Redux/FacultySlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

   export default function FacultyScreen () {

    const user = useSelector(state => state.essensials.user)
    const dispatch = useDispatch();
    const [facultydata , setFacultyDatas] = useState('');

    useEffect(() => {

      getFacultyData()

    }, []);

    const navigation = useNavigation();

    const getFacultyData = async() => {

    var result = await remoteDBFaculty.allDocs({
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
          setFacultyDatas(newFilterData)
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

        return(
          <TouchableOpacity onPress={() => {
            dispatch(openFacultyModal()) ; dispatch(setFacultyData(item))
          }} >
          <View style = {styles.item}>
            <Text style = {styles.title}>
              {item.Facultyname}
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
                    placeholder = 'Search Faculty'
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
                    numColumns = '4'
                    data={facultydata}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </View>
            {/* <AddButton
                    onPress = {() => navigation.navigate('AddFaculty')}
                    name = 'add'
                    color = 'green'
                    size = {100}
                    style = {{flexDirection: 'row', bottom: 0, right: 0, position: 'absolute', margin: 20}}
              /> */}
            </SafeAreaView>
            <FacultyModal/>
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
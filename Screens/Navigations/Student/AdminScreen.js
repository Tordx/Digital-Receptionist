import React , {useState , useEffect} from 'react';
import { 
    
    View, 
    FlatList, 
    StyleSheet, 
    Text,
    ImageBackground, 
    TouchableOpacity, 
    Pressable,
    RefreshControl,
    ActivityIndicator,
    TextInput,
    Image,
    Modal,
    Animated 
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CloseButton , AddButton, SearchButton } from '../../../Components/Buttons';
import { useNavigation } from '@react-navigation/native';
import { SearchBar } from '../../../Components/SearchBar';
import { remoteDBAdmin } from '../../../Database/pouchDb';
import AdminModal from '../../../Modal/AdminModal';
import { useDispatch } from 'react-redux';
import { openAdminModal } from '../../../Redux/AdminSlice';
import { setAdminData } from '../../../Redux/AdminSlice';
import { useSelector } from 'react-redux';

  export default function AdminScreen () {
    
    

    const user = useSelector(state => state.essensials.user)
    const dispatch = useDispatch()
    const [admindata , setAdminDatas] = useState([]);
    const [searchTerm, setSearchTerm] = useState();
    const [adminRefresh, setAdminRefresh] = useState(false);
    const [univPresident, setUnivPresident] = useState([]);
    const [univCampusPresident, setUnivCampusPresident] = useState([]);
    const [univVicePresident, setUnivVicePresident] = useState([]);
    const [univVicePresidentAL, setUnivVicePresidentAL] = useState([]);
    const [univVicePresidentASAD, setUnivVicePresidentASAD] = useState([]);
    const [univVicePresidentPFMD, setUnivVicePresidentPFMD] = useState([]);
    const [univVicePresidentREI, setUnivVicePresidentREI] = useState([]);
    const [univVicePresidentQA, setUnivVicePresidentQA] = useState([]);
    const [showSearch, setShowSearch] = useState(false)
    const [scrollY, setScrollY] = useState(new Animated.Value(0));
    const [modal, setModal] = useState(true)
    const [image, setImage] = useState('https://i.imgur.com/ruPofda.png');
    useEffect(() => {
      getAdminData()

    }, [admindata]);



    const navigation = useNavigation();

    const getAdminData = async () => {
      var result = await remoteDBAdmin.allDocs({
        include_docs: true,
        attachments: true,
      });
      if (result.rows) {
        let modifiedArr = result.rows.map(function (item) {
          return item.doc;
        });
        let filteredData = modifiedArr.filter((item) => item);
    
        const presidentData = filteredData.filter(
          (item) => item.PosCode === "UP" //univpresidentmismo
        );
        const vicePresidentData = filteredData.filter(
          (item) => item.PosCode === "VP"
        );
        const campusPresidentData = filteredData.filter(
          (item) => item.PosCode === "UCP"
        );

        const vicePresidentALData  = filteredData.filter(
          (item) => item.PosCode === 'ALD'
        );
        const vicePresidentASAData  = filteredData.filter(
          (item) => item.PosCode === 'ASAD'
        );
        const vicePresidentPFMData  = filteredData.filter(
          (item) => item.PosCode === 'PFMD'
        );
        const vicePresidentREIData  = filteredData.filter(
          (item) => item.PosCode === 'REI'
        );
        const vicePresidentQAData  = filteredData.filter(
          (item) => item.PosCode === 'QA'
        );

        const SearchFunction = filteredData.filter((item) => {
            return item && (
              new RegExp(searchTerm, 'i').test(item.Name) ||
              new RegExp(searchTerm, 'i').test(item.Office) ||
              new RegExp(searchTerm, 'i').test(item.Position)
            )
        }); // for proper implementation
    
        setUnivPresident(presidentData);
        setUnivVicePresident(vicePresidentData);
        setUnivCampusPresident(campusPresidentData)
        setUnivVicePresidentAL(vicePresidentALData)
        setUnivVicePresidentASAD(vicePresidentASAData)
        setUnivVicePresidentPFMD(vicePresidentPFMData)
        setUnivVicePresidentREI(vicePresidentREIData)
        setUnivVicePresidentQA(vicePresidentQAData)
        setAdminData(filteredData)
        setSearchTerm(SearchFunction)
      }
    };

    const RefreshList = () => {

      setAdminRefresh(true);
      getAdminData();
      setAdminRefresh(false)

    }

    const renderItem = ({ item }) => {

      return(
        <Pressable 
        style = {styles.item}
        android_ripple={{
          color: 'blue',
          borderRadius: 100,
          radius: 200,
        }} 
        onPress={() => {
           dispatch(setAdminData(item))
        }} >
          <ImageBackground style = {{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center',}} resizeMode='cover' source={require('../../../Assets/Img/background-lion.png')} >
          <View style =  {{top: 5, position: 'absolute', justifyContent: 'center', alignItems: 'center',}} >
            <Image resizeMode='cover' style = {{width: item.Image ?  230 : 150, height:item.Image ? 200 : 150, margin: 5, borderRadius: 5}} source = {{uri:  item.Image || image }}/>
            <Text style = {styles.title}>{item.Name}</Text>
            </View>
            <Text style = {styles.office}>
              {item.Office}
            </Text>
            </ImageBackground>
      </Pressable>
      )
    }

    return (
      <ImageBackground 
        source = {require('../../../Assets/Img/Background_image.png')} 
        style={styles.container}
        resizeMode = 'cover'
      >
        <ScrollView>
          <View style = {styles.contentcontainer}>  
          {searchTerm ? (
            <View style = {{justifyContent: 'center', alignItems: 'center', alignSelf: 'center', flexDirection: 'column', flex: 1, marginTop: 20}}>
            <RefreshControl
            refreshing = {adminRefresh}
            onRefresh = {RefreshList}
            style = {{backgroundColor: 'green'}}
            />
            <View style = {{backgroundColor: '#fddf54', borderRadius: 5, padding: 10, width: '100%', marginBottom: 20}}>
            <Text style = {{fontSize: 20, fontWeight: 'bold', color: '#303030'}}>UNIVERSITY PRESIDENT</Text>
            </View>
          <FlatList
            data={univPresident}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            
          />
            <View style = {{backgroundColor: '#fddf54', borderRadius: 5, padding: 10, margin: 20}}>
            <Text style = {{fontSize: 20, fontWeight: 'bold', color: '#303030'}}>UNIVERSITY VICE PRESIDENTS</Text>
            </View>
            <FlatList
              data={univVicePresident}
              numColumns = {5}
              renderItem={renderItem}
              keyExtractor={(item) => item._id}
              
            />
            <View style = {{backgroundColor: '#fddf54', borderRadius: 5, padding: 10, margin: 20}}>
            <Text style = {{fontSize: 20, fontWeight: 'bold', color: '#303030'}}>OFFICE OF THE UNIVERSITY PRESIDENT</Text>
            </View>
            <FlatList
              data={univCampusPresident}
              numColumns = {5}
              renderItem={renderItem}
              keyExtractor={(item) => item._id}
              
            />
            <View style = {{backgroundColor: '#fddf54', borderRadius: 5, padding: 10, margin: 20}}>
            <Text style = {{fontSize: 20, fontWeight: 'bold', color: '#303030'}}>OFFICE OF THE VICE PRESIDENT FOR ADMINISTRATION AND LINKAGES</Text>
            </View>
            <FlatList
              data={univVicePresidentAL}
              numColumns = {5}
              renderItem={renderItem}
              keyExtractor={(item) => item._id}
              
            />
            <View style = {{backgroundColor: '#fddf54', borderRadius: 5, padding: 10, margin: 20}}>
            <Text style = {{fontSize: 20, fontWeight: 'bold', color: '#303030'}}>OFFICE OF THE VICE PRESIDENT FOR ACADEMIC AND STUDENT AFFAIRS</Text>
            </View>
            <FlatList
              data={univVicePresidentASAD}
              numColumns = {5}
              renderItem={renderItem}
              keyExtractor={(item) => item._id}
              
            />
            <View style = {{backgroundColor: '#fddf54', borderRadius: 5, padding: 10, margin: 20}}>
            <Text style = {{fontSize: 20, fontWeight: 'bold', color: '#303030'}}>OFFICE OF THE VICE PRESIDENT FOR PLANNING AND FINANCE MANAGEMENT</Text>
            </View>
            <FlatList
              data={univVicePresidentPFMD}
              numColumns = {5}
              renderItem={renderItem}
              keyExtractor={(item) => item._id}
              
            />
            <View style = {{backgroundColor: '#fddf54', borderRadius: 5, padding: 10, margin: 20}}>
            <Text style = {{fontSize: 20, fontWeight: 'bold', color: '#303030'}}>OFFICE OF THE VICE PRESIDENT FOR RESEARCH, EXTENSION AND INNOVATION</Text>
            </View>
            <FlatList
              data={univVicePresidentREI}
              numColumns = {5}
              renderItem={renderItem}
              keyExtractor={(item) => item._id}
              
            />
            <View style = {{backgroundColor: '#fddf54', borderRadius: 5, padding: 10, margin: 20}}>
            <Text style = {{fontSize: 20, fontWeight: 'bold', color: 'black'}}>OFFICE OF THE VICE PRESIDENT FOR QUALITY ASSURANCE</Text>
            </View>
            <FlatList
              data={univVicePresidentQA}
              numColumns = {5}
              renderItem={renderItem}
              keyExtractor={(item) => item._id}
              
            />
            </View>
        )
        : (
          <ActivityIndicator size="large" color="#fddf54"/>
        )}

             </View> 
</ScrollView>
      <View style = {{backgroundColor: '#0f2ed6', padding: 10, borderRadius: 20, position: 'absolute', top: 20, elevation: 10, shadowColor: '#000'}}>
              {showSearch ? null : <Text style = {{fontSize: 30, fontWeight: 'bold', color: '#fff'}}>UNIVERSITY OFFICIALS</Text>}
                </View>            
      {showSearch ?
                <View style = {styles.TextInput}>
                <TextInput
                    style  = {{width: '100%', fontSize: 17}}
                    value={searchTerm} 
                    onChange={(event) => {
                      setSearchTerm(event.nativeEvent.text) }}
                    placeholder = 'Search Citizen Charter...'
                  
                />
                    <CloseButton
                  style={styles.searchButtonExit}
                  name='close'
                  size={35}
                  color={'black'}
                  onPress={() => setShowSearch(!showSearch)}
                />
                
                </View>
            :  <CloseButton
            style={styles.searchButton}
            name='search'
            size={35}
            color={'#0f2ed6'}
            onPress={() => setShowSearch(!showSearch)}
          />}
                
                <CloseButton
        
                  onPress = {() => navigation.navigate('StudentHomeScreen')}     
                  name = 'arrow-back'
                  size = {40}
                  color={'#404040'}
                  style = {{flexDibrection: 'row', top: 25, left: 25, position: 'absolute'}}
          />
          <Modal
          visible = {modal}
          animationType='fade'
          onRequestClose={() => setModal(false)}
          statusBarTranslucent
          >
            <Pressable style = {{flex: 1, justifyContent: 'center', alignItems: 'center',}} onPressOut={() => setModal(false)} >
              <Image style = {{flex: 1}} resizeMode = 'contain' source={require('../../../Assets/Img/official_opening.png')} />
              <Text style = {{position: 'absolute', bottom: 10, color: 'white'}} >Press anywhere to continue</Text>
            </Pressable>
          </Modal>    
      </ImageBackground>
    )
  
    }
  
    const styles = StyleSheet.create({
  
      container: {
  
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f2f3f7',
          
      },
  
      contentcontainer: {
  
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
        paddingTop: 75

  
      },
  
      item: {

        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0f2ed6',
        borderWidth: 1,
        borderColor: '#0f2ed6',
        width: 245,
        height: 350,
        borderRadius: 5,
        marginVertical: 5,
        marginHorizontal: 5,
        elevation: 1,
        flexDirection: 'column'
  
      },
  
      title: {
  
        fontSize: 20,
        textAlign: 'center',
        color: '#fff',
        width: '99%',
        height: 50,
        fontFamily: 'extrabold'
  
      },

      office: {
  
        fontSize: 15,
        textAlign: 'center',
        color: '#fff',
        width: '85%',
        bottom: 10, 
        position: 'absolute',
        fontFamily: 'regular'
  
      },
  
  
      text: {
  
        fontSize: 25,
        fontWeight: '500',
        left: 0,
        textAlign: 'center',
        color: 'white',
  
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
  
      },
      closeButton: {
        position: 'absolute',
        top: 20,
        left: 20,
      },
      searchButton: {
        position: 'absolute',
        top: 20,
        right: 20,
      },
      searchButtonExit: {
        position: 'absolute',
        top: 5,
        right: 10,
    },
  
    });
  
import React , {useState , useEffect , useMemo} from 'react';
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
import LinearGradient from 'react-native-linear-gradient';

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
    const [modal, setModal] = useState(false)
    const [image, setImage] = useState('https://i.imgur.com/ruPofda.png');
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
      memoizedGetAdminData()

    }, [admindata]);



    const navigation = useNavigation();

    const memoizedGetAdminData = useMemo(() => {
      const filterDataByPosCode = (filteredData, posCode) =>
        filteredData.filter((item) => item.PosCode === posCode);
    
      const filterDataBySearchTerm = (filteredData, searchTerm) =>
        filteredData.filter((item) =>
          item && (
            new RegExp(searchTerm, 'i').test(item.Name) ||
            new RegExp(searchTerm, 'i').test(item.Office) ||
            new RegExp(searchTerm, 'i').test(item.Position)
          )
        );
    
      return async () => {
        const result = await remoteDBAdmin.allDocs({
          include_docs: true,
          attachments: true,
        });
    
        if (result.rows) {
          const modifiedArr = result.rows.map((item) => item.doc).filter(Boolean);
          const filteredData = modifiedArr.filter(Boolean);
    
          const presidentData = filterDataByPosCode(filteredData, 'UP');
          const vicePresidentData = filterDataByPosCode(filteredData, 'VP');
          const campusPresidentData = filterDataByPosCode(filteredData, 'UCP');
          const vicePresidentALData = filterDataByPosCode(filteredData, 'ALD');
          const vicePresidentASAData = filterDataByPosCode(filteredData, 'ASAD');
          const vicePresidentPFMData = filterDataByPosCode(filteredData, 'PFMD');
          const vicePresidentREIData = filterDataByPosCode(filteredData, 'REI');
          const vicePresidentQAData = filterDataByPosCode(filteredData, 'QA');
    
          const searchFunction = filterDataBySearchTerm(filteredData, searchTerm);
    
          setUnivPresident(presidentData);
          setUnivVicePresident(vicePresidentData);
          setUnivCampusPresident(campusPresidentData);
          setUnivVicePresidentAL(vicePresidentALData);
          setUnivVicePresidentASAD(vicePresidentASAData);
          setUnivVicePresidentPFMD(vicePresidentPFMData);
          setUnivVicePresidentREI(vicePresidentREIData);
          setUnivVicePresidentQA(vicePresidentQAData);
          setAdminData(filteredData);
          setSearchTerm(searchFunction);
        }
      };
    }, [remoteDBAdmin, searchTerm]);

    const getDataByCategory = (category) => {
      switch (category) {
        case 'UP':
          return univPresident;
        case 'VP':
          return univVicePresident;
        case 'UCP':
          return univCampusPresident;
        case 'ALD':
          return univVicePresidentAL;
        case 'ASAD':
          return univVicePresidentASAD;
        case 'PFMD':
          return univVicePresidentPFMD;
        case 'REI':
          return univVicePresidentREI;
        case 'QA':
          return univVicePresidentQA;
        default:
          return [];
      }
    };

    const RefreshList = () => {

      setAdminRefresh(true);
      memoizedGetAdminData();
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
        <ScrollView style = {{width: '100%'}}>
          <View style = {styles.contentcontainer}>  
          {searchTerm ? (
            <View style = {{justifyContent: 'center', alignItems: 'center', alignSelf: 'center', flexDirection: 'column', flex: 1, marginTop: 20}}>
            <RefreshControl
            refreshing = {adminRefresh}
            onRefresh = {RefreshList}
            style = {{backgroundColor: 'green'}}
            />
            <Pressable
              style={styles.listcontainer}
              onPress={() => {setSelectedCategory('UP'); setModal(true)}}
            >
              <Text style={styles.listtext}>UNIVERSITY PRESIDENT</Text>
            </Pressable>
            <Pressable
              style={styles.listcontainer}
              onPress={() => {setSelectedCategory('VP'); setModal(true)}}
            >
              <Text style={styles.listtext}>UNIVERSITY VICE PRESIDENTS</Text>
            </Pressable>
            <Pressable
              style={styles.listcontainer}
              onPress={() => {setSelectedCategory('UCP'); setModal(true)}}
            >
              <Text style={styles.listtext}>OFFICE OF THE UNIVERSITY PRESIDENT</Text>
            </Pressable>
            <Pressable
              style={styles.listcontainer}
              onPress={() => {setSelectedCategory('ASAD'); setModal(true)}}
            >
              <Text style={styles.listtext}>VICE PRESIDENT FOR ACADEMIC SERVICES AND DEVELOPMENT</Text>
            </Pressable>
            <Pressable
              style={styles.listcontainer}
              onPress={() => {setSelectedCategory('PFMD'); setModal(true)}}
            >
              <Text style={styles.listtext}>VICE PRESIDENT FOR FINANCE AND MATERIALS DEVELOPMENT</Text>
            </Pressable>
            <Pressable
              style={styles.listcontainer}
              onPress={() => {setSelectedCategory('REI'); setModal(true)}}
            >
              <Text style={styles.listtext}>VICE PRESIDENT FOR RESEARCH, EXTENSION, AND INNOVATION</Text>
            </Pressable>
            <Pressable
              style={styles.listcontainer}
              onPress={() => {setSelectedCategory('QA'); setModal(true)}}
            >
              <Text style={styles.listtext}>VICE PRESIDENT FOR QUALITY ASSURANCE</Text>
            </Pressable>
            </View>
        )
        : (
          <ActivityIndicator size="large" color="#fddf54"/>
        )}

             </View> 
        </ScrollView>
        <LinearGradient colors = {['#f6f6f6', '#00000000','#00000000']} style = {{position: 'absolute', top: 0, justifyContent: 'center', alignItems: 'center', width: '100%', height: 150}}></LinearGradient>
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
          animationType='slide'
          onRequestClose={() => setModal(false)}
          statusBarTranslucent
          transparent
          >
            <View style = {{justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', backgroundColor: '#00000088'}}>
              <FlatList
                data={getDataByCategory(selectedCategory)}
                renderItem={renderItem}
                keyExtractor={item => item._id}
                numColumns={4}
                contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
              />
            </View>
          </Modal>    
      </ImageBackground>
    )
  
  }
  
    const styles = StyleSheet.create({

      listtext: {
        
        fontSize: 35, 
        fontWeight: 'bold', 
        color: '#303030',
        textAlign: 'center'

      
      },

      listcontainer: {
        width: 1000,
        height: 200,
        backgroundColor: '#fddf54', 
        borderRadius: 5, 
        padding: 10, 
        margin: 20,
        justifyContent: 'center',
        alignItems: 'center'
      },
  
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
  
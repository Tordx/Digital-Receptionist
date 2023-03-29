import { View, Text, StyleSheet, FlatList, SafeAreaView , TouchableOpacity , Image, ImageBackground, Platform, Pressable, Modal, StatusBar, Animated, PanResponder, TouchableWithoutFeedback } from 'react-native'
import React , {useState , useEffect} from 'react';
import { CloseButton, SearchButton } from '../../../Components/Buttons';
import { useNavigation } from '@react-navigation/native';
import EventModal from '../../../Modal/EventModal';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setEventData } from '../../../Redux/EventSlice';
import { remoteDBCitizenChart } from '../../../Database/pouchDb';
import ImageViewer from 'react-native-image-zoom-viewer';
import { TextInput } from 'react-native-gesture-handler';

export default function CitizenChartScreen() {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [chart, setChart] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const { eventData } = useSelector((store) => store.eventmodal);
    const [showViewer, setShowViewer] = useState(false);
    const [imageType, setImageType] = useState('');
    const [textType, setTextType] = useState('')
    const [searchTerm, setSearchTerm] = useState('');
    const [showSearch, setShowSearch] = useState(false)
    StatusBar.setHidden(true);
    
  
    const EventData = async() => {
      var result = await remoteDBCitizenChart.allDocs({
        include_docs: true,
        attachments: true,
      });
      if (result.rows) {
        let modifiedArr =  result.rows.map(function(item) {
          return item.doc
        });
        let filteredData = modifiedArr.map((item) => {
            return item
          })
        let newFilterData = filteredData.sort((a,z) => {
          return a.DocOrder - z. DocOrder
        })
          setChart(newFilterData);
          console.log(newFilterData)
      }
    }
  
    useEffect(() => {
      EventData();
    }, []);
  
    const handleImagePress = () => {
      setShowViewer(true);
    }
  
    const handleViewerDismiss = () => {
      setShowViewer(false);
    }
  
    const renderItem = ({item}) => {
      if (item.Type === 'Image') {
        return (
          <TouchableWithoutFeedback onPress={handleImagePress} style={{ justifyContent: 'center', alignContent: 'center', alignSelf: 'center' }}>
            <Image
              style={styles.imageContainer}
              source={{ uri: item.Image }}
              resizeMode='contain'
            />
    
          </TouchableWithoutFeedback>
        );
      } else if (item.Type === 'Text') {
        return (
          <View style={{ justifyContent: 'center', alignItems: 'center', alignSelf: 'center', width: 1280, height: '100%', backgroundColor: '#f6f6f6' }}>
            <View style = {{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontWeight: 'bold', color: '#fddf54', fontSize: 50, backgroundColor: 'blue', padding: 10, paddingHorizontal: 20, borderRadius: 20, marginBottom: 20 }}>{item.Title}</Text>
              <Text style={{ color: '#404040', fontSize: 35, textAlign: 'center' }}>{item.Content}</Text>
            </View>
          </View>
        );
      } else {
        return null;
      }
    }
    
    return (
      <View style={styles.container}>
        <FlatList
          data={chart}
          horizontal
          renderItem={renderItem}
          keyExtractor={item => item._id}
          snapToInterval={1280}
          snapToAlignment={'center'}
        />
       
        <CloseButton
          style={styles.closeButton}
          name='arrow-back'
          size={35}
          color={'#fddf54'}
          onPress={() => navigation.goBack('StudentHomeScreen')}
        />
        <Modal
            visible = {showViewer}
            transparent
            onRequestClose={handleViewerDismiss}
            statusBarTranslucent
        >
            
          <ImageViewer
            imageUrls={chart.map(item => ({ url: item.Image }))}
            onSwipeDown={handleViewerDismiss}
            enableSwipeDown={true}
            renderIndicator={() => null}
            backgroundColor='#000'
          />
        </Modal>
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
       color={'#fddf54'}
       onPress={() => setShowSearch(!showSearch)}
     />}
      </View>
    )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: 1280,
    height: '100%',
    alignSelf: 'center'
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
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
    top: 10,
    right: 10,
  },
  TextInput: { 

    position: 'absolute', 
    top: 20, 
    alignSelf:'center', 
    flexDirection: 'row',
    backgroundColor: '#ffff',
    width: 600,
    borderRadius: 4,
    height: 60,
    elevation: 1,
    borderWidth: .5,
    borderColor: '#a2a2a2'

  }
});
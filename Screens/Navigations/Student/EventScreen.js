import { View, Text, StyleSheet, FlatList, SafeAreaView , TouchableOpacity , Image, ImageBackground, Platform } from 'react-native'
import React , {useState , useEffect} from 'react';
import { CloseButton } from '../../../Components/Buttons';
import { useNavigation } from '@react-navigation/native';
import { remoteDBEvent } from '../../../Database/pouchDb';
import EventModal from '../../../Modal/EventModal';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { openEventModal } from '../../../Redux/EventSlice';
import { setEventData } from '../../../Redux/EventSlice';
import { ImageSlider } from 'react-native-image-slider-banner';
import Slideshow from 'react-native-slideshow-improved';
export default function EventScreen() {

    useEffect(() => {
      ImageData()
    }, []);

  const [imagedata, setImageData] = useState();
  const ImageData  = () => {
   const image  = [
      {
        "img": "https://satriyaadikaums.files.wordpress.com/2019/10/welcome-slider-1024x446.jpg?w=1024]",
        "_id": '2211'
      },
      {
        "img": "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
        "_id": '223'
      },
      {
        "img": "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg",
        "_id": '332'
      }
  ]
  setImageData(image)
}

    const navigation = useNavigation();

    const [reference, setReference] = useState(null)

    
    return (
      <View style = {{flex: 1, justifyContent: 'center',}}>
       
        <Slideshow
          dataSource = {imagedata}
          height = {500}
        />

        <CloseButton style = {{position: 'absolute', top: 10, left: 10}}
        name = 'arrow-back'
        size = {35}
        color = {'#fff'}
        onPress = {() => navigation.goBack('StudentHomeScreen')}
        />
      </View>
    )

};
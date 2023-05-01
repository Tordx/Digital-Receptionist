import React , {useState , useEffect} from 'react';
import { 
    
    View, 
    FlatList, 
    StyleSheet, 
    Text,  
    TextInput,
    ImageBackground,
    TouchableOpacity,
    Image
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CloseButton , AddButton } from '../../../Components/Buttons';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Button } from 'react-native-paper';
import { remoteDBLogBook } from '../../../Database/pouchDb';
import { Calendar } from 'react-native-calendars';

  export const LogBookScreen = () => {

    useEffect(() => {

      AdminLogin()

    }, []);

    const [adminlogin,setAdminLogin] = useState([])
    const [searchQuery, setSearchQuery] = useState('');
    const [showCalendar, setShowCalendar] = useState(false);

    const handleShowCalendar = () => {
      setShowCalendar(true);
    }
  
    const handleHideCalendar = () => {
      setShowCalendar(false);
    }
  

const handleDateSelect = async (date) => {
  const data = date.dateString;
  try {
    const result = await remoteDBLogBook.allDocs({
      include_docs: true,
      attachments: true
    });

    if (result.rows) {
      const modifiedArr = result.rows.map(item => item.doc);
      const filteredData = modifiedArr.filter(item => item.SuperAdminId);
      if (filteredData) {
        const newdata = filteredData.filter(item => item.timestamp && item.timestamp.startsWith(data));
        setAdminLogin(newdata);
        handleHideCalendar()
      }
    }
  } catch (error) {
    console.error('Error fetching admin login data:', error);
  }

};

const AdminLogin = async () => {
  try {
    const result = await remoteDBLogBook.allDocs({
      include_docs: true,
      attachments: true
    });

    if (result.rows) {
      const modifiedArr = result.rows.map(item => item.doc);
      const filteredData = modifiedArr.filter(item => item.SuperAdminId);
      if (filteredData) {
        const sortedData = filteredData.sort((a, b) => Date.parse(b.timestamp) - Date.parse(a.timestamp));
        setAdminLogin(sortedData);
        console.log('Sorted admin login:', sortedData);
      }
    }
  } catch (error) {
    console.error('Error fetching admin login data:', error);
  }
};

    const navigation = useNavigation();

    const renderItem = ({ item }) => {

      return(
          <TouchableOpacity style = {styles.item}>
            <View style = {{flexDirection: 'row', width: '100%', justifyContent: 'space-between',}}>
            <Text style = {styles.title}>
              {item.SuperAdminId}
            </Text>
            <Text style = {styles.title}>
              {item.Time}
            </Text>
            <Text style = {styles.title}>
              {item.Date}
            </Text>
            </View>
          </TouchableOpacity>
      )
  }

      return (
  <View style={styles.container} >
    
      <View style = {{ alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', paddingTop: 100}}>
      <TouchableOpacity style = {[styles.item, {backgroundColor: '#00000000', textShadowRadius: 0,}]}>
            <View style = {{flexDirection: 'row', width: '100%', justifyContent: 'space-between',}}>
            <Text style = {[styles.title, {fontFamily: 'extrabold', textShadowRadius: 0,}]}>
              ADMIN NAME
            </Text>
            <Text style = {[styles.title, {fontFamily: 'extrabold', textShadowRadius: 0,}]}>
              LOGIN TIME
            </Text>
            <Text style = {[styles.title, {fontFamily: 'extrabold', textShadowRadius: 0,}]}>
              LOGIN DATE
            </Text>
            </View>
          </TouchableOpacity>
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={adminlogin.filter((item) => item.SuperAdminId.includes(searchQuery))}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
        />
      </View>
      <TouchableOpacity onPress={handleShowCalendar} style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#0f2ed6', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5, position: 'absolute', top: 20}}>
          <Icon name="calendar-today" size={40} color="#FFFFFF" style={{ marginRight: 5 }} />
          <Text style={{ color: '#FFFFFF', fontSize: 18 }}>Select Date</Text>
        </TouchableOpacity>
        
        {showCalendar && (
          <View style = {{width: '100%', justifyContent: 'center', alignContent: 'center', position: 'absolute', backgroundColor: '#00000088', height: '100%'}}>
            <Calendar onDayPress={handleDateSelect} style = {{width: '95%', alignSelf: 'center', borderRadius: 30}} />
            <TouchableOpacity onPress={handleHideCalendar} style={{ alignSelf: 'center', alignItems: 'center',justifyContent: 'center', backgroundColor: 'red', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5, width: '95%' }}>
          <Icon name="close" size={40} color="#FFFFFF" style={{ marginRight: 5 }} />
          <Text style={{ color: '#FFFFFF', fontSize: 18 }}>CLOSE</Text>
        </TouchableOpacity>
          </View>
        )}
      <CloseButton 
      onPress={() => navigation.navigate('AdminHomeScreen')} 
      name="arrow-back" size={50} color = {'#202020'}
      style={{ flexDirection: 'row', top: 0, left: 0, position: 'absolute', margin: 20 }} />
  </View>
);

    

  }

  const styles = StyleSheet.create({

    container: {

        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        backgroundColor: '#fddf54',
        
    },

    item: {

        justifyContent: 'center',
        alignself: 'center',
        alignItems: 'center',
        backgroundColor: '#00000019',
        flexDirection: 'row',
        borderBottomWidth: 2,
        width: '100%',
        height: 100,

    },

    title: {

      fontSize: 32,
      marginHorizontal: 20,
      fontFamily: 'medium',
      color: '#202020',
      textShadowColor: 'white',
      textShadowRadius: 5,

    },

    text: {

      fontSize: 25,
      fontWeight: '500',
      textAlign: 'center',
      color: 'white'

    },

    status: {
      
      width: 200, 
      height: 50, 
      backgroundColor: 'red', 
      margin: 20,
      borderRadius: 20,
      justifyContent: 'center',

    },

  });

  export default LogBookScreen;
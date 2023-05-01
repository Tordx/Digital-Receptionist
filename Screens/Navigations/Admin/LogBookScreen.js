import React , {useState , useEffect} from 'react';
import { 
    
    View, 
    FlatList, 
    StyleSheet, 
    Text,  
    TextInput,
    ImageBackground,
    TouchableOpacity
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
        <TouchableOpacity>
          <View style = {styles.item}>
            <Text style = {styles.title}>
              {item.SuperAdminId}{"          "}
              {item.Time}{"          "}
              {item.Date}
            </Text>
          </View>
       </TouchableOpacity>
      )
  }

      return (
  <ImageBackground style={styles.container} source={require('../../../Assets/Img/Background_image.png')}>
  
    <View>
      {showCalendar && (
        <>
           <Calendar onDayPress={handleDateSelect} />
          <TouchableOpacity onPress={handleHideCalendar} style={{ flexDirection: 'row', alignItems: 'center',justifyContent: 'center', backgroundColor: 'red', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5 }}>
        <Icon name="close" size={40} color="#FFFFFF" style={{ marginRight: 5 }} />
        <Text style={{ color: '#FFFFFF', fontSize: 18 }}>Close</Text>
      </TouchableOpacity>
        </>
      )}
    </View>
    <ScrollView>
      <View style={[styles.status, { backgroundColor: '#0f2ed6' }]}>
        <Text style={styles.text}>Admin Login</Text>
      </View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={adminlogin.filter((item) => item.SuperAdminId.includes(searchQuery))}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />

    </ScrollView>
    <View style={styles.TextInput}>
    <TouchableOpacity onPress={handleShowCalendar} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#007AFF', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5 , width: 170 }}>
        <Icon name="calendar-today" size={40} color="#FFFFFF" style={{ marginRight: 5 }} />
        <Text style={{ color: '#FFFFFF', fontSize: 18 }}>Select Date</Text>
      </TouchableOpacity>
      <Icon name="search" size={30} style={{ margin: 10 }} />
      <TextInput
        placeholder="Search Classes"
        style={{ fontSize: 20 }}
        onChangeText={(query) => setSearchQuery(query)}
      />

    </View>
    <CloseButton 
    onPress={() => navigation.navigate('AdminHomeScreen')} 
    name="arrow-back" size={50}
     style={{ flexDirection: 'row', top: 0, left: 0, position: 'absolute', margin: 20 }} />
  </ImageBackground>
);

    

  }

  const styles = StyleSheet.create({

    container: {

        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: '#f2f3f7',
        paddingTop: 100,
        paddingBottom: 10,
        
    },

    item: {

        justifyContent: 'center',
        alignself: 'center',
        backgroundColor: '#fff',
        padding: 30,
        width: '100%',
        height: 100,
        borderRadius: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        shadowColor: "#000",
        shadowOffset: {
	        width: 1,
	        height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 3.41,
        elevation: 5,

    },

    title: {

      fontSize: 32,

    },

    text: {

      fontSize: 25,
      fontWeight: '500',
      left: 0,
      textAlign: 'center',
      color: 'white'

    },

    status: {
      
      width: 200, 
      height: 50, 
      backgroundColor: 'red', 
      margin: 20,
      borderRadius: 20,
      justifyContent: 'center'

    },

    TextInput: { 

      position: 'absolute', 
      top: 20, 
      alignSelf:'center', 
      flexDirection: 'row',
      backgroundColor: '#f2f3f7',
      width: 600,
      borderRadius: 15,
      height: 50,
      shadowColor: "#000",
      shadowOffset: {
	        width: 1,
	        height: 2,
        },
      shadowOpacity: 1,
      shadowRadius: 3.41,
      elevation: 10,

    }

  });

  export default LogBookScreen;
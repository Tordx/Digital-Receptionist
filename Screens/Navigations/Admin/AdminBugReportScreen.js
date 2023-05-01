import React , {useState , useEffect, useCallback} from 'react';
import { 
    
    View, 
    FlatList, 
    StyleSheet, 
    Text,  
    TextInput,
    ImageBackground,
    TouchableOpacity,
    RefreshControl,
    Modal
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CloseButton , AddButton } from '../../../Components/Buttons';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Button } from 'react-native-paper';
import { remoteDBReportBugReport } from '../../../Database/pouchDb';
import { Calendar } from 'react-native-calendars';

  export const AdminBugScreen = () => {

    useEffect(() => {

      Bug()

    }, []);

    
    const navigation = useNavigation();

    const [bug,setBug] = useState([])
    const [refreshing, setRefreshing] = useState(false);
    const [adminlogin,setAdminLogin] = useState([])
    const [searchQuery, setSearchQuery] = useState('');
    const [showCalendar, setShowCalendar] = useState(false);
    const [fullinfomodal, setFullInforModal] = useState(false);
    const [fullinfomodaldata, setFullInforModalData] = useState('');

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        Bug()
        setRefreshing(false);
      }, []);

    const handleShowCalendar = () => {
      setShowCalendar(true);
    }
  
    const handleHideCalendar = () => {
      setShowCalendar(false);
    }
  

    const handleDateSelect = async (date) => {
      const data = date.dateString;
      
      try {
        const result = await remoteDBReportBugReport.allDocs({
          include_docs: true,
          attachments: true
        });
        
        const modifiedArr = result.rows?.map(item => item.doc) || [];
        const filteredData = modifiedArr.filter(item => item.ReportBugReport === 'Bug Report');
        
        if (filteredData) {
          const newdata = filteredData.filter(item => item.timestamp?.startsWith(data));
          setBug(newdata);
          handleHideCalendar()
        }
      } catch (error) {
        console.error('Error fetching admin login data:', error);
      }
    };
    

const Bug = async() => {
    
  var result = await remoteDBReportBugReport.allDocs({
    include_docs: true,
    attachments: true
  });
  if(result.rows){
      let modifiedArr = result.rows.map(function(item){
      return item.doc
  });
  let filteredData = modifiedArr.filter(item => {
      return item.ReportBugReport === 'Bug Report';
    });
    if(filteredData) {
        let newFilterData = filteredData.map(item => {
            return item
        })
        setBug(newFilterData)
    
    }
}  
}


    const renderItem = ({ item }) => {

      return(
        <TouchableOpacity style = {styles.item} onPress={() =>{ setFullInforModal(true); setFullInforModalData(item)}}>
            <View style = {{flexDirection: 'row', width: '100%', justifyContent: 'space-between',}}>
            <Text style = {styles.title}>
              {item.Department}
            </Text>
            <Text style = {styles.title}>
              {item.Name}
            </Text>
            <Text style = {styles.title}>
            {item.Message.length > 10 ? item.Message.slice(0,10) + "..." : item.Message}
            </Text>
            </View>
          </TouchableOpacity>
      )
  }

//   <TouchableOpacity onPress={() => {setFullInforModal(true) , setFullInforModalData(item)}}>
//   <View style = {styles.item}>
//     <Text style = {styles.title}>
//      Department:  {item.Department}{"          "}
//      Name: {item.Name}{"          "}
//      Message:  {item.Message}
//     </Text>
//   </View>
// </TouchableOpacity>

      return (
  <View style={styles.container} >
  
  <View style = {{ alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', paddingTop: 100}}>
      
            <Text style = {[styles.title, {fontFamily: 'extrabold', textShadowRadius: 0, marginBottom: 50}]}>
              BUG
            </Text>
            <View style = {{flexDirection: 'row', width: '100%', justifyContent: 'space-between',}}>
            <Text style = {[styles.title, {fontFamily: 'extrabold', textShadowRadius: 0,}]}>
              DEPARTMENT
            </Text>
            <Text style = {[styles.title, {fontFamily: 'extrabold', textShadowRadius: 0,}]}>
             FULL NAME
            </Text>
            <Text style = {[styles.title, {fontFamily: 'extrabold', textShadowRadius: 0,}]}>
              MESSAGE
            </Text>
            </View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={bug.filter((item) => item.Department.includes(searchQuery))}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        />
      </View>
    <View style={styles.TextInput}>
    <TouchableOpacity onPress={handleShowCalendar} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#007AFF', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5 , width: 170 }}>
        <Icon name="calendar-today" size={40} color="#FFFFFF" style={{ marginRight: 5 }} />
        <Text style={{ color: '#FFFFFF', fontSize: 18 }}>Select Date</Text>
      </TouchableOpacity>
      <Icon name="search" size={30} style={{ margin: 10 }} />
      <TextInput
        placeholder="Search bug  "
        style={{ fontSize: 20 }}
        onChangeText={(query) => setSearchQuery(query)}
      />

    </View>
    
    {showCalendar && (
          <View style = {{width: '100%', justifyContent: 'center', alignContent: 'center', position: 'absolute', backgroundColor: '#00000088', height: '100%'}}>
            <Calendar onDayPress={handleDateSelect} style = {{width: '95%', alignSelf: 'center', borderRadius: 30,}} />
            <TouchableOpacity onPress={handleHideCalendar} style={{ alignSelf: 'center', alignItems: 'center',justifyContent: 'center', backgroundColor: 'red', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5, width: '95%' }}>
          <Icon name="close" size={40} color="#FFFFFF" style={{ marginRight: 5 }} />
          <Text style={{ color: '#FFFFFF', fontSize: 18 }}>CLOSE</Text>
        </TouchableOpacity>
          </View>
        )}
    <CloseButton 
    onPress={() => navigation.navigate('AdminReports')} 
    name="arrow-back" size={50}
     style={{ flexDirection: 'row', top: 0, left: 0, position: 'absolute', margin: 20 }} />
       <Modal 
       statusBarTranslucent
       transparent
       visible={fullinfomodal} 
       animationType="slide">
        <View style = {{width: '100%', height: '100%', backgroundColor: '#00000029', justifyContent: 'center', alignItems: 'center',}}>
          <View style = {{width: '90%', height: '90%', backgroundColor: 'white', borderRadius: 30}}>
            <View style = {{padding: 50}}>
              <Text style={styles.modalText}>Concern:  {fullinfomodaldata.ReportBugReport}</Text>
              <Text style={styles.modalText}>Department:  {fullinfomodaldata.Department}</Text>
              <Text style={styles.modalText}>Name:  {fullinfomodaldata.Name}</Text>
              <Text style={styles.modalText}>SpecifyComplaint:  {fullinfomodaldata.SpecifySuggestion}</Text>
              <Text style={styles.modalText}>Message:  {fullinfomodaldata.Message}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => { setFullInforModal(false);  setFullInforModalData('')}} style = {{position: 'absolute', bottom: 20}}>
          <Text style = {{fontSize: 16, fontFamily: 'extrabold', color: 'red'}}>CLOSE</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      
  </View>
);

    

  }

  const styles = StyleSheet.create({

    modalText: {
        fontSize: 25,
        marginBottom: 15,
        color: '#202020',
      },
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

  },

    text: {

      fontSize: 25,
      fontWeight: '500',
      left: 0,
      textAlign: 'center',
      color: 'black'

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

  export default AdminBugScreen;
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
import {remoteDBReportBugReport , remoteDBSuggestionFeedback } from '../../../Database/pouchDb';


  export const AdminReports = () => {

    useEffect(() => {
      Suggestion()
      Report()
      Feedback()
      BugReport()

    }, []);

    const [suggestion,setSuggestion] = useState('')
    const [report,setReport] = useState('')
    const [feedback,setFeedback] = useState('')
    const [bugreport,setBugReport] = useState('')
    
      const Suggestion = async() => {
    
        var result = await remoteDBSuggestionFeedback.allDocs({
          include_docs: true,
          attachments: true
        });
        if(result.rows){
            let modifiedArr = result.rows.map(function(item){
            return item.doc
        });
        let filteredData = modifiedArr.filter(item => {
            return item.FeedbackorSuggestion === 'Suggestion';
          });
          if(filteredData) {
              let newFilterData = filteredData.map(item => {
                  return item
              })
              setSuggestion(newFilterData)
          
          }
      }  
      }

      const Report = async() => {
  
        var result = await remoteDBReportBugReport.allDocs({
          include_docs: true,
          attachments: true
        });
        if(result.rows){
            let modifiedArr = result.rows.map(function(item){
            return item.doc
        });
        let filteredData = modifiedArr.filter(item => {
            return item.ReportBugReport === 'Report';
          });
          if(filteredData) {
              let newFilterData = filteredData.map(item => {
                  return item
              })
              setReport(newFilterData)

          }
      }  
      }

      const Feedback = async() => {
  
        var result = await remoteDBSuggestionFeedback.allDocs({
          include_docs: true,
          attachments: true
        });
        if(result.rows){
            let modifiedArr = result.rows.map(function(item){
            return item.doc
        });
        let filteredData = modifiedArr.filter(item => {
            return item.FeedbackorSuggestion === 'Feedback';
          });
          if(filteredData) {
              let newFilterData = filteredData.map(item => {
                  return item
              })
              setFeedback(newFilterData)

          }
      }  
      }

      const BugReport = async() => {
              
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
              setBugReport(newFilterData)

          }
      }  
      }
    const navigation = useNavigation();

    const renderItem = ({ item }) => {

      return(
        <TouchableOpacity>
          <View style = {styles.item}>
            <Text style = {styles.title}>
              {item.Department}
            </Text>
          </View>
       </TouchableOpacity>
      )
  }

  return (
    <View
      style={styles.container}
      // source={require('../../../Assets/Img/Background_image.png')}
    >
        <Text style={[styles.text, {fontSize: 50}]}>SYSTEM REPORTS</Text>
      <View style={styles.boxContainer}>
        <TouchableOpacity onPress={() => {navigation.navigate('AdminSuggestionScreen')}} style={[styles.box, ]}>
          <Image style = {{width: 100, height: 100,}} resizeMode = 'contain' source = {require('../../../Assets/Img/icons8-idea-144.png')} />
          <Text style={styles.text}>Suggestion</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {navigation.navigate('AdminFeedBackScreen')}} style={[styles.box,]}>
        <Image style = {{width: 100, height: 100,}} resizeMode = 'contain' source = {require('../../../Assets/Img/icons8-satisfied-96.png')} />
          <Text style={styles.text}>Feedback</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {navigation.navigate('AdminReportScreen')}} style={[styles.box, ]}>
        <Image style = {{width: 100, height: 100,}} resizeMode = 'contain' source = {require('../../../Assets/Img/icons8-box-important-96.png')} />
          <Text style={styles.text}>Report</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {navigation.navigate('AdminBugReportScreen')}} style={[styles.box, ]}>
        <Image style = {{width: 100, height: 100,}} resizeMode = 'contain' source = {require('../../../Assets/Img/icons8-rhinoceros-beetle-96.png')} />
          <Text style={styles.text}>Bug Report</Text>
        </TouchableOpacity>
      </View>
  
      <CloseButton
        onPress={() => navigation.navigate('AdminHomeScreen')}
        name="arrow-back"
        size={50}
        style={{ flexDirection: 'row', top: 0, left: 0, position: 'absolute', margin: 20 }}
      />
    </View>
  );
  
    

  }

 const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fddf54'
  },
  boxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 50,
  },
  box: {
    width: 280,
    height: '80%',
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#fff',
    elevation: 20,
  },
  text: {
    fontSize: 30,
    fontFamily: 'black',
    color: '#303030',
  },
});


  export default AdminReports;
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
import { CloseButton , AddButton } from '../../../ScreenComponents/Buttons';
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
        <ImageBackground style={styles.container}
        source = {require('../../../Assets/Img/Background_image.png')}

        >
       
        <ScrollView>
        <View style = {styles.status} >
          <Text style  = {styles.text}>Suggestion</Text>
          </View> 
            <FlatList
              horizontal
              showsHorizontalScrollIndicator = {false}
              data={suggestion}
              renderItem={renderItem}
              keyExtractor={item => item._id}
          />
          <View style = {styles.status} >
          <Text style  = {styles.text}>Report</Text>
          </View> 
            <FlatList
              horizontal
              showsHorizontalScrollIndicator = {false}
              data={report}
              renderItem={renderItem}
              keyExtractor={item => item._id}
          />
        <View style = {[styles.status, {backgroundColor: '#0f2ed6'}]}>
          <Text style  = {styles.text}>Feedback</Text>
          </View>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator = {false}
              data={feedback}
              renderItem={renderItem}
              keyExtractor={item => item._id}
            />
        <View style = {[styles.status, {backgroundColor: 'grey'}]}>
          <Text style  = {styles.text}>Bug Report</Text>
          </View>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator = {false}
              data={bugreport}
              renderItem={renderItem}
              keyExtractor={item => item._id}
            /> 
          
        </ScrollView>
        <View style = {styles.TextInput}>
            <Icon
            
            name = 'search'
            size={30}
            style = {{margin: 10}}

            />
            <TextInput
                placeholder='Search Classes'
                style = {{fontSize: 20,}}
                
            />
        
        
        </View>
        <CloseButton

          onPress = {() => navigation.navigate('AdminHomeScreen')}
          name = 'arrow-back'
          size = {50}
          style = {{flexDirection: 'row', top: 0, left: 0, position: 'absolute', margin: 20}}
        />
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
        width: 250,
        height: 200,
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

  export default AdminReports;
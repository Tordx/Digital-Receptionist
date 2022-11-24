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
import { remoteDBLogBook } from '../../../Database/pouchDb';

  export const LogBookScreen = () => {

    useEffect(() => {

      StudentLogin()
      AdminLogin()
      GuestLogin()
    //   PreviousClass()


    }, []);

    // const [itemdata,setItemdata] = useState('')
    const [studentlogin,setStudentLogin] = useState('')
    const [adminlogin,setAdminLogin] = useState('')
    const [guestlogin,setGuestLogin] = useState('')
    // const [previousclasstime,setPreviousClassTime] = useState('')
    // const [ongoingcclasstime,setOngoingClassTime] = useState('')
    // const [nextclasstime,setNextClassTime] = useState('')
    
    const StudentLogin = async() => {
 
      var result = await remoteDBLogBook.allDocs({
        include_docs: true,
        attachments: true
      });
      if(result.rows){
          let modifiedArr = result.rows.map(function(item){
           return item.doc
      });
      let filteredData = modifiedArr.filter(item => {
          return item.StudentIdNumber;
        });
        if(filteredData) {
            let StudentData = filteredData.map(item => {
                return item
            })
            setStudentLogin(StudentData)
            console.log(StudentData)
            console.log('xxxxxxxxxxxxxxxxxxxxxxx')
        }
  }  
}
      const AdminLogin = async() => {
              
        var result = await remoteDBLogBook.allDocs({
          include_docs: true,
          attachments: true
        });
        if(result.rows){
            let modifiedArr = result.rows.map(function(item){
            return item.doc
        });
        let filteredData = modifiedArr.filter(item => {
            return item.SuperAdminId;
          });
          if(filteredData) {
              let AdminData = filteredData.map(item => {
                  return item
              })
              setAdminLogin(AdminData)
              console.log(AdminData)
              console.log('yyyyyyyyyyyyyyyy')
          }
      }  
      }

      const GuestLogin = async() => {
    
        var result = await remoteDBLogBook.allDocs({
          include_docs: true,
          attachments: true
        });
        if(result.rows){
            let modifiedArr = result.rows.map(function(item){
            return item.doc
        });
        let filteredData = modifiedArr.filter(item => {
            return item.GuestFullName;
          });
          if(filteredData) {
              let GuestData = filteredData.map(item => {
                  return item
              })
              setGuestLogin(GuestData)
              console.log(GuestData)
              console.log('zzzzzzzzzzzzzzzzzzzzzzzzzzzz')
          
          }
      }  
      }


    const navigation = useNavigation();

    const renderItem = ({ item }) => {

      return(
        <TouchableOpacity>
          <View style = {styles.item}>
            <Text style = {styles.title}>
              {item.SuperAdminId}
              {item.SuperAdminPasscode}
            </Text>
            <Text style = {styles.title}>
              {item.StudentIdNumber}
              {item.StudentBirthday}
            </Text>
            <Text style = {styles.title}>
              {item.GuestFullName}
              {item.GuestAddress}
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
          <Text style  = {styles.text}>Student Login</Text>
          </View> 
            <FlatList
              horizontal
              showsHorizontalScrollIndicator = {false}
              data={studentlogin}
              renderItem={renderItem}
              keyExtractor={item => item.id}
          />
        <View style = {[styles.status, {backgroundColor: '#0f2ed6'}]}>
          <Text style  = {styles.text}>Admin Login</Text>
          </View>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator = {false}
              data={adminlogin}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
        <View style = {[styles.status, {backgroundColor: 'grey'}]}>
          <Text style  = {styles.text}>Guest Login</Text>
          </View>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator = {false}
              data={guestlogin}
              renderItem={renderItem}
              keyExtractor={item => item.id}
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

  export default LogBookScreen;
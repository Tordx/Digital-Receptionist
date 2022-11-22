import { View, Text, StyleSheet, FlatList, SafeAreaView , TouchableOpacity } from 'react-native'
import React , {useState , useEffect} from 'react';
import { CloseButton } from '../../../ScreenComponents/Buttons';
import { useNavigation } from '@react-navigation/native';
import { remoteDBEvent } from '../../../Database/pouchDb';

export default function EventScreen() {

  const [EventData , setEventData] = useState('')

    useEffect(() => {

      getEventData()

    }, []);

    const navigation = useNavigation();

    const getEventData = async() => {

    var result = await remoteDBEvent.allDocs({
      include_docs: true,
      attachments: true
    });
    if(result.rows){
        let modifiedArr = result.rows.map(function(item){
        return item.doc
    });
    let filteredData = modifiedArr.filter(item => {
        return item;
      });
      if(filteredData) {
          let newFilterData = filteredData.map(item => {
              return item
          })
          setEventData(newFilterData)
      }
  }  

};

      const renderItem = ({ item }) => {

        return(
        <TouchableOpacity>
          <View style = {styles.item}>
            <Text style = {styles.title}>
              {item.EventName}
            </Text>
          </View>
        </TouchableOpacity>
        )
      }

    return (
      <SafeAreaView style={styles.container}>
          
        <FlatList
          horizontal
          data={EventData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />

        <CloseButton
          
          onPress = {() => navigation.navigate('Student_HomeScreen')}
          name = 'arrow-back'
          size = {50}
          style = {{flexDirection: 'row', top: 0, left: 0, position: 'absolute', marginVertical: 27, marginHorizontal: 20}}

        />
      </SafeAreaView>
    );
  

}

const styles = StyleSheet.create({

  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      
  },

  item: {

      justifyContent: 'center',
      backgroundColor: 'white',
      padding: 30,
      width: 600,
      margin: 20,
      marginBottom: 20,
      height: 800,
      borderRadius: 10,

  },

  title: {

    fontSize: 32,
  },
});
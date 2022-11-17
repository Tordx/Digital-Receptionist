import React from 'react';
import { 
    
    View, 
    FlatList, 
    StyleSheet, 
    Text,  
    TextInput,
    ImageBackground,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CloseButton } from '../../../ScreenComponents/Buttons';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons'

const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
    {
      id: '58694a0f-3d]a1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
    {
      id: '58694a0f-3da11-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
    {
        id: '58694a0f2-3da11-471f-bd96-145571e29d72',
        title: 'Third Item',
      },
      {
        id: '58694a0f-3da131-471f-bd96-145571e29d72',
        title: 'Third Item',
      },
      {
        id: '58694a0f-3da11-471f3-bd96-145571e29d72',
        title: 'Third Item',
      },
  ];
  
  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

  export const ClassScreen = () => {

    const navigation = useNavigation();

    const renderItem = ({ item }) => (
        <Item title={item.title} />
      );

      return (
        <ImageBackground style={styles.container}
        source = {require('../../../Assets/Img/Background_image.png')}

        >
       
        <ScrollView>
        <View style = {styles.status} >
          <Text style  = {styles.text}>On-going class</Text></View> 
            <FlatList
              horizontal
              showsHorizontalScrollIndicator = {false}
              data={DATA}
              renderItem={renderItem}
              keyExtractor={item => item.id}
          />
        <View style = {[styles.status, {backgroundColor: '#0f2ed6'}]}>
          <Text style  = {styles.text}>Next class</Text></View>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator = {false}
              data={DATA}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
        <View style = {[styles.status, {backgroundColor: 'grey'}]}>
          <Text style  = {styles.text}>Previous class</Text></View>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator = {false}
              data={DATA}
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

          onPress = {() => navigation.navigate('Student_HomeScreen')}
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

  export default ClassScreen;
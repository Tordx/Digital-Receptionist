import React from 'react';
import { 
    
    View, 
    FlatList, 
    StyleSheet, 
    Text,
    ImageBackground,  
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CloseButton , AddButton } from '../../../ScreenComponents/Buttons';
import { useNavigation } from '@react-navigation/native';
import { SearchBar } from '../../../ScreenComponents/SearchBar';

  export default function AdminScreen () {

    const navigation = useNavigation();

    const renderItem = ({ item }) => {
      console.log('item')
      console.log(item)
      console.log('item')

      return(
      <View style = {styles.item}>
        <Text style = {styles.title}>
          {item.Classname}
        </Text>
      </View>
      )
  }

      return (
        <ImageBackground style={styles.container}
        source = {require('../../../Assets/Img/Background_image.png')}

        >
           
            <SafeAreaView style = {{
                justifyContent: 'center',
                alignItems: 'center',}}>
                
                <SearchBar
                    placeholder = 'Search Admin'
                    style={{top: 75}}
                />
               
            <View style = {{justifyContent: 'center', alignSelf: 'center', paddingTop: 100}}>
                <FlatList
                    showsVerticalScrollIndicator = {false}
                    numColumns = '4'
                    // data={DATA}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </View>
            <CloseButton
                    onPress = {() => navigation.navigate('Student_HomeScreen')}
                    name = 'arrow-back'
                    size = {50}
                    style = {{flexDirection: 'row', top: 0, left: 0, position: 'absolute', marginVertical: 27, marginHorizontal: 20}}
/>
              {/* <AddButton
                    onPress = {() => navigation.navigate('AddClassScreen')}
                    name = 'add'
                    color = 'green'
                    size = {100}
                    style = {{flexDirection: 'row', bottom: 0, right: 0, position: 'absolute', margin: 20}}
              /> */}
            </SafeAreaView>
        </ImageBackground>
      );
    

  }

  const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        
    },

    item: {

        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        padding: 30,
        width: 275,
        height: 300,
        borderRadius: 10,
        marginVertical: 16,
        marginHorizontal: 16,
        shadowColor: "#000",
        shadowOffset: {
	        width: 1,
	        height: 2,
        },
        shadowOpacity: 0.6,
        shadowRadius: 2,
        elevation: 3,

    },

    title: {

      fontSize: 32,
    },
  });
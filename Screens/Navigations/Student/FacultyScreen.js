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
        id: '58694a0f-32da11-471f3-bd96-145571e29d72',
        title: 'Third Item',
      },
      {
        id: '58694a0f-13da11-471f3-bd96-145571e29d72',
        title: 'Third Item',
      },
      {
        id: '58694a0f-3d6a11-471f3-bd96-145571e29d72',
        title: 'Third Item',
      },
      {
        id: '58694a0f-3da131-471f3-bd96-145571e29d72',
        title: 'Third Item',
      },
  ];
  
  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

  export default function FacultyScreen () {

    const navigation = useNavigation();

    const renderItem = ({ item }) => (
        <Item title={item.title} />
      );

      return (
        <ImageBackground style={styles.container}
        source = {require('../../../Assets/Img/Background_image.png')}

        >
           
            <SafeAreaView style = {{
                justifyContent: 'center',
                alignItems: 'center',}}>
                
                <SearchBar
                    placeholder = 'Search Faculty'
                    style={{top: 75}}
                />
                <CloseButton
                    onPress = {() => navigation.navigate('Student_HomeScreen')}
                    name = 'arrow-back'
                    size = {50}
                    style = {{flexDirection: 'row', top: 0, left: 0, position: 'absolute', marginVertical: 27, marginHorizontal: 20}}
/>
            <View style = {{justifyContent: 'center', alignSelf: 'center', paddingTop: 100}}>
                <FlatList
                    showsVerticalScrollIndicator = {false}
                    numColumns = '4'
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </View>
            {/* <AddButton
                    onPress = {() => navigation.navigate('AddFaculty')}
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
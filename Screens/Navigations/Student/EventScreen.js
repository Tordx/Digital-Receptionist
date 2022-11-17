import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native'
import React from 'react'
import { CloseButton } from '../../../ScreenComponents/Buttons';
import { useNavigation } from '@react-navigation/native';

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

export default function EventScreen() {

  const navigation = useNavigation();

  const renderItem = ({ item }) => (
      <Item title={item.title} />
    );

    return (
      <SafeAreaView style={styles.container}>
          
        <FlatList
          horizontal
          data={DATA}
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
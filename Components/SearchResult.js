import React from 'react';
import { 
    
    View, 
    FlatList, 
    StyleSheet, 
    Text,  
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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

  export const SearchResult = () => {

    const renderItem = ({ item }) => (
        <Item title={item.title} />
      );

      return (
        <SafeAreaView style={styles.container}>
            
          <FlatList
            showsVerticalScrollIndicator = {false}
            data={DATA}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </SafeAreaView>
      );
    

  }

  const styles = StyleSheet.create({

    container: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 80,
        
    },

    item: {

        justifyContent: 'center',
        backgroundColor: '#e6e9fc',
        padding: 30,
        width: 1200,
        height: 300,
        borderWidth: 1,
        borderRadius: 10,
        marginVertical: 8,
        marginHorizontal: 16,

    },

    title: {

      fontSize: 32,
    },
  });
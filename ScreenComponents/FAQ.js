import React from 'react';
import { 
    
    View, 
    FlatList, 
    StyleSheet, 
    Text,  
} from 'react-native';

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
  ];
  
  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

  export const FrequentyAskQuestions = () => {

    const renderItem = ({ item }) => (
        <Item title={item.title} />
      );

      return (
        <View style={styles.container}>
            <Text style = {{textAlign: 'left', fontSize: 30, fontWeight: '700', marginBottom: 20, }}> Here are some FAQs</Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator = {false}
            data={DATA}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </View>
      );
    

  }

  const styles = StyleSheet.create({
    container: {

        position: 'relative',
        width: 600,
        height: 200,
        right: -27,

    },

    item: {

        backgroundColor: '#e6e9fc',
        padding: 20,
        width: 250,
        borderRadius: 20,
        marginVertical: 8,
        marginHorizontal: 16,

    },

    title: {

      fontSize: 32,
    },
  });
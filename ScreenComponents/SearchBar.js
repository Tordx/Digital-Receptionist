import { 
    
    View, 
    Text,
    TextInput, 
    TouchableOpacity,
    StyleSheet,
    Keyboard,
    Alert,
    ToastAndroid,

} from 'react-native'
import React, {useEffect, useState} from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { WelcomeText } from './WelcomeText';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const SearchBar = (props) => {

    return (

        <View style = {[styles.TextInput, props.style]}>
            <Icon
            
            name = 'search'
            size={30}
            style = {{margin: 10}}

            />
            <TextInput
                placeholder= {props.placeholder}
                style = {{fontSize: 20,}}
                
            />
        
        
        </View>

    )

}

export const SearchScreen = () => {

    const [pressed, setPressed] = useState(true);
    const [TextValue, setTextValue] = useState('');
    const navigation = useNavigation();

  const SearchInput = () => {
    if (TextValue.length == 0){

        // Alert.alert('Please input search')
        ToastAndroid.show('Please input search',ToastAndroid.LONG)
        console.log('error')

    } else {
            
        setPressed(false)
        console.log('Search_success')
    } 
} 

  return (
    
    <View style = {{flex: 1,  justifyContent: 'center',
    alignItems: 'center', }}>
    <View style = {pressed? styles.Container : styleActive.Container1}>
    {pressed?  
    
        <WelcomeText/>
        :                 
        <TouchableOpacity
            style = {styles.GoBack}
            onPressIn={() => setPressed(!pressed)}
            keyboardWillHide
            accessible={false}
            >
            <Icon
            
                name = 'arrow-back'
                size={50}
                style = {{marginRight: 20   }}

            />
        </TouchableOpacity>
   
    }
        <View style = {pressed? styles.TextInput: styleActive.TextInput1}>
            <Icon
            
            name = 'search'
            size={30}
            style = {{marginLeft: 15}}

            />
            <TextInput
                onPressOut={() => setPressed()}
                placeholder='How can I help you?'
                style = {{fontSize: 20,}}
                onChangeText = {(value) => setTextValue(value)}
                value = {TextValue}
                
            />
        
        
        </View>
        <SafeAreaView
        style = {pressed? {marginTop: 20, marginBottom: 100 } : {marginTop: 0, marginBottom: 100 }}
        >
        <TouchableOpacity
         style = {pressed? styles.Search: styleActive.Search1}
        onPress = {SearchInput}
        
         >
            <Text style = {{textAlign: 'center', color: '#0f2ed6', fontSize: 20, fontWeight: '600'}}>
                Search
            </Text>
        </TouchableOpacity>
        </SafeAreaView>
         <View >
        
         </View>
         
    </View>
    </View>
    

  )
}
  const styles = StyleSheet.create({

    

    Container: {
        
        
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 50,
        
    },

    Search: {
        width: 150,
        height: 50,
        backgroundColor: '#fddf54',
        alignSelf: 'flex-start',
        borderRadius: 100,
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.41,
        elevation: 2,

    },

    TextInput: {

        backgroundColor: '#f2f3f7',
        width: 600,
        borderRadius: 15,
        height: 50,
        alignItems: 'center',
        alignContent: 'center',
        flexDirection: 'row',
        shadowColor: "#000",
        shadowOffset: {
	        width: 1,
	        height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 3.41,
        elevation: 10,

    },



 
  })

const styleActive = StyleSheet.create({

    Container1: {
        
        position: 'absolute',
        top: 50,
        flexDirection: 'row'
        
    },

    TextInput1: {

        
        width: 600,
        borderRadius: 15,
        height: 50,
        borderWidth: 2,
        alignItems: 'center',
        borderStyle: 'dashed',
        alignContent: 'center',
        flexDirection: 'row',
        marginRight: 10,

    },

    Search1: {
        
        width: 150,
        height: 50,
        backgroundColor: '#fddf54',
        alignSelf: 'flex-start',
        borderRadius: 15,
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.41,
        elevation: 2,

    },
    
    GoBack: {

        justifyContent: 'center',
        alignSelf: 'center',
        marginRight: 100,

    }


})

//   <View style = {styles.Container}>

//             <View  style = {pressed? styles.Container1: styles.Container} >
                // <TouchableOpacity
                //     style = {styles.GoBack}
                //     onPressIn={() => setPressed(!pressed)}>
                //     <Icon
            
                //         name = 'arrow-back'
                //         size={35}
                //         style = {{marginLeft: 15}}

                //     />
                // </TouchableOpacity>
//                 <View style = {styles.TextInput1}>
//                     <Icon
            
//                     name = 'search'
//                     size={30}
//                     style = {{marginLeft: 15}}

//                     />
//                     <TextInput

//                     placeholder='How can I help you?'
//                     style = {{fontSize: 20,}}
//                     />
        
//                 </View>
//             <TouchableOpacity
//                 style = {styles.Search1}
//             >
//                 <Text style = {{textAlign: 'center', color: '#0f2ed6', fontSize: 20, fontWeight: '600'}}>
//                     Search
//                 </Text>
//             </TouchableOpacity>
//         </View>
//     </View>  
import { 
    
    View, 
    Text,
    TextInput, 
    TouchableOpacity,
    StyleSheet,
    Keyboard,

} from 'react-native'
import React, {useEffect, useState} from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FrequentyAskQuestions } from './FAQ';
import { AppointmentButton } from './Buttons';
import { WelcomeText } from './WelcomeText';
import { useNavigation } from '@react-navigation/native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SearchResult } from './SearchResult';


export const SearchScreen = () => {

    const [pressed, setPressed] = useState(true);
    const [TextValue, setTextValue] = useState(false);
    const navigation = useNavigation();



  return (
    
    <View style = {{flex: 1,  justifyContent: 'center',
    alignItems: 'center',}}>
    <View style = {pressed? styles.Container : styleActive.Container1}>
    {pressed?  
    
        <WelcomeText/>
        :                 
        <TouchableWithoutFeedback
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
        </TouchableWithoutFeedback>
   
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
                value = {!TextValue}
                
            />
        
        
        </View>
        <SafeAreaView
        style = {pressed? {marginTop: 20, marginBottom: 100 } : {marginTop: 0, marginBottom: 100 }}
        >
        <TouchableOpacity
         style = {pressed? styles.Search: styleActive.Search1}
        
         >
            <Text style = {{textAlign: 'center', color: '#0f2ed6', fontSize: 20, fontWeight: '600'}}>
                Search
            </Text>
        </TouchableOpacity>
        </SafeAreaView>
        {pressed? <AppointmentButton/>: null }
         <View >
        
         </View>
         
    </View>
    {pressed? null:<View  style = {{marginTop: 150 }}>
    <Text  style = {{textAlign: 'left', fontSize: 30, fontWeight: '900', color: 'black' }}>Results of "{TextValue}" </Text>
    <SearchResult/>
    </View>}
    </View>
    

  )
}
  const styles = StyleSheet.create({

    

    Container: {
        
        justifyContent: 'center',
        alignItems: 'center',
        
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

        width: 800,
        borderRadius: 15,
        height: 50,
        borderWidth: 2,
        alignItems: 'center',
        borderStyle: 'dashed',
        alignContent: 'center',
        flexDirection: 'row'

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
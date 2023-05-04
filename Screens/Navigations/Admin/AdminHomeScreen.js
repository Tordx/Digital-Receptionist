import { View, Text, Image } from 'react-native'
import React from 'react'
import AdminMainMenu from './AdminMainMenu'
import { useNavigation } from '@react-navigation/native'
import { CloseButton } from '../../../Components/Buttons'
import { Version } from '../../../Assets/constants/constants'
import { useDispatch } from 'react-redux'
import { setAdminLoginInfo } from '../../../Redux/AdminSlice'

export default function AdminHomeScreen() {

    const navigation = useNavigation();
    const dispatch = useDispatch()

  return (
    <View style = {{flex: 1, backgroundColor: '#fddf54',justifyContent: 'center', alignItems: 'center'}}>
        <Image
        source={require('../../../Assets/Img/psu_logo.png')}
        style = {{width: 1000, height: 1000, opacity: 0.5, justifyContent: 'center', position: 'absolute',alignItems: 'center'}}
        />
       
        <CloseButton
        
        name = 'logout'
        size = {25}
        color = 'black'
        style = {{position: 'absolute', left: 0, top: 0, margin: 20, flexDirection: 'row', justifyContent: 'center' }}
        onPress={() => {
          navigation.goBack('InitialRoutingScreen');
          dispatch(setAdminLoginInfo(''));
        }}
        
        title = 'logout'

        />
      <AdminMainMenu/>
      <Text style = {{position: 'absolute', bottom: 10, left: 10}} > DKHDR {Version}</Text>
    </View>
  )
}
import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { BuildingSelection } from '../Assets/constants/constants';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/MaterialIcons'

export default function SuggestionsScreen() {

  const [value, setvalue] = useState();

  return (
    <View  style = {{flex: 1, justifyContent: 'center', alignItems: 'center'}} >
      <SelectDropdown
      data = {BuildingSelection}
      buttonStyle = {styles.ButtonStyle}
      defaultButtonText = 'Suggest/Feedback'
      />
      <SelectDropdown
      data = {BuildingSelection}
      />
      <SelectDropdown
      data = {BuildingSelection}
      />
      <SelectDropdown
      data = {BuildingSelection}
      />
    </View>
  )
};

const styles = StyleSheet.create({

  ButtonStyle: { borderBottomWidth: 1, borderRadius: 20}
  
})
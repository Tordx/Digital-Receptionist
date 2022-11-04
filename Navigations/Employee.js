import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Employee_appointment from '../ScreenComponents/EmployeeAppointment';

export default function Employee() {

  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen

      name = 'Employee_appointment'
      component = {Employee_appointment}
      options = {{
                    headerShown: false
                }}
      
      />
    </Tab.Navigator>
  )
}
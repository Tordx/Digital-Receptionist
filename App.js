/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StatusBar } from 'react-native';
import Directory from './Directory';

function App (){

  return (
    <>
    <Directory/>
    <StatusBar
    hidden = {true}
    />
    </>
 
  )

}
export default App;

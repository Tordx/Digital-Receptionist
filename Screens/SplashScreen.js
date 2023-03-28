import { useNavigation } from '@react-navigation/native';
import React, { Component } from 'react';
import { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const SplashScreen = () => {

    const navigation = useNavigation()

    useEffect(() => {
        
        setTimeout(() => {
            navigation.replace('CitizenChartScreen');
        }, 3000);
    })

    return (
        <>
        <Image style = {{width: '101%', height: '100%', justifyContent: 'center', alignSelf: 'center'}} resizeMode = 'contain' source={require('../Assets/Img/splash.png')} />
        </>
    );
};
export default SplashScreen;

import React, { Component } from 'react';
import { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SplashScreen = () => {

    useEffect(() => {
        
        setTimeout(() => {
            navigation.replace('CitizenChartScreen');
        }, 1000);
    })

    return (
        <View style={styles.container}>
            <Text>MyComponent</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

export default SplashScreen;

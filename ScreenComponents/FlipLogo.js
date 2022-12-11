import {Animated} from 'react-native'
import React, {useEffect} from 'react'

export const FlipLogo = () => {

  useEffect(() =>{
    startImageRotateFunction();
  },)

  let animatedValue = new Animated.Value(0);
  let currentValue = 0;

  animatedValue.addListener(({ value }) => {
    currentValue = value;
  });

  const startImageRotateFunction = () => {
    if (currentValue >= 90) {
      Animated.timing(animatedValue, {
        toValue: 0,
        tension: 10,
        friction: 8,
        duration: 5000,
        useNativeDriver: false,
      }).start(()=> startImageRotateFunction());
    } else if (currentValue == 0) {
      Animated.timing(animatedValue, {
        toValue: 180,
        tension: 10,
        friction: 8,
        duration: 4800,
        useNativeDriver: false,
      }).start(()=> startImageRotateFunction());
    }
  };

  const rotateData = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  return (

    <Animated.Image
      style={{width: 175, height: 175, margin: 20, transform: [{rotateY: rotateData}]}}
      source={require('../Assets/Img/psu_logo.png')}
      />
  )

}

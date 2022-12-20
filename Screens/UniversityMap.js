
import { Image, View, Text, Pressable, ImageBackground } from 'react-native';
import React, { useRef, useEffect, useState,  } from 'react';
import MapView from 'react-native-maps';

export default function UniversityMap() {
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const onRegionChange = (region) => {
    setRegion(region);
  }
  return (
   
    <View>
      <MapView
        region={region}
        onRegionChange={onRegionChange}
      />
    </View>  
  );
}
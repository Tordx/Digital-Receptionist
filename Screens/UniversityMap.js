
import { Image, View, Text, Pressable, ImageBackground } from 'react-native';
import React, { useRef, useEffect, useState,  } from 'react';

export default function MyComponent() {

    const [scale, setScale] = useState('');
    const transformScale = { width: 300/800, height: 300/500 };
    // 800 is the actual image width and 300 is width shown in screen. Same for height.
    /* Part number, coordinates(x,y, width,height) */
    const [textPosition, setTextPosition] = useState({
      x: 315*transformScale.width,
      y: 80*transformScale.height,
    });
    const [showText, setShowText] = useState(false);
    let partPosition = {
      number: 1,
      coordinates: [315, 80, 20, 20],
    };
  
    const checkIfClickLiesInAnyPart = ({ x, y }) => {
      const tX = x/transformScale.width;
      const tY =y/transformScale.height;
      let c=partPosition.coordinates;
      if(tX<=c[0]+2*c[2] && tX>=c[0]-2*c[2] && tY<=c[1]+c[3] && tY>=c[1]-c[3]) return {matchedWith:1};
      return {matchedWith:false};
    };
    const handleClick = (e) => {
      console.log('clicked', e);
      const {matchedWith}=checkIfClickLiesInAnyPart({ x: e.locationX, y: e.locationY })
      if (matchedWith) {
        setShowText(true);
        setTextPosition({ x: partPosition.coordinates[0]*transformScale.width, y: partPosition.coordinates[1]*transformScale.height });
      } else {
        setShowText(false);
      }
  }
  return (
   
    <Pressable onPress={handleClick}  
    style={{flex: 1,justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 0}}>
      {showText ? (
                  <Text
                    style={{
                      color: 'red',
                      borderWidth: 2,
                      height: '20',
                      width: '20',
                      position: 'absolute',
                      left: textPosition.x,
                      top: textPosition.y,
                    }}>true</Text> ) : null}
      <Image
        source={require('../Assets/Img/Background_image2.png')} 
        resizeMode="contain"
        style={{width: 500, height: 500, justifyContent: 'center', alignItems: 'center',}}
      />
           
      </Pressable>
           
  );
}
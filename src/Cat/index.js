import React from 'react'

import { Text, View, Image, YellowBox } from 'react-native';

YellowBox.ignoreWarnings(['Warning: ...']);
console.disableYellowBox = true;

const Cat = ({
  face: {
    bounds: {
      size: { width: faceWidth, height: faceHeight }
    },
    leftEyePosition,
    rightEyePosition
  }
}) => {
  const catWidth = faceWidth
  const catHeight = faceHeight
  const transformAngle = (
    angleRad = Math.atan(
      (rightEyePosition.y - leftEyePosition.y) /
      (rightEyePosition.x - leftEyePosition.x)
    )
  ) => angleRad * 180 / Math.PI
  return (
    <View style={{
      position: 'absolute',
      left: leftEyePosition.x - catWidth * 0.7,
      top: leftEyePosition.y - catHeight * 0.45
    }}>
      <Image
        source={require('../../assets/cat.png')}
        style={{
          width: catWidth,
          height: catHeight,
          resizeMode: 'contain',
          transform: [{ rotate: `${transformAngle()}deg`}]
        }}
      />
    </View>
  );
};

export default Cat

import React from 'react';
import { View, StatusBar } from 'react-native';
import Constants from "expo-constants";

function UdaciStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

export default function FlashcardStatusBar() {
  return (
        <UdaciStatusBar backgroundColor="purple" barStyle="light-content" />
  );
}

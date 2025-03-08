import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {images} from '../utils/images';
import {Width} from '../utils/globalwinSize';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        resizeMode="contain"
        style={styles.animation}
        source={images.splash.applogo}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  animation: {
    width: Width * 0.8,
    height: Width * 0.8,
    // backgroundColor: 'red',
  },
});

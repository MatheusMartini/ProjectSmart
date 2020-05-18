import { StyleSheet, View, Image } from 'react-native';
import React from "react";

export default function Header() {
  return (
    <View style={styles.container}>
      <Image
        source={
          __DEV__
            ? require('../../assets/images/logo.png')
            : require('../../assets/images/logo.png')
            } style={styles.Header}
          />
    </View>
  );
}

const styles = StyleSheet.create({
  Header: {
    height: 100,
    resizeMode: 'contain',
    marginTop: 5,
  },
  container:{
    backgroundColor:'#f1f1f1',
  }
});


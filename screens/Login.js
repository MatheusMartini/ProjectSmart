import * as React from 'react';
import { Button, View, Platform, StatusBar, } from 'react-native';

export default function Login( { navigation } ) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}

      <Button
        title="Go to Adress"
        onPress={() => navigation.navigate('Adress')}
      />
    </View>
  );
}

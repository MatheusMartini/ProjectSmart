import * as React from 'react';
import { StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Modal from './Modal';

export default function HomeScreen() {
  return (
    <View>
      <ScrollView style={styles.container}>
        <View style={styles.card}>
    
            <View style={styles.adress}>
                <Text style={styles.adress}>Your Address or Private Key</Text>
                
                <TouchableHighlight
                  onPress={() => {
                    this.setModalVisible(!modalVisible);
                  }}
                  >
                  <View style={styles.qr}>
                    <Modal/>
                  </View>                
                </TouchableHighlight>

            </View>
               
            <TextInput style={styles.text}
             placeholder="________________________________________________">
            </TextInput>

        </View>
      </ScrollView>
    </View>
  );
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f1f1f1',
    },
    text: {
      padding: 10,
      color: 'rgba(0,0,0,0.6)',
      fontSize: 15,
      lineHeight:20,
      
    },
    adress: {
        marginTop:'2%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },  
    qr: {
      backgroundColor: '#fff'
    },
    card: {
      marginTop: 10,
      marginBottom: 20,
      marginLeft: 12,
      marginRight: 12,
      shadowColor: 'black',
      shadowOffset: { width: -1, height: 2},
      shadowOpacity: 0.26,
      shadowRadius: 5,
      backgroundColor:'#fff',
      padding:20,
    },
  });
  
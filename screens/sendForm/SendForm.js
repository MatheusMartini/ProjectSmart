import * as React from 'react';
import { StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Image,  
  TouchableHighlight,
  Modal,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import modal from '../modal/Modal';

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
                <Image
                  style={styles.qrcode}
                  source={require('../../assets/images/qrcode.png')}
                />
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
    qrcode: {
      padding: 15,
      width: 30,
      height: 30,
      marginRight:10, 
      marginTop:10,
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
  
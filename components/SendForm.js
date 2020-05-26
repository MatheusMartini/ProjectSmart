import React, { useState } from 'react';
import { StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Button,
  KeyboardAvoidingView
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Modal from './Modal';

function ShowSend(){
  return(
    <View>
      <View style={styles.contentCard}>

        <View style={styles.adress}>
          <Text>Adress to Send</Text>
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

        <TextInput 
          style={styles.text}

            placeholder="________________________________________________">
        </TextInput>
        
      </View>

      <View style={styles.contentCard}>
        <Text>Amount to Send</Text>
        <TextInput 
          style={styles.text}

            placeholder="________________________________________________">
        </TextInput>
      </View>

      <View style={styles.contentCard}>

        <View style={styles.adress}>
          <Text>Your private Kay</Text>

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

        <TextInput 
          style={styles.text}
 
            placeholder="________________________________________________">
        </TextInput>
        
      </View>

      <View style={styles.Button}>
        <Button title={'Send'} onPress={() => {}} />
      </View>

    </View>
  );
}
function ShowBalance (){
  return(
    <Text>Your Balance: </Text>
  );
}

function ShowTransactions(){
  return(
    <Text style={styles.Transactions}>Show Transactions </Text>
  );
}


export default function HomeScreen() {

   return (
    <KeyboardAvoidingView behavior='position'>
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
               
            <TextInput 
              style={styles.text}
              placeholder="________________________________________________">
               
            </TextInput>
        </View>
        
        <View>

          <View style={styles.ShowContent}>
            
            <ShowBalance/>

            <TouchableHighlight onPress={() => {}}>
              <ShowTransactions/>
            </TouchableHighlight>
           
          </View>
          
          <View style={styles.contentCard} style={styles.card } >
            <ShowSend/> 
          </View>

        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f1f1f1',
    },
    ShowContent:{
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding:5
    },
    Transactions:{
      backgroundColor:'#f1f1f1',
      shadowOffset: { width: -1, height:5} ,
      shadowOpacity: 0.09,
      padding:10,
      marginTop:-10
    },
    text: {
      padding: 10,
      color: 'rgba(0,0,0,0.6)',
      fontSize: 15,
      lineHeight:20,
    },
    Balance:{
      marginLeft:10,
      marginTop:1,
      marginBottom:5
    },
    adress: {
        marginTop:'2%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },  
    qr: {
      backgroundColor: '#fff'
    },
    Button:{
      borderRadius: 50,
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
    contentCard:{
      marginBottom: 20,
      backgroundColor:'#fff',
      padding:10,
      shadowColor: 'black',
      shadowOffset: { width: -1, height: 10},
      shadowOpacity: 0.09,
    }
  });
  
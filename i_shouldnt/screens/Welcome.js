import React from 'react';
import {StackNavigator} from 'react-navigation';
import {Alert, StyleSheet, Image, ImageBackground, Text, AsyncStorage, TouchableOpacity } from 'react-native';

export default class Welcome extends React.Component {

  async resetApp(){
    await AsyncStorage.clear();
    alert("A fresh start is available");
  }

  handleReset(){
    Alert.alert(
    'Reset Confirmation',
    'Reset App: All data will be erased?',
      [
        {text: 'Cancel', onPress: () => {}},
        {text: 'OK', onPress: () => this.resetApp()},
      ]
    );
  }

  async handlePress(){
    let username = await AsyncStorage.getItem("username");
    if(username == null)
      this.props.navigation.navigate('AccountSetup');
    else{
      let keys = await AsyncStorage.getAllKeys();
      if(keys.length > 1){
        this.props.navigation.navigate('Dashboard',{username:username});
      }else{
        this.props.navigation.navigate('AddGoals',{username:username});
      }
    }
  }

  render() {
    return (
      <ImageBackground style={styles.imageBackground} source={require('../images/logo.jpg')}>
        <TouchableOpacity style={styles.reset} onPress={this.handleReset.bind(this)}>
          <Text style={styles.buttonText} >Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={this.handlePress.bind(this)} />
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  imageBackground: {
    width:'100%', height:'100%', alignItems:'center'
  },
  buttonText: {
   color:"white", fontSize:14, fontWeight:"bold", textAlign:"center"
  },
  button:{
    top:"20%",
    height:"100%",
    width:"100%"
  },
  reset: {
    width:60,
    left:"40%",
    backgroundColor:'#4286f4',
    borderRadius:25,
    marginTop:10,
    paddingVertical:3
  }
});

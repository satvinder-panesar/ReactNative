import React from 'react';
import {StackNavigator} from 'react-navigation';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, AsyncStorage } from 'react-native';

export default class AccountSetup extends React.Component {

  constructor(){
  	super();
  	this.state={username:''};
  }

  async handlePress() {
  	if(this.state.username === '')
  		alert("Type a username");
  	else{
	  	await AsyncStorage.setItem('username', this.state.username);
	  	this.props.navigation.navigate('AddGoals',{username:this.state.username});
 	}
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.greetings}>Let's get you started!</Text>
        <Text style={styles.question}>How may we address you?</Text>
        <TextInput maxLength={25} style={styles.textinput} placeholder="Type your username" placeholderTextColor="#c4c4c4" onChangeText={(text)=>this.setState({username:text})}/>
        <TouchableOpacity style={styles.button} onPress={this.handlePress.bind(this)}>
          <Text style={styles.buttonText}>Become a member</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  	flex:1,
  	alignItems:'center',
  	backgroundColor:'#4286f4',
  	justifyContent:'space-around'
  },
  greetings: {
  	fontSize:40,
  	color:"white",
  	fontWeight:"bold",
  	textAlign:"center"
  },
  question: {
  	fontSize:28,
  	color:"white",
  	fontWeight:"bold",
  	textAlign:"center"
  },
  textinput: {
  	width:"80%",
  	fontSize:20,
  	paddingVertical:16,
  	fontWeight:"bold",
  	color:"white"
  },
  buttonText: {
   color:"#4286f4", fontSize:20, fontWeight:"bold", textAlign:"center"
  },
  button:{
    width:220,
    backgroundColor:'white',
    borderRadius:25,
    paddingVertical:10
  }
});

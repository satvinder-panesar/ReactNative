import React from 'react';
import {StackNavigator} from 'react-navigation';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, AsyncStorage} from 'react-native';
import Goal from './Goal';

let goals;

export default class AddGoals extends React.Component {

  constructor(){
    super();
    this.state={goal:'', count:0}
  }

  async componentWillMount(){
    let temp =  await AsyncStorage.getAllKeys();
    for(let i=0; i<temp.length; i++){
      if(temp[i].includes("_log")){
        temp.splice(i,1);
      }
    }
    this.setState({count:temp.length - 1});
  }

  async handleAdd(){
    if(this.state.goal === '')
      alert("Type a goal");
    else if(this.state.goal.includes("@") || this.state.goal.includes("$")){
      alert("Sorry, @ and $ are not allowed");
    }
    else{
      let temp = await AsyncStorage.getItem(this.state.goal);
      if(temp == null){
      	await AsyncStorage.setItem(this.state.goal, '0');
        let count = this.state.count;
        count = Number(count) + 1;
        this.setState({goal:'', count:count});
        this.textInput.clear();
      }else{
        alert("Its already added");
      }
    }
  }

  handleDelete(){
    let count = this.state.count;
    count = count - 1;
    this.setState({count:count});
  }

  handleGoto(){
    if(this.state.count === 0)
      alert("Nothing to display...Add a goal");
    else
      this.props.navigation.navigate('Dashboard',{username:this.props.navigation.state.params.username, handleDelete:this.handleDelete.bind(this)});
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.greetings}>Welcome {this.props.navigation.state.params.username}</Text>
        <Text style={styles.question}>Enter what you want to avoid</Text>
        <TextInput maxLength = {100} ref={input => { this.textInput = input }} style={styles.textinput} placeholder="Type your goal" placeholderTextColor="#c4c4c4" onChangeText={(text)=>this.setState({goal:text})}/>
         <TouchableOpacity style={styles.button} onPress={this.handleAdd.bind(this)}>
          <Text style={styles.buttonText} >Add</Text>
        </TouchableOpacity>
         <TouchableOpacity style={styles.button} onPress={this.handleGoto.bind(this)}>
          <Text style={styles.buttonText} >Go To Dashbaord</Text>
        </TouchableOpacity>
        <Text style={styles.question}>Goals Added: {this.state.count}</Text>
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
    fontSize:35,
    color:"white",
    fontWeight:"bold",
    textAlign:"center"
  },
  question: {
    fontSize:25,
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
    width:250,
    backgroundColor:'white',
    borderRadius:25,
    paddingVertical:10
  }
});


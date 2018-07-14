import React from 'react';
import {StackNavigator} from 'react-navigation';
import {StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList, AsyncStorage, Alert } from 'react-native';
import Log from './Log';

var dateFormat = require('dateformat');

export default class LogsList extends React.Component {

  constructor(){
    super();
    this.state={log:'', logs:[], refresh:true}
  }

  async handleAdd(){
    if(this.state.log === ''){
      alert("Type a log");
    }
    else if(this.state.log.includes("@") || this.state.log.includes("$")){
      alert("Sorry, @ and $ are not allowed");
    }else{
      let now = new Date();
      let date = dateFormat(now, "mmm@dd@HH@MM@");
      let logs = this.state.logs;
      let log = date+this.state.log;
      if(logs.length === 0){
        await AsyncStorage.setItem(this.props.navigation.state.params.goal+"_log", log);
      }else{
        let logs = await AsyncStorage.getItem(this.props.navigation.state.params.goal+"_log");
        logs = logs + "$" + log;
        await AsyncStorage.setItem(this.props.navigation.state.params.goal+"_log", logs);
      }
      logs.push(log);
      this.setState({log:'', logs:logs, refresh:!this.state.refresh});
      this.textInput.clear();
    }
  }

  handleDelete(log){
    let entry = log.split("@");
    Alert.alert(
    'Delete Confirmation',
    'Delete log entry: '+entry[2]+' ?',
      [
        {text: 'Cancel', onPress: () => {}},
        {text: 'OK', onPress: () => this.deleteLog(log)},
      ]
    );
  }

  async deleteLog(log){
    let logs = await AsyncStorage.getItem(this.props.navigation.state.params.goal+"_log");
    if(logs.includes("$"+log+"$")){
      logs = logs.replace("$"+log+"$", "$");
    }else  if(logs.includes("$"+log)){
      logs = logs.replace("$"+log, "");
    }else{
      logs = logs.replace(log,"");
    }
    await AsyncStorage.setItem(this.props.navigation.state.params.goal+"_log", logs);
    let temp = this.state.logs;
    let index = temp.indexOf(log);
    temp.splice(index,1);
    this.setState({logs:temp, refresh:!this.state.refresh});
  }

  _keyExtractor = (item) => item;

  _renderItem = ({item}) => (

    <Log key={item} 
      log={item}
      handleDelete={this.handleDelete.bind(this)}
    />
  );

  deleteFunction(){
    this.props.navigation.state.params.handleDelete;
  }

  handleGoto(){
    this.props.navigation.navigate("Dashboard", {username:this.props.navigation.state.params.username, handleDelete:this.deleteFunction.bind(this)});
  }

 async componentWillMount(){
  let logs = await AsyncStorage.getItem(this.props.navigation.state.params.goal+"_log");
  if(logs != null){
    if(logs.includes("$")){
      let temp = logs;
      temp = temp.split("$");
      let arr = this.state.logs;
      this.setState({logs:temp});
    }else{
      let arr = [];
      arr.push(logs);
      this.setState({logs:arr});
    }
  }
}

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.greetings}>{this.props.navigation.state.params.goal}</Text>
        <TextInput maxLength = {250} ref={input => { this.textInput = input }} style={styles.textinput} placeholder="Type how you feel" placeholderTextColor="#c4c4c4" onChangeText={(text)=>this.setState({log:text})}/>
        <TouchableOpacity style={styles.button} onPress={this.handleAdd.bind(this)}>
          <Text style={styles.buttonText}>Add Log</Text>
        </TouchableOpacity>
        <Text>{'\n'}</Text> 
        <TouchableOpacity style={styles.button} onPress={this.handleGoto.bind(this)}>
          <Text style={styles.buttonText}>Go to Dashboard</Text>
        </TouchableOpacity>
        <Text>{'\n'}</Text> 
         <FlatList
          data={this.state.logs}
          extraData={this.state.refresh}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
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
    marginVertical: 15,
    fontSize:30,
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
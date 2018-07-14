import React from 'react';
import {StackNavigator} from 'react-navigation';
import { StyleSheet, Text, View, TouchableOpacity, AsyncStorage, Alert, FlatList, BackHandler } from 'react-native';
import Goal from './Goal';

export default class Dashboard extends React.Component {

  constructor(){
    super();
    this.state={goals:[],refresh:true};
  }

  handlePress(){
      this.props.navigation.navigate('AddGoals',{username:this.props.navigation.state.params.username});
  }

  deleteGoal = (goal) => {
    AsyncStorage.removeItem(goal);
    AsyncStorage.removeItem(goal+"_log");
    let temp = this.state.goals;
    let index = temp.indexOf(goal);
    temp.splice(index,1);
    this.setState({goals:temp, refresh:!this.state.refresh});
    this.props.navigation.state.params.handleDelete();
  }

  handleDelete(goal){
    Alert.alert(
    'Delete Confirmation',
    'Delete '+goal+' ?',
      [
        {text: 'Cancel', onPress: () => {}},
        {text: 'OK', onPress: () => this.deleteGoal(goal)},
      ]
    );
  }

  async handlePlus(goal){
    let count = await AsyncStorage.getItem(goal);
    count = Number(count) + 1;
    await AsyncStorage.setItem(goal,String(count));
  }

  async componentWillMount(){
      let temp =  await AsyncStorage.getAllKeys();
      let index = temp.indexOf(x => x === "username");
      temp.splice(index, 1);
      for(let i=0; i<temp.length; i++){
        if(temp[i].includes("_log")){
          temp.splice(i,1);
        }
      }
      this.setState({goals:temp});
  }

  _keyExtractor = (item) => item;

  _renderItem = ({item}) => (
    <Goal key={item} 
      goal={item} 
      buttons='true' 
      username = {this.props.navigation.state.params.username}
      navigation = {this.props.navigation}
      handlePlus={this.handlePlus.bind(this)} 
      handleDelete={this.handleDelete.bind(this)} 
    />
  );

  handleExit(){
    Alert.alert(
    'Exit Confirmation',
    'Exit app?',
      [
        {text: 'Cancel', onPress: () => {}},
        {text: 'OK', onPress: () => BackHandler.exitApp()},
      ]
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.greetings}>Welcome to your Dashboard: {'\n'}{this.props.navigation.state.params.username}</Text>
        <TouchableOpacity style={styles.button} onPress={this.handlePress.bind(this)}>
          <Text style={styles.buttonText} >Add more</Text>
        </TouchableOpacity> 
        <Text>{'\n'}</Text> 
        <Text style={styles.note}>Tap on goal to add logs</Text> 
        <Text>{'\n'}</Text> 
        <FlatList
          data={this.state.goals}
          extraData={this.state.refresh}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
        <TouchableOpacity style={styles.exit_button} onPress={this.handleExit.bind(this)}>
          <Text style={styles.buttonText} >X</Text>
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
    marginVertical: 15,
    fontSize:25,
    color:"white",
    fontWeight:"bold",
    textAlign:"center"
  },
  note: {
    fontSize:16,
    color:"white",
    fontWeight:"bold",
    textAlign:"center"
  },
  buttonText: {
   color:"#4286f4", fontSize:20, fontWeight:"bold", textAlign:"center"
  },
  button:{
    width:200,
    backgroundColor:'white',
    borderRadius:25,
    paddingVertical:10
  },
  exit_button:{
    width:28,
    height:30,
    borderRadius:50,
    backgroundColor:'white',
    marginVertical:10
  }
});

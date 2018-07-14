import React from 'react';
import {StackNavigator} from 'react-navigation';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button, AsyncStorage} from 'react-native';

export default class Goal extends React.Component {

  constructor(){
    super();
    this.state={count:0};
  }

  async componentWillMount(){
    let count = await AsyncStorage.getItem(this.props.goal);
    this.setState({count:count});
  }

  handleDelete(){
    this.props.handleDelete(this.props.goal);
  }

  handlePlus(){
    this.setState({count:Number(this.state.count)+1});
    this.props.handlePlus(this.props.goal);
  }

  handlePress(){
    this.props.navigation.navigate('LogsList',{goal:this.props.goal, username:this.props.username, handleDelete:this.handleDelete.bind(this)});
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.count} onPress={()=>{}}>
             <Text style={styles.buttonText} >{this.state.count}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.goals} onPress={this.handlePress.bind(this)}>
          <Text style={styles.goals_text}>{this.props.goal}</Text>
        </TouchableOpacity>
        
          <TouchableOpacity style={styles.button} onPress={this.handlePlus.bind(this)}>
             <Text style={styles.buttonText} >+</Text>
          </TouchableOpacity> 
        
        
          <Button title="X" onPress={this.handleDelete.bind(this)}/>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection:"row",
    alignItems:'center'
  },
  count: {
    margin:8,
    width:50,
    backgroundColor:'white',
    paddingVertical:10
  },
  goals: {
    width:"59%",
    paddingVertical:10
  },
  goals_text: {
    color:'white',
    fontWeight:"bold"
  },
  buttonText: {
   color:"#4286f4", fontSize:20, fontWeight:"bold", textAlign:"center"
  },
  button:{
    margin:10,
    width:28,
    height:32,
    backgroundColor:'white',
    borderRadius:50
  }
});


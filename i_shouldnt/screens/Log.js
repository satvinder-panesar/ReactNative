import React from 'react';
import {StackNavigator} from 'react-navigation';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button, AsyncStorage} from 'react-native';

export default class Log extends React.Component {

  constructor(){
    super();
    this.state={log:"", month:"", day:"", hours:"", minutes:""};
  }

  componentWillMount(){
    let arr = this.props.log;
    arr = arr.split("@");
    this.setState({month:arr[0], day:arr[1], hours:arr[2], minutes:arr[3], log:arr[4]});
  }

  handleDelete(){
    this.props.handleDelete(this.props.log);
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.date} onPress={()=>{}}>
             <Text style={styles.month_day}>{this.state.month}{" "}{this.state.day}</Text>
             <Text style={styles.hours_minutes}>{this.state.hours}{":"}{this.state.minutes}</Text>
        </TouchableOpacity>
        <Text style={styles.log_text}>{this.state.log}</Text>
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
  log_text: {
    color:'white',
    fontWeight:"bold",
    width:"64%",
    marginLeft:10,
    marginRight:10
  },
  date: {
    margin:8,
    width:60,
    height:54,
    backgroundColor:'white',
    paddingVertical:5
  },
  month_day: {
   color:"#4286f4", fontSize:16, fontWeight:"bold", textAlign:"center"
  },
  hours_minutes: {
   color:"#4286f4", fontSize:14, fontWeight:"bold", textAlign:"center"
  },
});


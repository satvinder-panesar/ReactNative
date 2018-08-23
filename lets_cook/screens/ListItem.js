import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';

export default class ListItem extends React.Component {

	constructor(){
		super()
		this.removeFromList = this.removeFromList.bind(this)
	}

	removeFromList(object){
		this.props.removeFromList(object)
	}

	  render() {
	    return (
	      <View style={styles.container}>
	        <Text style={styles.text}>{this.props.id}</Text>
	        {this.props.showButtons && <Button style={styles.button} title="x" onPress={() => this.removeFromList(this.props.id)} />}
	      </View>
	      
	    );
	  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text: {
    flex:1,
    fontSize: 15,
    fontWeight: 'bold'
  },
  button: {
    flex:1,
  },
});




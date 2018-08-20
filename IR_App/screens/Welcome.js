import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class Welcome extends React.Component {

  constructor(){
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(){
    this.props.navigation.navigate('ImageCapture');
  }

  render() {

    return (
      <View style={styles.container}>
      <View style={{flex: 1}} />
       <Text style={styles.text}>Wecome to the app</Text>
       <TouchableOpacity style={{flex:1}} onPress={this.handleClick}>
       <Text style={styles.text}>Click to continue</Text>
       </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  text:{
    flex: 1
  },
  button:{
    flex: 1
  }
});

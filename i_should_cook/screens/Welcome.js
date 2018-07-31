import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';

export default class App extends React.Component {

  handleTouch(){
    this.props.navigation.navigate('TakePicture');
  }

  render() {
    return (
      <ImageBackground style={styles.container} source={require('../images/logo.jpg')}>
         <TouchableOpacity style={styles.touch} onPress={this.handleTouch.bind(this)}>
          <Text style={styles.text}>Touch to continue</Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  touch: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize:15, 
    fontWeight:"bold"
  }
});

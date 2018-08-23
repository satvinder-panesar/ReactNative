import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

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
       <Image
          source={require('../images/banner.jpg')}

          style={styles.banner}
        />
       <TouchableOpacity style={styles.button} onPress={this.handleClick}>
       <Text style={styles.text}>CLICK TO CONTINUE</Text>
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
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 25
  },
  button:{
    flex: 1,
  },
  banner: {
    flex: 5,
    width: "100%"
  }
});

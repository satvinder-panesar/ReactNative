import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class MyListItem extends React.Component {

  render() {   

    return (
      <View style={styles.container}>
        <Text style={styles.text}>{this.props.item}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black'
  },
  text: {
    color:"white",
  }
});


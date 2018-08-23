import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image } from 'react-native';
import ListItem from './ListItem';

export default class Recipe extends React.Component {

  constructor(){
    super()
    this.state = {name: null, steps: [], imageURL: null}
  }

  componentWillMount(){
    return fetch('http://192.168.1.161:8084/')
  .then((response)=>response.json())
  .then((parsedJson)=>this.setState({name: parsedJson[0].name, steps: parsedJson[0].steps, imageURL: parsedJson[0].imageURL}))
  }

   _keyExtractor = (item) => item;

  _renderItem = ({item}) => (
    <ListItem
      id={item}
    />
  );

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Recipe Found</Text>
        <Text style={styles.name}>{this.state.name}</Text>
        <FlatList
        data={this.state.steps}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
        style={styles.steps}
      />
      <Image style={styles.image} source={{uri: this.state.imageURL}} />
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
  title: {
    fontSize:30,
    fontWeight: "bold",
    marginTop: 5
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop:15,
    marginLeft:10,
    marginRight:10,
    textDecorationLine:'underline'
  },
  steps: {
    flex:4,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20
  },
  image: {
    flex: 2,
    width: 200,
    height: 60,
    marginBottom: 10
  }

});


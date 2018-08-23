import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import ListItem from './ListItem';

export default class List extends React.Component {

  constructor(){
    super()
    this.state = ({objects: [], changeFlag: false})
    this.removeFromList = this.removeFromList.bind(this)
    this.getRecepie = this.getRecepie.bind(this)
  }

  componentWillMount(){
    this.setState({objects: this.props.navigation.state.params.objects})
  }

  removeFromList(object){
    let temp = this.state.objects
    let index = temp.indexOf(object)
    if(index != -1){
      temp.splice(index, 1)
      this.setState({objects: temp, changeFlag: !this.state.changeFlag})
      this.props.navigation.state.params.removeFromList(object)
    }
  }  

  getRecepie(){
     this.props.navigation.navigate('Recipe', {objects: this.state.objects});
  }

  _keyExtractor = (item) => item;

  _renderItem = ({item}) => (
    <ListItem
      id={item}
      removeFromList={this.removeFromList}
      showButtons={true}
    />
  );

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Your ingredients</Text>
        <FlatList
        data={this.state.objects}
        extraData={this.state.changeFlag}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
        style={this.list}
      />
        <TouchableOpacity style={styles.button} onPress={this.getRecepie}>
          <Text style={styles.buttonText} >Get Recipe</Text>
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
  text: {
    flex:1,
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 15
  },
  list: {
    flex:4
  },
  buttonText: {
   color:'white', fontSize:20, fontWeight:"bold", textAlign:"center"
  },
  button:{
    width:200,
    backgroundColor:'#7b7e84',
    borderRadius:25,
    paddingVertical:10,
    marginBottom: 15
  },
});


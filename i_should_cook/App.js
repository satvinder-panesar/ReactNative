import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import { RNCamera } from 'react-native-camera';
import MyListItem from './components/MyListItem';

export default class App extends React.Component {

  constructor(){
    super()
    this.state={data:['a', 'b','c','d'], extraData:false, }
  }  

   takePicture= () =>{
    const options = {};
    //options.location = ...
    this.camera.capture({metadata: options})
      .then((data) => console.log(data))
      .catch(err => console.error(err));
  }

  _keyExtractor = (item) => item;

  _renderItem = ({item}) => (
    <MyListItem
      id = {item}
      item = {item}
    />
  );

  render() {   

    return (
      <View style={styles.container}>
        <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style = {styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.on}
            permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={'We need your permission to use your camera phone'}
        />
        <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center',}}>
        <TouchableOpacity
            onPress={()=>{}}
            style = {styles.capture}
        >
            <Text style={{fontSize: 14}}> SNAP </Text>
        </TouchableOpacity>
        <FlatList
        data={this.state.data}
        extraData={this.state.extraData}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
        </View>
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
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20
  }
});


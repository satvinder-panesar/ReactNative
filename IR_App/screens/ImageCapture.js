import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { TfImageRecognition } from 'react-native-tensorflow';

export default class ImageCapture extends React.Component {

  constructor(){
    super()
    this.classifier = null;
  }

  trainClassifier(){

    // this.classifier = new TfImageRecognition({
    //   model:require('./tensorflow_inception_graph.pb'),
    //   labels: require('./tensorflow_labels.txt')
    // })
 

  }

  componentDidMount(){
    this.trainClassifier()
  }

  async componentWillUnmount(){
    //await tfImageRecognition.close()
  }

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
            <Text style={{fontSize: 14}}> CAPTURE </Text>
        </TouchableOpacity>
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

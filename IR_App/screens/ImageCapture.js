import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { TfImageRecognition } from 'react-native-tensorflow';

export default class ImageCapture extends React.Component {

  constructor(){
    super()
    this.classifier = null;
    this.takePicture = this.takePicture.bind(this)
    this.state = {status: "init"}
  }

  async trainClassifier(){

    this.classifier = await new TfImageRecognition({
    model:require('../assets/tensorflow_inception_graph.pb'),
    labels: require('../assets/tensorflow_labels.txt')
    })

    this.setState({status: "Training completed"})
 

  }

  async takePicture(){

    const options = { quality: 0.5, base64: true };
    const data = await this.camera.takePictureAsync(options)

    const results = await this.classifier.recognize({
        image: data.uri
      })

    this.setState({status: results[0].name})

  }

  componentDidMount(){
    this.trainClassifier()
  }

  async componentWillUnmount(){
    await tfImageRecognition.close()
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
         <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center',}}>
        <TouchableOpacity
            onPress={this.takePicture}
            style = {styles.capture}
        >
            <Text style={{fontSize: 14}}> CAPTURE </Text>
        </TouchableOpacity>
        <Text style={styles.app_status}>{this.state.status}</Text>
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
    flex: 4,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20
  },
  app_status: {
    flex:1,
    color: 'white',
    alignSelf: 'center'
  }
});

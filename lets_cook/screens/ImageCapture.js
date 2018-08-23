import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { TfImageRecognition } from 'react-native-tensorflow';

export default class ImageCapture extends React.Component {

  constructor(){
    super()
    this.classifier = null;
    this.takePicture = this.takePicture.bind(this)
    this.viewList = this.viewList.bind(this)
    this.addToList = this.addToList.bind(this)
    this.removeFromList = this.removeFromList.bind(this)
    this.object = null;
    this.state = {objects: []}
  }

  async trainClassifier(){

    this.classifier = await new TfImageRecognition({
    model:'file://tensorflow_inception_graph.pb',
    labels: 'file://tensorflow_labels.txt'
    })
  }

  async takePicture(){

    const options = { quality: 0.5, base64: true };
    const data = await this.camera.takePictureAsync(options)

    const results = await this.classifier.recognize({
        image: data.uri
      })

    this.object = results[0].name

    Alert.alert(
      'Object Identified',
       this.object,
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: this.addToList},
      ],
      { cancelable: false }
    )
  }

  addToList(){
    let temp = this.state.objects
    if(temp.indexOf(this.object) == -1){
      temp.push(this.object)
      this.setState({objects: temp})
    }
  }

  removeFromList(object){
    let temp = this.state.objects
    let index = temp.indexOf(object)
    if(index != -1){
      temp.splice(index, 1)
      this.setState({objects: temp})
    }
  }

  viewList(){
    if(this.state.objects.length > 0){
      this.props.navigation.navigate('List', {objects: this.state.objects, removeFromList: this.removeFromList});
    }else{
      alert("List is empty")
    }
  }

  componentDidMount(){
    this.trainClassifier()
  }

  async componentWillUnmount(){

    await this.classifier.close()
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
            flashMode={RNCamera.Constants.FlashMode.off}
            permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={'We need your permission to use your camera phone'}
        />
         <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
            <TouchableOpacity
                onPress={this.takePicture}
                style = {styles.button}
            >
                <Text style={styles.text}> CAPTURE </Text>
            </TouchableOpacity>
             <TouchableOpacity
                onPress={this.viewList}
                style = {styles.button}
            >
                <Text style={styles.text}> VIEW LIST </Text>
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
    flex: 6,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  button: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});

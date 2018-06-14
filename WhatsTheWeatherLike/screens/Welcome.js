import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert, Image} from 'react-native';

export default class Welcome extends React.Component {

  constructor(){
    super();
    this.state={city:""}
  }

  setState(value){
    this.state.city = value;
  }

  handlePress(){
    if(this.state.city == ""){
      Alert.alert(
      'Warning',
      'Data Needed',
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')}
      ],
      { cancelable: false }
      )
    }
    else{
      this.props.navigation.navigate('WeatherInfo',{city:this.state.city})
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={{width:400, height: 150}} source={{uri:'https://www.theandroidsoul.com/wp-content/uploads/2016/08/Weather-Quick-settings-tile-1.jpg'}} />
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>{'\n'}What's the weather like?{'\n'}</Text>
        <Text>Single app for all the weather information</Text>
        <TextInput style={{width:150, height: 50}} placeholder="Enter city name" onChangeText={(value) => this.setState(value)}/>
        <Button title="Get the weather" onPress={this.handlePress.bind(this)}/>
        <Text>{'\n'}@Powered by openweathermap.org</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

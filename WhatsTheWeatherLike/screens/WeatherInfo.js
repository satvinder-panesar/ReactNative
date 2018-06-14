import React from 'react';
import { StyleSheet, Text, View ,Image} from 'react-native';

export default class WeatherInfo extends React.Component {

  constructor(){
    super();
    this.state={visibility:"NA",description:"NA",temperature:"NA",pressure:"NA"};
  }

  componentWillMount(){
    let city = this.props.navigation.state.params.city;
    console.log(city);
    return fetch('http://samples.openweathermap.org/data/2.5/weather?q='+city+',us&appid=b6907d289e10d714a6e88b30761fae22')
    .then((response)=>response.json())
    .then((parsedJson)=>this.setState({visibility:parsedJson.visibility,description:parsedJson.weather[0].description,temperature:parsedJson.main.temp,pressure:parsedJson.main.pressure}))
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={{width:400, height: 150}} source={{uri:'https://www.theandroidsoul.com/wp-content/uploads/2016/08/Weather-Quick-settings-tile-1.jpg'}} />
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>{'\n'}Weather Information:</Text>
        <Text>Description : {this.state.description}</Text>
        <Text>Temperature : {this.state.temperature}</Text>
        <Text>Pressure : {this.state.pressure}</Text>
        <Text>Visibility : {this.state.visibility}</Text>       
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

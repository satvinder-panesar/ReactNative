import React from 'react';
import {StackNavigator} from 'react-navigation';
import Welcome from './screens/Welcome';
import WeatherInfo from './screens/WeatherInfo';

const App = StackNavigator({
  Welcome:{screen:Welcome},
  WeatherInfo:{screen:WeatherInfo}
});

export default App;

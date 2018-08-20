import {StackNavigator} from 'react-navigation';
import Welcome from './screens/Welcome';
import ImageCapture from './screens/ImageCapture';

const navigationOptions = {header: null};

const App = StackNavigator({
  Welcome:{screen:Welcome, navigationOptions:navigationOptions},
  ImageCapture:{screen:ImageCapture, navigationOptions:navigationOptions}
});

export default App;



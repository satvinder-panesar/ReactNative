import {StackNavigator} from 'react-navigation';
import Welcome from './screens/Welcome';
import TakePicture from './screens/TakePicture'

const navigationOptions = {header: null};

const App = StackNavigator({
  Welcome:{screen:Welcome, navigationOptions:navigationOptions},
  TakePicture:{screen:TakePicture, navigationOptions:navigationOptions}
});

export default App;
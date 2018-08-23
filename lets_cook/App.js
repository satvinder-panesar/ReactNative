import {StackNavigator} from 'react-navigation';
import Welcome from './screens/Welcome';
import ImageCapture from './screens/ImageCapture';
import List from './screens/List';
import Recipe from './screens/Recipe';


const navigationOptions = {header: null};

const App = StackNavigator({
  Welcome:{screen:Welcome, navigationOptions:navigationOptions},
  ImageCapture:{screen:ImageCapture, navigationOptions:navigationOptions},
  List:{screen:List, navigationOptions:navigationOptions},
  Recipe:{screen:Recipe, navigationOptions:navigationOptions}
});

export default App;



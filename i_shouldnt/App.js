import React from 'react';
import {StackNavigator} from 'react-navigation';
import { StyleSheet, Text, View, TouchableOpacity, BackHandler, Alert} from 'react-native';
import Welcome from './screens/Welcome';
import AccountSetup from './screens/AccountSetup';
import Dashboard from './screens/Dashboard';
import AddGoals from './screens/AddGoals';
import LogsList from './screens/LogsList';

 const styles = StyleSheet.create({
  buttonText: {
   color:"white", fontSize:18, fontWeight:"bold", textAlign:"center"
  },
  button:{
  	marginRight:10,
    width:40,
    backgroundColor:'#ff9b21',
    borderRadius:25,
    paddingVertical:6
  }
});

 const navigationOptions = {header: null};

const App = StackNavigator({
  Welcome:{screen:Welcome, navigationOptions:navigationOptions},
  AccountSetup:{screen:AccountSetup, navigationOptions:navigationOptions},
  AddGoals:{screen:AddGoals, navigationOptions:navigationOptions},
  Dashboard:{screen:Dashboard, navigationOptions:navigationOptions},
  LogsList:{screen:LogsList, navigationOptions:navigationOptions}
});

export default App;


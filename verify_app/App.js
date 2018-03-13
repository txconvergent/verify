import React from 'react';
import {StackNavigator} from 'react-navigation';

import LoginScreen from './components/Login/LoginScreen';
import HomeScreen from './components/HomeScreen';

const App = StackNavigator({
	Login: { screen: LoginScreen },
	Home: { screen: HomeScreen },
},{
  	headerMode: 'none',
  	navigationOptions: {
    	headerVisible: false,
  	}
});

export default App;

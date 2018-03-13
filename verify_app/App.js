import React from 'react';
import {AsyncStorage, Component} from 'react-native';
import {StackNavigator} from 'react-navigation';

import LoginScreen from './components/Login/LoginScreen';
import HomeScreen from './components/HomeScreen';

const LoginNav = StackNavigator({
	Login: { screen: LoginScreen },
	Home: { screen: HomeScreen },
},{
  	headerMode: 'none',
  	navigationOptions: {
    	headerVisible: false,
  	},
	initialRouteName: 'Login'
});

const HomeNav = StackNavigator({
	Login: { screen: LoginScreen },
	Home: { screen: HomeScreen },
},{
  	headerMode: 'none',
  	navigationOptions: {
    	headerVisible: false,
  	},
	initialRouteName: 'Home'
});

class App extends React.Component {
	state = {
		loggedIn: false,
		skipped: false,
	}

	constructor() {
		super();
		AsyncStorage.getItem('skipped', (err, result) => {
			let r = result === 'true';
			console.log(r);
			this.setState({skipped: r});
		});
	}

	render() {
		if (this.state.loggedIn || this.state.skipped) {
			return(<HomeNav/>);
		} else {
			return(<LoginNav/>);
		}
	}
}

export default App;

import React from 'react'; //need whole React library for JSX code
import { View, Image, TextInput, Text, Dimensions } from 'react-native';

import logo from '../../images/full_logo.png';

const { width } = Dimensions.get('window');

class LoginScreen extends React.Component {
	state = {
		usernameText: "username",
		passwordText: "password",
	};

	render() {
		return(
			<View
				style={{
					flex: 1,
					backgroundColor: "rgba(57, 208, 82, 1.0)",
					alignItems: 'center',
					justifyContent: 'center',
				}}>
				<Image
					source={logo}
					style={{
						width: 250,
						height: 133,
					}}/>
				<View style={{alignItems: 'flex-end'}}>
					<TextInput
	        			style={{
							width: width / 3 * 2,
							height: 50,
							borderColor: '#ffffff',
							borderBottomWidth: 1,
							color: 'white',
						}}
	        			onChangeText={(text) => this.setState({text})}
	        			value={this.state.text}
						onClick={this.focus}
	      			/>
					<Text style={{color:'white'}}>username</Text>
				</View>
				<View style={{alignItems: 'flex-end'}}>
					<TextInput
						style={{
							height: 50,
							width: width / 3 * 2,
							borderColor: '#ffffff',
							borderBottomWidth: 1,
							color: 'white',
						}}
					/>
					<Text style={{color:'white'}}>password</Text>
				</View>
				<View style={{
					marginTop: 20,
					flexDirection: 'row',
					alignItems: 'flex-start',
					justifyContent: 'space-between',
					width: width / 3 * 2
				}}>
					<Text
						style={{color:'white'}}
						onPress={() => this.props.navigation.navigate('Home')}
					>
						skip
					</Text>
					<Text style={{color:'white'}}>register</Text>
				</View>
			</View>
		);
	}
};

export default LoginScreen;

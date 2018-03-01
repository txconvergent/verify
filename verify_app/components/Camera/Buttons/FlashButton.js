//import libraries for making a components
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Camera } from 'expo';

const FlashButton = (props) => {
	const app = props.app;

	if (props.flash === Camera.Constants.FlashMode.off) {
		return (<TouchableOpacity style={{
				flex: 0.1,
				alignSelf: 'flex-start',
				alignItems: 'center'
			}} onPress={() => {
				app.setState({
					flash: props.flash === Camera.Constants.FlashMode.on
						? Camera.Constants.FlashMode.off
						: Camera.Constants.FlashMode.on
				});
			}}>
			<Ionicons name="ios-flash-outline" size={35} color="white"/>
		</TouchableOpacity>);
	} else {
		return (<TouchableOpacity style={{
				flex: 0.1,
				alignSelf: 'flex-start',
				alignItems: 'center'
			}} onPress={() => {
				app.setState({
					flash: props.flash === Camera.Constants.FlashMode.on
						? Camera.Constants.FlashMode.off
						: Camera.Constants.FlashMode.on
				});
			}}>
			<Ionicons name="ios-flash" size={32} color="white"/>
		</TouchableOpacity>);
	}
}

export default FlashButton;

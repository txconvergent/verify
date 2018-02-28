//import libraries for making a components
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Camera } from 'expo';

const ReverseCameraButton = (props) => {
	const app = props.app;

	return(
		<TouchableOpacity style={{
				flex: 0.1,
				alignSelf: 'flex-start',
				alignItems: 'center'
			}} onPress={() => {
				app.setState({
					type: app.state.type === Camera.Constants.Type.back
						? Camera.Constants.Type.front
						: Camera.Constants.Type.back
				});
			}}>
			<Ionicons name="ios-reverse-camera-outline" size={32} color="white"/>
		</TouchableOpacity>
	);
}

export default ReverseCameraButton;

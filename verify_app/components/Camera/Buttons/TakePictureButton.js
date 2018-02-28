//import libraries for making a components
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Camera } from 'expo';

const TakePictureButton = (props) => {
	const app = props.app;

	return(
	<TouchableOpacity style={{
			flex: 0.2,
			alignSelf: 'flex-end',
			alignItems: 'center',
			justifyContent: 'center'
		}} onPress={async () => {
			if (app.camera) {
				app.setState({photo: await app.camera.takePictureAsync()});
			}
		}}>
		<FontAwesome name="circle-thin" size={85} color="white"/>
	</TouchableOpacity>
	);
};

export default TakePictureButton;

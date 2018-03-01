//import libraries for making a components
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Camera } from 'expo';

const TakePictureButton = (props) => {
	const app = props.app;

	return(
	<TouchableOpacity style={{
			flex: 0.3,
			alignSelf: 'flex-end',
			alignItems: 'center',
			justifyContent: 'center',
			paddingBottom: 10,
		}} onPress={async () => {
			if (app.camera) {
				app.camera.takePictureAsync().then( data => {
					app.setState({photo: data});
				});
			}
		}}>
		<FontAwesome name="circle-thin" size={90} color="white"/>
	</TouchableOpacity>
	);
};

export default TakePictureButton;

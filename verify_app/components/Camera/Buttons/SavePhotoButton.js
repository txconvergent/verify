//import libraries for making a components
import React from 'react';
import { TouchableOpacity, CameraRoll } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Camera } from 'expo';

const SavePhotoButton = (props) => {
	const app = props.app;

	if (app.state.photoSaved == null) {
		return(
			<TouchableOpacity style={{
					flex: 0.1,
					alignItems: 'center',
					paddingLeft: 30,
					paddingBottom: 30,
				}} onPress={async () => {
					 let temp = await CameraRoll.saveToCameraRoll(app.state.photo.uri, 'photo');
					 app.setState({
						 photoSaved: temp,
					 });
				}}>
				<Feather name="download" size={34} color="white"/>
			</TouchableOpacity>
		);
	} else {
		return(
			<TouchableOpacity style={{
					flex: 0.1,
					alignItems: 'center',
					paddingLeft: 30,
					paddingBottom: 30,
				}}>
				<Feather name="check" size={34} color="white"/>
			</TouchableOpacity>
		);
	}
}

export default SavePhotoButton;

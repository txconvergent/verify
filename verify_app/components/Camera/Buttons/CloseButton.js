import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CloseButton = (props) => {
	const app = props.app;

	return(
		<TouchableOpacity
			style={{
				flex: 0.1,
				alignSelf: 'flex-end',
				alignItems: 'center',
				marginRight: 10,
				paddingRight: 5,
			}}
			onPress={() => {
				app.setState({photo: null, photoSaved: null});
			}}>

			<Ionicons name="md-close" size={34} color="white"/>
		</TouchableOpacity>
	);
}

export default CloseButton;

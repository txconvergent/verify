import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SendButton = (props) => {
	const app = props.app;

	return(
		<TouchableOpacity
			style={{
				flex: 1,
				justifyContent: 'flex-end',
				alignSelf: 'flex-end',
        marginRight: 10,
        marginBottom: 10
			}}>

			<Ionicons name="ios-arrow-forward" size={70} color="white"/>
		</TouchableOpacity>
	);
}

export default SendButton;

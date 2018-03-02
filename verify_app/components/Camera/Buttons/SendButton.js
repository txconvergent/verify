import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FileSystem } from 'expo';

const SendButton = (props) => {
	const app = props.app;

	return(
		<TouchableOpacity
			style={{
				flex: 0.1,
				justifyContent: 'flex-end',
				alignSelf: 'flex-end',
		        marginRight: 10,
		        marginBottom: 10
			}}
			onPress = {async () => {
				FileSystem.moveAsync({
					from: app.state.photo.uri,
					to: `${FileSystem.documentDirectory}/Photo_${(new Date()).getTime()}.jpg`
				}).then(() => {
					app.setState({
						photo: null
					});
				});
			}}>

			<Ionicons name="ios-arrow-forward" size={60} color="white"/>
		</TouchableOpacity>
	);
}

export default SendButton;

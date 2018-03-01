//import libraries for making a components
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Camera } from 'expo';

const PhotosButton = (props) => {
	const app = props.app;

	return(
	<TouchableOpacity style={{
			flex: 0.1,
			alignSelf: 'flex-end',
			alignItems: 'flex-end',
			justifyContent: 'flex-end',
			paddingRight: 25,
			paddingBottom: 25,
		}} onPress={async () => {
			app.refs.swiper.scrollBy(1);
		}}>
		<Ionicons name="ios-photos-outline" size={28} color="white"/>
	</TouchableOpacity>
	);
};

export default PhotosButton;

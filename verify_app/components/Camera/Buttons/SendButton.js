import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FileSystem } from 'expo';
import crypto from 'isomorphic-webcrypto'

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
				try {
					FileSystem.moveAsync({
						from: app.state.photo.uri,
						to: `${FileSystem.documentDirectory}photos/${(new Date()).getTime()}.jpg`
					}).then(() => {
						_hashPic(app.state.photo.base64)
						app.setState({
							photo: null,
						});
						FileSystem.readDirectoryAsync(FileSystem.documentDirectory+'photos/').then(
				      resp => { app.setState({photos: resp}) });
					});
				} catch (error) {
					console.error("Failed saving to device");
				}
			}}>

			<Ionicons name="ios-arrow-forward" size={60} color="white"/>
		</TouchableOpacity>
	);
}

function _hashPic(pic){
	crypto.subtle.digest(
    {
        name: "SHA-256",
    },
    new Uint8Array(pic) //The data you want to hash as an ArrayBuffer
	)
	.then(function(hash){
	    //returns the hash as an ArrayBuffer
	    console.log(new Uint8Array(hash));
	})
	.catch(function(err){
	    console.error(err);
	});
}

export default SendButton;

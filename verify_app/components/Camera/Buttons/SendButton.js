import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FileSystem } from 'expo';

import crypto from 'isomorphic-webcrypto';
import hex from 'hex-lite';

var TextEncoder = require('text-encoding').TextEncoder;

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
		{ name: "SHA-256" },
		new TextEncoder().encode(pic.slice(pic.length - 1000)) //The data you want to hash as an ArrayBuffer
	)
	.then(hash => {
		console.log(hex.fromBuffer(hash));

		fetch("http://10.146.70.235:3000/postToDatabase",
			{
				method: "post",
				body: JSON.stringify({
					hashCode: hex.fromBuffer(hash),
					imageFileBinary: pic
				}),
				headers: {
			    	"Content-Type": "application/json"
				},
				credentials: "same-origin"
			}
		).then(function(response) {
			console.log("success");
		}, function(error) {
			console.log("error: " + error);
		})
	})
	.catch(function(err){
	    console.error(err);
	});
}

export default SendButton;

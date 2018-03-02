import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Camera, Permissions} from 'expo';
import {Ionicons, FontAwesome} from '@expo/vector-icons';

import Swiper from 'react-native-swiper';
import Header from './components/Header/Header';

import LiveCameraView from './components/Camera/LiveCameraView';
import StillPictureView from './components/Camera/StillPictureView';


export default class verify extends React.Component {
	state = {
		hasCameraPermission: null,
		type: Camera.Constants.Type.back,
		flash: Camera.Constants.FlashMode.off,
		photo: null,
		photoId: 0
	};

	async componentWillMount() {
		const {status} = await Permissions.askAsync(Permissions.CAMERA);
		this.setState({
			hasCameraPermission: status === 'granted'
		});
	}

	render() {
		const {hasCameraPermission} = this.state;

		if (this.state.photo == null) {
			if (hasCameraPermission === null) {
				return <View/>;
			} else if (hasCameraPermission === false) {
				return <Text>No access to camera</Text>;
			} else {
				return (
				<Swiper ref="swiper" loop={false} showsPagination={false}>
					<View style={styles.container}>
						<LiveCameraView app={this} />
					</View>
					<View style={styles.container}>
						<Header headerText={'Photos'}/>
					</View>
				</Swiper>);
			}
		} else {
			return (
			<View style={styles.container}>
				<StillPictureView app={this} />
			</View>
			);
		}
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});

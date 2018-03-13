import React from 'react';

import { StyleSheet, Text, View } from 'react-native';
import {Camera, Permissions, FileSystem} from 'expo';
import {Ionicons, FontAwesome} from '@expo/vector-icons';

import Swiper from 'react-native-swiper';
import Header from './Header/Header';
import StatusBarPadder from './Header/StatusBarPadder';
import PhotoList from './PhotoList';

import LiveCameraView from './Camera/LiveCameraView';
import StillPictureView from './Camera/StillPictureView';

class HomeScreen extends React.Component {
	state = {
		hasCameraPermission: null,
		type: Camera.Constants.Type.back,
		flash: Camera.Constants.FlashMode.off,
		photo: null,
		photos: []
	};

	async componentWillMount() {
		const {status} = await Permissions.askAsync(Permissions.CAMERA);
		this.setState({
			hasCameraPermission: status === 'granted'
		});

		FileSystem.readDirectoryAsync(FileSystem.documentDirectory+'photos/').then(
      resp => { this.setState({photos: resp}) });
	}

	async componentDidMount(dir=FileSystem.documentDirectory + 'photos/') {
		const info = await FileSystem.getInfoAsync(dir);
    	if( !(info.exist || info.isDirectory)){
       		await FileSystem.makeDirectoryAsync(dir);
    	}
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
						<StatusBarPadder translucent={true} backgroundColor="rgba(57, 208, 82, 1.0)" barStyle="light-content"/>
						<Header headerText={'Photos'}/>
						<PhotoList app={this} />
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

export default HomeScreen;

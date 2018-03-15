import React from 'react';

import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import {Camera, Permissions, FileSystem} from 'expo';
import {Ionicons, FontAwesome} from '@expo/vector-icons';

import Swiper from 'react-native-swiper';
import Modal from 'react-native-modal';
import Header from './Header/Header';
import StatusBarPadder from './Header/StatusBarPadder';
import PhotoList from './PhotoList';

import LiveCameraView from './Camera/LiveCameraView';
import StillPictureView from './Camera/StillPictureView';

const { width } = Dimensions.get('window');

class HomeScreen extends React.Component {
	state = {
		hasCameraPermission: null,
		type: Camera.Constants.Type.back,
		flash: Camera.Constants.FlashMode.off,
		photo: null,
		photos: [],
		visibleModal: false,
		deletePhoto: null
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

	

	_renderModalContent = () => (
    <View style={styles.modalContent}>
			<TouchableOpacity onPress={ async () => {
				FileSystem.deleteAsync(Expo.FileSystem.documentDirectory+'photos/'+this.state.deletePhoto);
				this.state.photos.splice(this.state.photos.indexOf(this.state.deletePhoto),1);
				this.setState({ deletePhoto: null, visibleModal: false });
			} }>
				<View style={styles.button}>
					<Text>Delete Photo</Text>
				</View>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => this.setState({ visibleModal: false })}>
				<View style={styles.button}>
					<Text>Close</Text>
				</View>
			</TouchableOpacity>
    </View>
  );

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
						<Modal isVisible={this.state.visibleModal} style={styles.bottomModal}>
							{this._renderModalContent()}
						</Modal>
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
	},
	button: {
    backgroundColor: 'lightblue',
    padding: 12,
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});

export default HomeScreen;

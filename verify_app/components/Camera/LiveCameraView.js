//import libraries for making a components
import React from 'react';
import { View } from 'react-native';
import { Camera } from 'expo';

import StatusBarPadder from './../Header/StatusBarPadder';
import TakePictureButton from './Buttons/TakePictureButton';
import FlashButton from './Buttons/FlashButton';
import ReverseCameraButton from './Buttons/ReverseCameraButton';

const LiveCameraView = (props) => {
	const app = props.app;

	return (
		<Camera
			style={{ flex: 1 }}
			type={app.state.type}
			flashMode={app.state.flash}
			ref={ref => { app.camera = ref; }}>

			<StatusBarPadder translucent={true} backgroundColor="rgba(0, 0, 0, 0.0)" barStyle="light-content"/>
			<View style={{
					flex: 1,
					backgroundColor: 'transparent',
					flexDirection: 'row',
					justifyContent: 'flex-end'
				}}>
				<FlashButton flash={app.state.flash} app={app}/>
				<ReverseCameraButton app={app} />
			</View>
			<View style={{
					flex: 1,
					backgroundColor: 'transparent',
					flexDirection: 'row',
					justifyContent: 'center'
				}}>
				<TakePictureButton app={app} />
			</View>
		</Camera>
	);
}

export default LiveCameraView;

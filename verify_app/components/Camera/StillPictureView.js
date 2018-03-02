import React from 'react';
import { ImageBackground, TouchableOpacity, View } from 'react-native';
import { Camera } from 'expo';

import StatusBarPadder from './../Header/StatusBarPadder';
import CloseButton from './Buttons/CloseButton';
import SendButton from './Buttons/SendButton';
import SavePhotoButton from './Buttons/SavePhotoButton';


const StillPictureView = (props) => {
	const app = props.app;

	return(
		<ImageBackground
			source={{ uri: app.state.photo.uri }}
			style={{ flex: 1, }}
			transform={[{ scaleX: app.state.type === Camera.Constants.Type.back ? 1 : -1 }]}>

			<StatusBarPadder translucent={true} backgroundColor="rgba(0, 0, 0, 0.0)" barStyle="light-content"/>
			<CloseButton style={{
					flex: 1,
					flexDirection: 'row',
					alignItems: 'flex-start',
				}}
				app={app} />
			<View style={{
					flex: 1,
					backgroundColor: 'transparent',
					flexDirection: 'row',
					alignItems: 'flex-end',
					justifyContent: 'space-between',
				}}>
				<SavePhotoButton app={app} />
				<SendButton app={app} />
			</View>
		</ImageBackground>
	);
}

export default StillPictureView;

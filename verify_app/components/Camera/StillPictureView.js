import React from 'react';
import { ImageBackground, TouchableOpacity } from 'react-native';
import { Camera } from 'expo';

import StatusBarPadder from './../Header/StatusBarPadder';
import CloseButton from './Buttons/CloseButton';
import SendButton from './Buttons/SendButton';


const StillPictureView = (props) => {
	const app = props.app;

	return(
		<ImageBackground
			source={{ uri: app.state.photo.uri }}
			style={{ flex: 1 }}
			transform={[{ scaleX: app.state.type === Camera.Constants.Type.back ? 1 : -1 }]}>

			<StatusBarPadder translucent={true} backgroundColor="rgba(0, 0, 0, 0.0)" barStyle="light-content"/>
			<CloseButton app={app} />
			<SendButton app={app} />
		</ImageBackground>
	);
}

export default StillPictureView;

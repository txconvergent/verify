import React from 'react';
import { StyleSheet, View, StatusBar, Platform } from 'react-native';

const StatusBarPadder = ({ backgroundColor, ...props }) => (
	<View style={[styles.statusBar, { backgroundColor }]}>
		<StatusBar translucent="translucent" backgroundColor={backgroundColor} {...props}/>
	</View>);

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

const styles = StyleSheet.create({
	statusBar: {
		height: STATUSBAR_HEIGHT
	}
});

export default StatusBarPadder;

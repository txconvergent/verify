import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera, Permissions } from 'expo';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

export default class verify extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    flash: Camera.Constants.FlashMode.off,
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return(
        <View style={{ flex: 1 }}>
          <Camera style={{ flex: 1 }} type={this.state.type} ref={ref => { this.camera = ref; }}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-start',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({
                    type: this.state.flash === Camera.Constants.FlashMode.on ? Camera.Constants.Type.off : Camera.Constants.Type.on,
                  });
                }}>
                <Ionicons name="ios-flash-outline" size={32} color="white"/>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-start',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({
                    type: this.state.type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back,
                  });
                }}>
                <Ionicons name="ios-reverse-camera-outline" size={32} color="white"/>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                style={{
                  flex: 0.2,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={ async() => {
                  if (this.camera) {
                    let photo = await this.camera.takePictureAsync();
                  }
                }}>
                <FontAwesome name="circle-thin" size={85} color="white"/>
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    }
  }
}

import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, Platform, ImageBackground } from 'react-native';
import { Camera, Permissions } from 'expo';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import Swiper from 'react-native-swiper';
import Header from './components/Header';

const MyStatusBar = ({backgroundColor, ...props}) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

function FlashIcon(props) {
  if (props.flash === Camera.Constants.FlashMode.off) {
    return(
      <TouchableOpacity
        style={{
          flex: 0.1,
          alignSelf: 'flex-start',
          alignItems: 'center',
        }}
        onPress={() => {
          props.app.setState({
            flash: props.flash === Camera.Constants.FlashMode.on ? Camera.Constants.FlashMode.off : Camera.Constants.FlashMode.on,
          });
        }}>
        <Ionicons name="ios-flash-outline" size={32} color="white"/>
      </TouchableOpacity>);
  } else {
    return(
      <TouchableOpacity
        style={{
          flex: 0.1,
          alignSelf: 'flex-start',
          alignItems: 'center',
        }}
        onPress={() => {
          props.app.setState({
            flash: props.flash === Camera.Constants.FlashMode.on ? Camera.Constants.FlashMode.off : Camera.Constants.FlashMode.on,
          });
        }}>
        <Ionicons name="ios-flash" size={32} color="white"/>
      </TouchableOpacity>);
  }
}


export default class verify extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    flash: Camera.Constants.FlashMode.on,
    photo: null,
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {

    const { hasCameraPermission } = this.state;

    if (this.state.photo == null) {
      if (hasCameraPermission === null) {
        return <View />;
      } else if (hasCameraPermission === false) {
        return <Text>No access to camera</Text>;
      } else {
        return(
          <Swiper loop={false} showsPagination={false}>
            <View style={styles.container}>
              <View style={{ flex: 1 }}>
                <Camera style={{ flex: 1 }} type={this.state.type} ref={ref => { this.camera = ref; }}>
                  <MyStatusBar translucent={true} backgroundColor="rgba(0, 0, 0, 0.0)" barStyle="light-content" />
                  <View
                    style={{
                      flex: 1,
                      backgroundColor: 'transparent',
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                    }}>
                    <FlashIcon flash={this.state.flash} app={this} />
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
                      onPress={ async () => {
                          if (this.camera) {
                            this.setState({
                              photo: await this.camera.takePictureAsync(),
                            });
                          }
                        }}>
                      <FontAwesome name="circle-thin" size={85} color="white"/>
                    </TouchableOpacity>
                  </View>
                </Camera>
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <Header headerText={'Photos'} />
            </View>
          </Swiper>
        );
      }
    } else {
      return(
        <View style={styles.container}>
          <ImageBackground source={{uri: this.state.photo.uri}} style={{ flex: 1, }}>
            <MyStatusBar translucent={true} backgroundColor="rgba(0, 0, 0, 0.0)" barStyle="light-content" />
            <TouchableOpacity
              style={{
                flex: 0.1,
                alignSelf: 'flex-end',
                alignItems: 'center',
              }}
              onPress={() => {
                this.setState({
                  photo: null,
                });
              }}>
              <Ionicons name="md-close" size={32} color="white"/>
            </TouchableOpacity>
          </ImageBackground>
        </View>
      );
    }
  }
}



const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
});

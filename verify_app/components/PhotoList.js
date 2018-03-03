import React from 'react'; //need whole React library for JSX code
import { ScrollView, Dimensions, StyleSheet, TouchableHighlight, Image } from 'react-native';
import FileSystem from 'expo';

const { width } = Dimensions.get('window');

const PhotoList = (props) => {
	const app = props.app;
	return (
	  <ScrollView
	    contentContainerStyle={styles.scrollView}>
	    {
	      app.state.photos.map(photo => {
	        return (
							<TouchableHighlight
								key={photo}
								underlayColor='transparent'
	            >
	              <Image
	                style={{
	                  width: width/3,
	                  height: width/3
	                }}
	                source={{uri: Expo.FileSystem.documentDirectory+'photos/'+photo}}
	              />
	            </TouchableHighlight>
	        )
	      })
	    }
	  </ScrollView>

    )
};

styles = StyleSheet.create({
  scrollView: {
    flexWrap: 'wrap',
    flexDirection: 'row'
  }
})


export default PhotoList;

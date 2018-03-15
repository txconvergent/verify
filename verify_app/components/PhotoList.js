import React, { Component } from 'react'; //need whole React library for JSX code
import { ScrollView, Dimensions, StyleSheet, TouchableHighlight, Image } from 'react-native';
import FileSystem from 'expo';

const { width } = Dimensions.get('window');

class PhotoList extends Component{
	render() {
		const app = this.props.app;
		return (
		  <ScrollView
		    contentContainerStyle={styles.scrollView}>
		    {
		      app.state.photos.map(photo => {
		        return (
							<TouchableHighlight
								key={photo}
								underlayColor='transparent'
								onPress={() => app.setState({visibleModal: true, deletePhoto: photo})}>
								<Image
									style={styles.imageIcon}
					        source={{uri: Expo.FileSystem.documentDirectory+'photos/'+photo}}
					      />
				      </TouchableHighlight>
		        )
		      })
		    }
		  </ScrollView>
	   )
	}
};

styles = StyleSheet.create({
  scrollView: {
    flexWrap: 'wrap',
    flexDirection: 'row'
  },
	imageIcon: {
		width: width/3 - 3,
		height: width/3 - 3,
		marginTop: 2,
		marginLeft: 2
	}
})


export default PhotoList;

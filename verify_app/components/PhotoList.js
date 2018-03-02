import React from 'react'; //need whole React library for JSX code
import { ScrollView } from 'react-native';
import Photo from './Photo';

const PhotoList = (props) => {
	const app = props.app;

  function renderPhotos() {
    return app.state.photos.map(photo =>
      <Photo key={photo} photo={photo} />
    );
    //key must be unique from all other elements in array,
    //and same value across re-renders of the list (usually record's id)
  }


  return (
    <ScrollView>
      {renderPhotos()}
    </ScrollView>
  );


};

export default PhotoList;

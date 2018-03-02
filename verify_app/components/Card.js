import React from 'react';
import { View } from 'react-native';

//make this stand-alone re-useable component with nice styling
const Card = (props) => {
  //stuff inside view tells Card how to render stuff in between its tags
  //when it is called in another component (AlbumDetail)
  return (
    <View style={styles.containerStyle}>
      {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
    borderWidth: 1,
    borderRadius: 2, //round edges of borders
    borderColor: '#ddd',
    borderBottomWidth: 0, //hide bottom border
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10


  }
};

export default Card;

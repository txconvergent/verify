//import libraries for making a components
import React from 'react';
import { Text, View } from 'react-native'; //Text can format text, View formats position

//functional component: static data, can only return JSX, can't use states
const Header = (props) => {
  const { textStyle, viewStyle } = styles; //destructuring
  return (
    <View style={viewStyle}>
      <Text style={textStyle}>{props.headerText}</Text>
    </View>
  );
};

const styles = {
  viewStyle: {
    backgroundColor: '#F8F8F8',
    justifyContent: 'center', //vertical position of items in Flex Box
    alignItems: 'center', //horizontal position
    height: 60, //dimensions of Flex Box
    paddingTop: 15,
    shadowColor: '#000', //border color
    shadowOffset: {width: 0, height: 2}, //border position offset and thickness
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative'
  },
  textStyle: {
    fontSize: 20 //like CSS but with camelCase
  }
};

//make component available to other parts of app
export default Header;

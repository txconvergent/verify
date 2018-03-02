import React from 'react';
import { View, Image, Text } from 'react-native';
import Card from './Card';
import CardSection from './CardSection';
import FileSystem from 'expo';

const Photo = ({ photo }) => {


  return (
    <Card>

      <CardSection>
      <Image
        style={styles.imageStyle}
        uri={FileSystem.documentDirectory+'photos/'+photo}
      />
      </CardSection>

    </Card>
  );
};

const styles = {
  headerContentStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  headerTextStyle: {
    fontSize: 18
  },
  thumbnailStyle: {
    height: 50,
    width: 50
  },
  thumbnailContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10
  },
  imageStyle: {
    height: 300,
    flex: 1,
    width: null
  }
};

export default Photo;

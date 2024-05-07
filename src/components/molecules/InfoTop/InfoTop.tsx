import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Info} from '../../../utils/types/types';
import {Colors} from '../../../styles/Colors';

interface IInfoTopProp {
  data: Info;
}

const InfoTop = ({data}: IInfoTopProp) => {
  return (
    <>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{uri: data?.image}} />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{data?.title}</Text>
      </View>
      <View style={styles.aboutContainer}>
        <Text style={styles.title}>About Recipe</Text>
        <Text style={styles.text}>{data?.summary}</Text>
      </View>
    </>
  );
};

export default InfoTop;

const styles = StyleSheet.create({
  imageContainer: {
    marginTop: 10,
    paddingHorizontal: 20,
    width: '100%',
    height: 300,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: 20,
  },

  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: Colors.tertiary,
  },
  aboutContainer: {
    marginVertical: 20,
    marginHorizontal: 20,
  },

  text: {
    marginTop: 20,
    fontFamily: 'Poppins-Bold',
    fontSize: 12,
    color: Colors.tertiary,
  },
});

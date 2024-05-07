import {Pressable, StyleSheet} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../../styles/Colors';

interface ISearchButtonProps {
  onPress: () => Promise<void>;
}

const SearchButton = ({onPress}: ISearchButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) =>
        pressed ? [styles.searchButton, styles.pressed] : styles.searchButton
      }>
      <Icon name="search-outline" size={30} />
    </Pressable>
  );
};

export default SearchButton;

const styles = StyleSheet.create({
  searchButton: {
    width: 50,
    height: 50,
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
  },
  pressed: {
    opacity: 0.75,
  },
});

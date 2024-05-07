import {Pressable, StyleSheet, Text} from 'react-native';
import React from 'react';
import {Colors} from '../../../styles/Colors';

interface ILogoutButtonProps {
  onPress: () => void;
}

const LogoutButton = ({onPress}: ILogoutButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) =>
        pressed ? [styles.logoutButton, styles.pressed] : styles.logoutButton
      }>
      <Text style={styles.text}>Logout</Text>
    </Pressable>
  );
};

export default LogoutButton;

const styles = StyleSheet.create({
  logoutButton: {
    width: 100,
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
  text: {
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    color: Colors.primary,
  },
  pressed: {
    opacity: 0.75,
  },
});

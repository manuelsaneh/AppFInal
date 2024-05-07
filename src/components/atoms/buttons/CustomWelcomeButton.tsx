import {Pressable, StyleSheet, Text} from 'react-native';
import React from 'react';
import Animated, {
  interpolate,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {Colors} from '../../../styles/Colors';

interface ICustomWelcomeButtonProps {
  text: string;
  onPress: () => void;
  imagePosition: {value: number};
}

const CustomWelcomeButton = ({
  onPress,
  text,
  imagePosition,
}: ICustomWelcomeButtonProps) => {
  const buttonsAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(imagePosition.value, [0, 1], [250, 0]);
    return {
      opacity: withTiming(imagePosition.value, {duration: 500}),
      transform: [{translateY: withTiming(interpolation, {duration: 1000})}],
    };
  });

  return (
    <Animated.View style={buttonsAnimatedStyle}>
      <Pressable style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>{text}</Text>
      </Pressable>
    </Animated.View>
  );
};

export default CustomWelcomeButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.secondary,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 35,
    marginHorizontal: 20,
    marginVertical: 10,
    elevation: 10,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.primary,
    letterSpacing: 0.5,
    fontFamily: 'Poppins-Medium',
  },
});

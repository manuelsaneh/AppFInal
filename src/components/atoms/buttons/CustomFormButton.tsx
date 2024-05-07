import {Pressable, StyleSheet, Text} from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
} from 'react-native-reanimated';
import {Colors} from '../../../styles/Colors';

interface ICustomButtonProps {
  isRegistering: boolean;
  handleSubmit: () => void;
}

const CustomFormButton = ({
  isRegistering,
  handleSubmit,
}: ICustomButtonProps) => {
  const formButtonScale = useSharedValue(1);

  const formButtonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: formButtonScale.value}],
    };
  });

  const formButtonAnimationScale = () => {
    return (formButtonScale.value = withSequence(
      withSpring(1.5),
      withSpring(1),
    ));
  };

  const submit = () => {
    formButtonAnimationScale();
    handleSubmit();
  };

  return (
    <Animated.View style={[styles.formButton, formButtonAnimatedStyle]}>
      <Pressable onPress={submit}>
        <Text style={styles.buttonText}>
          {isRegistering ? 'REGISTER' : 'LOG IN'}
        </Text>
      </Pressable>
    </Animated.View>
  );
};

export default CustomFormButton;

const styles = StyleSheet.create({
  formButton: {
    backgroundColor: Colors.secondary,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 35,
    marginHorizontal: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'Poppins-Medium',
    color: Colors.primary,
    letterSpacing: 0.5,
  },
});

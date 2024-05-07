import {Dimensions, StyleSheet, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import Animated, {
  interpolate,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {ClipPath, Ellipse, Image, Svg} from 'react-native-svg';
import {Colors} from '../../../styles/Colors';
import {Keyboard} from 'react-native';

interface IBackgroundImage {
  imagePosition: {value: number};
}

const BackgroundImage = ({imagePosition}: IBackgroundImage) => {
  const {height, width} = Dimensions.get('window');

  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      event => {
        setKeyboardHeight(event.endCoordinates.height);
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardHeight(0);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const imageAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(
      imagePosition.value,
      [0, 1],
      [-height / 2, 0],
    );
    const interpolationSmall = interpolate(
      imagePosition.value,
      [0, 1],
      [-height / 1, 0],
    );
    return {
      transform: [
        {
          translateY: withTiming(
            keyboardHeight > 0 ? interpolationSmall : interpolation,
            {duration: 1000},
          ),
        },
      ],
    };
  });

  const closeButtonContainerStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(imagePosition.value, [0, 1], [180, 360]);
    return {
      opacity: withTiming(imagePosition.value === 1 ? 0 : 1, {duration: 800}),
      transform: [
        {rotate: withTiming(interpolation + 'deg', {duration: 1000})},
      ],
    };
  });

  return (
    <Animated.View style={[StyleSheet.absoluteFill, imageAnimatedStyle]}>
      <Svg height={height + 100} width={width}>
        <ClipPath id="clipPathId">
          <Ellipse cx={width / 2} rx={height} ry={height + 100} />
        </ClipPath>
        <Image
          href={require('../../../assets/images/PhotoWelcomeMedium.jpg')}
          width={width + 100}
          height={height + 100}
          preserveAspectRatio="xMidYMid slice"
          clipPath="url(#clipPathId)"
        />
      </Svg>
      <Animated.View
        style={[styles.closeButtonContainer, closeButtonContainerStyle]}>
        <Text
          style={styles.closeButton}
          onPress={() => (imagePosition.value = 1)}>
          X
        </Text>
      </Animated.View>
    </Animated.View>
  );
};

export default BackgroundImage;

const styles = StyleSheet.create({
  closeButtonContainer: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 5,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    borderRadius: 20,
    top: -20,
  },
  closeButton: {
    color: Colors.tertiary,
    fontSize: 20,
  },
});

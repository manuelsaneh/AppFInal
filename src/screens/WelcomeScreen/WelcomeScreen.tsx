import React, {useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import Animated, {runOnJS, useSharedValue} from 'react-native-reanimated';
import BackgroundImage from '../../components/organisms/BackgroundImage/BackgroundImage';
import CustomWelcomeButton from '../../components/atoms/buttons/CustomWelcomeButton';
import LoginForm from '../../components/organisms/LoginForm/LoginForm';
import SignupForm from '../../components/organisms/SignupForm/SignupForm';

const WelcomeScreen = () => {
  const imagePosition = useSharedValue(1);
  const [isRegistering, setIsRegistering] = useState(false);

  const loginHandler = () => {
    imagePosition.value = 0;
    if (isRegistering) {
      runOnJS(setIsRegistering)(false);
    }
  };

  const registerHandler = () => {
    imagePosition.value = 0;
    if (!isRegistering) {
      runOnJS(setIsRegistering)(true);
    }
  };

  return (
    <Animated.View style={styles.container}>
      <BackgroundImage imagePosition={imagePosition} />
      <View style={styles.bottomContainer}>
        <CustomWelcomeButton
          text="Login"
          onPress={loginHandler}
          imagePosition={imagePosition}
        />
        <CustomWelcomeButton
          text="Signup"
          onPress={registerHandler}
          imagePosition={imagePosition}
        />
        {!isRegistering ? (
          <LoginForm
            imagePosition={imagePosition}
            isRegistering={isRegistering}
          />
        ) : (
          <SignupForm
            imagePosition={imagePosition}
            isRegistering={isRegistering}
          />
        )}
      </View>
    </Animated.View>
  );
};

export default WelcomeScreen;

const {height} = Dimensions.get('window');

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  bottomContainer: {
    justifyContent: 'center',
    height: height / 4,
  },
});

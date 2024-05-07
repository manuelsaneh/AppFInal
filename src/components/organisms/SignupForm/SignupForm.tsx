import {StyleSheet, TextInput} from 'react-native';
import React from 'react';
import {useFormik} from 'formik';
import {formSchema} from '../../../utils/formSchema';
import Animated, {
  useAnimatedStyle,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import CustomFormButton from '../../atoms/buttons/CustomFormButton';
import {Colors} from '../../../styles/Colors';
import useLoading from '../../../utils/customHooks/useLoading';
import useSignUp from '../../../api/SignupApi';
import {Text} from 'react-native';

interface ISignupFormProps {
  imagePosition: {value: number};
  isRegistering: boolean;
}

const SignupForm = ({imagePosition, isRegistering}: ISignupFormProps) => {
  const {startLoading, stopLoading} = useLoading();
  const onSubmit = useSignUp(startLoading, stopLoading);
  const {values, handleBlur, handleChange, handleSubmit, errors, touched} =
    useFormik({
      initialValues: {
        email: '',
        password: '',
      },
      validationSchema: formSchema,
      onSubmit,
    });

  const formAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity:
        imagePosition.value === 0
          ? withDelay(400, withTiming(1, {duration: 800}))
          : withTiming(0, {duration: 300}),
    };
  });
  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFill,
        styles.formInputContainer,
        formAnimatedStyle,
      ]}>
      <TextInput
        placeholder="Email"
        placeholderTextColor={Colors.tertiary}
        style={styles.textInput}
        onChangeText={handleChange('email')}
        onBlur={handleBlur('email')}
        value={values.email}
        autoCapitalize="none"
      />
      {errors.email && touched.email && (
        <Text style={styles.error}>{errors.email}</Text>
      )}
      <TextInput
        placeholder="Password"
        placeholderTextColor={Colors.tertiary}
        style={styles.textInput}
        onChangeText={handleChange('password')}
        onBlur={handleBlur('password')}
        value={values.password}
        autoCapitalize="none"
        secureTextEntry
      />
      {errors.password && touched.password && (
        <Text style={styles.error}>{errors.password}</Text>
      )}
      <CustomFormButton
        isRegistering={isRegistering}
        handleSubmit={handleSubmit}
      />
    </Animated.View>
  );
};

export default SignupForm;

const styles = StyleSheet.create({
  textInput: {
    height: 50,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 25,
    paddingLeft: 10,
    fontFamily: 'Poppins-Medium',
    color: Colors.tertiary,
  },
  formInputContainer: {
    marginBottom: 70,
    zIndex: -1,
    justifyContent: 'center',
  },
  error: {
    fontFamily: 'Poppins-Light',
    color: 'red',
    fontSize: 12,
    marginHorizontal: 20,
  },
});

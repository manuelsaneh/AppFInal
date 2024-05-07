import {useCallback} from 'react';
import {useAppDispatch} from '../utils/redux/hooks/hooks';
import {auth} from './instance/auth';
import {Alert} from 'react-native';
import {setToken} from '../utils/redux/slices/authSlice';

const useSignUp = (startLoading: () => void, stopLoading: () => void) => {
  const dispatch = useAppDispatch();

  return useCallback(
    async (
      values: {email: string; password: string},
      actions: {resetForm: () => void},
    ) => {
      try {
        startLoading();
        const result = await auth.post('/signup', {
          email: values.email,
          password: values.password,
        });
        if (result.status === 201) {
          const token = result.data.accessToken;
          dispatch(setToken(token));
          Alert.alert('User Created', 'Successfully', [
            {
              text: 'Okay',
              style: 'default',
            },
          ]);
        } else if (result.status === 400) {
          Alert.alert(' User already exists', 'Try again.', [
            {
              text: 'Cancel',
              style: 'cancel',
            },
          ]);
        } else {
          Alert.alert('Server Error', 'Try again.', [
            {
              text: 'Cancel',
              style: 'cancel',
            },
          ]);
        }
      } catch (error) {
        Alert.alert('Error', 'Try again.', [
          {
            text: 'Cancel',
            style: 'cancel',
          },
        ]);
        throw error;
      } finally {
        stopLoading();
      }
      actions.resetForm();
    },
    [dispatch, startLoading, stopLoading],
  );
};

export default useSignUp;

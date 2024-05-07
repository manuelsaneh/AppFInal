import {useCallback} from 'react';
import {useAppDispatch} from '../utils/redux/hooks/hooks';
import {auth} from './instance/auth';
import {Alert} from 'react-native';
import RNSecureStorage, {ACCESSIBLE} from 'rn-secure-storage';
import {setToken} from '../utils/redux/slices/authSlice';

const useLogin = (startLoading: () => void, stopLoading: () => void) => {
  const dispatch = useAppDispatch();

  return useCallback(
    async (
      values: {email: string; password: string},
      actions: {resetForm: () => void},
    ) => {
      try {
        startLoading();
        const result = await auth.post('/login', {
          email: values.email,
          password: values.password,
          token_expires_in: '30m',
        });
        if (result.status === 200) {
          const token = result.data.accessToken;
          RNSecureStorage.setItem('token', token, {
            accessible: ACCESSIBLE.WHEN_UNLOCKED,
          });
          dispatch(setToken(token));
        } else if (result.status === 400) {
          Alert.alert('User Not Found.', 'Try again.', [
            {
              text: 'Cancel',
              style: 'cancel',
            },
          ]);
        } else if (result.status === 401) {
          Alert.alert('Invalid Credentials.', 'Try again.', [
            {
              text: 'Cancel',
              style: 'cancel',
            },
          ]);
        } else {
          Alert.alert('Server Error.', 'Try again.', [
            {
              text: 'Cancel',
              style: 'cancel',
            },
          ]);
        }
      } catch (error) {
        Alert.alert('Error.', 'Try again.', [
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

export default useLogin;

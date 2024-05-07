import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import RNSecureStorage from 'rn-secure-storage';

export interface LoginState {
  token: string | null;
}

const initialState: LoginState = {
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
    },
    logout(state) {
      state.token = null;
      RNSecureStorage.removeItem('token');
    },
  },
});

export const {setToken, logout} = authSlice.actions;

export default authSlice.reducer;

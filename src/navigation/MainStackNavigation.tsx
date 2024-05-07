import React from 'react';
import {MainNavigatorStackParamList} from './MainNavigator.types';
import WelcomeScreen from '../screens/WelcomeScreen/WelcomeScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<MainNavigatorStackParamList>();

const MainStackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
    </Stack.Navigator>
  );
};

export default MainStackNavigation;

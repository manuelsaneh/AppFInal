import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthenticatedNavigation from './AuthenticatedNavigation';
import MainStackNavigation from './MainStackNavigation';
import {useAppSelector} from '../utils/redux/hooks/hooks';

const Navigation = () => {
  const isAuthenticated = useAppSelector(state => state.auth.token);

  return (
    <NavigationContainer>
      {isAuthenticated === null ? (
        <MainStackNavigation />
      ) : (
        <AuthenticatedNavigation />
      )}
    </NavigationContainer>
  );
};

export default Navigation;

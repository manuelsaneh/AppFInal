import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {MainNavigatorStackParamList} from './MainNavigator.types';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import SearchScreen from '../screens/SearchScreen/SearchScreen';
import NewsScreen from '../screens/NewsScreen/NewsScreen';
import RecipeScreen from '../screens/RecipeScreen/RecipeScreen';
import {Colors} from '../styles/Colors';
import {
  BackIcon,
  homeIcon,
  newsIcon,
  searchIcon,
} from '../components/atoms/TabIcons/TabIcons';

const Tab = createBottomTabNavigator<MainNavigatorStackParamList>();

const backIcon = () => {
  return <BackIcon color={Colors.primary} size={30} />;
};

const AuthenticatedNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: Colors.primary,
        tabBarActiveBackgroundColor: Colors.secondary,
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTintColor: Colors.primary,
          headerStyle: {
            height: 70,
            backgroundColor: Colors.secondary,
          },
          tabBarIcon: homeIcon,
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerShown: false,
          tabBarIcon: searchIcon,
        }}
      />
      <Tab.Screen
        name="Recipe"
        component={RecipeScreen}
        options={{
          headerLeft: backIcon,
          headerTintColor: Colors.primary,
          headerStyle: {
            height: 70,
            backgroundColor: Colors.secondary,
          },
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        name="News"
        component={NewsScreen}
        options={{
          headerTintColor: Colors.primary,
          headerStyle: {
            height: 70,
            backgroundColor: Colors.secondary,
          },
          tabBarIcon: newsIcon,
        }}
      />
    </Tab.Navigator>
  );
};

export default AuthenticatedNavigation;

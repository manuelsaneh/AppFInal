import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from 'react-native-screens/lib/typescript/native-stack/types';

export type MainNavigatorStackParamList = {
  Welcome: undefined;
  Home: undefined;
  Recipe: {name: string | undefined};
  Search: undefined;
  News: undefined;
};

export type MainNavigatorNavigationProp =
  NativeStackNavigationProp<MainNavigatorStackParamList>;

export type MainNavigatorRouteProp = RouteProp<MainNavigatorStackParamList>;

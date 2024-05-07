import {useNavigation} from '@react-navigation/native';
import React from 'react';

import Icon from 'react-native-vector-icons/Ionicons';
import {MainNavigatorNavigationProp} from '../../../navigation/MainNavigator.types';
import {StyleSheet} from 'react-native';

interface IIconProps {
  color: string;
  size: number;
}

export const homeIcon = ({color, size}: IIconProps) => (
  <Icon name="home-outline" color={color} size={size} />
);

export const searchIcon = ({color, size}: IIconProps) => (
  <Icon name="search-outline" color={color} size={size} />
);

export const newsIcon = ({color, size}: IIconProps) => (
  <Icon name="newspaper-outline" color={color} size={size} />
);

export const BackIcon = ({color, size}: IIconProps) => {
  const navigation = useNavigation<MainNavigatorNavigationProp>();
  const handleGoBack = () => {
    navigation.goBack();
  };
  return (
    <Icon
      name="arrow-back-outline"
      color={color}
      size={size}
      onPress={handleGoBack}
      style={styles.backIcon}
    />
  );
};

const styles = StyleSheet.create({
  backIcon: {
    marginHorizontal: 20,
  },
});

import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../../../styles/Colors';
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';
import {MainNavigatorNavigationProp} from '../../../navigation/MainNavigator.types';
import {Recipe} from '../../../utils/types/types';

interface IItemProps {
  item: Recipe;
  index: number;
  width: number;
  height: number;
  marginHorizontal: number;
  x: SharedValue<number>;
  fullWidth: number;
}

const Item = ({
  item,
  index,
  width,
  height,
  marginHorizontal,
  x,
  fullWidth,
}: IItemProps) => {
  const navigation = useNavigation<MainNavigatorNavigationProp>();

  const goToRecipe = () => {
    navigation.navigate('Recipe', {name: item.id});
  };

  const animatedStyle = useAnimatedStyle(() => {
    const rotateZ = interpolate(
      x.value,
      [(index - 1) * fullWidth, index * fullWidth, (index + 1) * fullWidth],
      [20, 0, -20],
      Extrapolation.CLAMP,
    );

    const translateY = interpolate(
      x.value,
      [(index - 1) * fullWidth, index * fullWidth, (index + 1) * fullWidth],
      [60, 0, 60],
      Extrapolation.CLAMP,
    );

    return {
      transform: [{rotateZ: `${rotateZ}deg`}, {translateY: translateY}],
    };
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {width: width, height: height, marginHorizontal: marginHorizontal},
        animatedStyle,
      ]}>
      <Pressable onPress={goToRecipe}>
        <View style={styles.imageContainer}>
          <Image
            source={{uri: item.image}}
            style={[styles.image, {width: width}]}
            resizeMode="cover"
          />
          <View style={styles.recipeTitleContainer}>
            <Text style={styles.recipeTitle}>{item.title}</Text>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
};

export default Item;

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    overflow: 'hidden',
    transformOrigin: 'bottom',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.5,
    shadowRadius: -10,
    elevation: 20,
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    backgroundColor: Colors.primary,
    marginVertical: 10,
  },
  image: {
    width: '100%',
    height: '65%',
    objectFit: 'cover',
    resizeMode: 'cover',
  },
  recipeTitleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  recipeTitle: {
    color: Colors.tertiary,
    fontFamily: 'Poppins-Bold',
    fontSize: 15,
  },
});

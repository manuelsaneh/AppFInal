import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Info} from '../../../utils/types/types';

interface IIngredientsProp {
  data: Info;
}

const Ingredients = ({data}: IIngredientsProp) => {
  return (
    <View style={styles.ingredientsContainer}>
      <Text style={styles.title}>Ingredients</Text>
      {data &&
        data.extendedIngredients &&
        data.extendedIngredients.length > 0 &&
        data.extendedIngredients.map(ingredient => (
          <Text style={styles.text}> {ingredient.original}</Text>
        ))}
    </View>
  );
};

export default Ingredients;

const styles = StyleSheet.create({
  ingredientsContainer: {
    marginVertical: 20,
    marginHorizontal: 20,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: Colors.tertiary,
  },
  text: {
    marginTop: 20,
    fontFamily: 'Poppins-Bold',
    fontSize: 12,
    color: Colors.tertiary,
  },
});

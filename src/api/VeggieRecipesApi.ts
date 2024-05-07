import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {Alert} from 'react-native';

export const getVegetarianRecipes = async () => {
  try {
    const storedRecipes = await AsyncStorage.getItem('vegetarianRecipes');
    if (storedRecipes) {
      return JSON.parse(storedRecipes);
    } else {
      const result = await axios.get(
        `https://api.spoonacular.com/recipes/random?apiKey=6c7baf6413794041a5a75b50b7033191&number=9&tags=vegetarian`,
      );
      const recipes = result.data.recipes;
      await AsyncStorage.setItem('vegetarianRecipes', JSON.stringify(recipes));
      return recipes;
    }
  } catch (error) {
    Alert.alert('Something went wrong.', 'Try again.', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ]);
  }
};

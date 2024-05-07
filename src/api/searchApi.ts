import axios from 'axios';
import {Alert} from 'react-native';

export const getSearched = async (
  name: string | undefined,
  startLoading: () => void,
  stopLoading: () => void,
) => {
  try {
    startLoading();
    const result = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=6c7baf6413794041a5a75b50b7033191&query=${name}&number=9`,
    );
    const recipes = result.data.results;
    return recipes;
  } catch (error) {
    Alert.alert('Something went wrong.', 'Try again.', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ]);
  } finally {
    stopLoading();
  }
};

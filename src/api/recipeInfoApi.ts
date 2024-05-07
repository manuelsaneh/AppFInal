import axios from 'axios';
import {Alert} from 'react-native';

export const getRecipeDetails = async (
  name: string | undefined,
  startLoading: () => void,
  stopLoading: () => void,
) => {
  try {
    startLoading();
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/${name}/information?apiKey=6c7baf6413794041a5a75b50b7033191`,
    );
    const results = response.data;
    return results;
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

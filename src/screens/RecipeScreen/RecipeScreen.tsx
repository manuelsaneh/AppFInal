import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getRecipeDetails} from '../../api/recipeInfoApi';
import useLoading from '../../utils/customHooks/useLoading';
import {MainNavigatorStackParamList} from '../../navigation/MainNavigator.types';
import {RouteProp} from '@react-navigation/native';
import {Colors} from '../../styles/Colors';
import Ingredients from '../../components/molecules/Ingredients/Ingredients';
import Instructions from '../../components/molecules/Instructions/Instructions';
import InfoTop from '../../components/molecules/InfoTop/InfoTop';

type RecipeDetailsScreenRouteProp = RouteProp<
  MainNavigatorStackParamList,
  'Recipe'
>;

interface Props {
  route: RecipeDetailsScreenRouteProp;
}

const RecipeScreen = ({route}: Props) => {
  const [details, setDetails] = useState(null);
  const {loading, startLoading, stopLoading} = useLoading();
  const {name} = route.params;

  const getDetails = async () => {
    try {
      const results = await getRecipeDetails(name, startLoading, stopLoading);
      setDetails(results);
    } catch (error) {
      Alert.alert('Something went wrong.', 'Try again.', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ]);
    }
  };
  console.log(details);

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <ScrollView style={styles.rootDetails}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.detailsContainer}>
          {details && <InfoTop data={details} />}
          {details && <Ingredients data={details} />}
          {details && <Instructions data={details} />}
        </View>
      )}
    </ScrollView>
  );
};

export default RecipeScreen;

const styles = StyleSheet.create({
  rootDetails: {
    flex: 1,
  },
  detailsContainer: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
});

import {
  Alert,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {Colors} from '../../styles/Colors';
import Slider from '../../components/organisms/Slider/Slider';
import {getPopularRecipes} from '../../api/popularRecipesApi';
import {getVegetarianRecipes} from '../../api/VeggieRecipesApi';
import HomeTopContent from '../../components/organisms/HomeTopContent/HomeTopContent';

const HomeScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [popular, setPopular] = useState([]);
  const [vegetarian, setVegetarian] = useState([]);

  const getPopular = async () => {
    try {
      const recipes = await getPopularRecipes();
      setPopular(recipes);
    } catch (error) {
      Alert.alert('Something went wrong.', 'Try again.', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ]);
    }
  };

  const getVegetarian = async () => {
    try {
      const recipes = await getVegetarianRecipes();
      setVegetarian(recipes);
    } catch (error) {
      Alert.alert('Something went wrong.', 'Try again.', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ]);
    }
  };

  useEffect(() => {
    getPopular();
    getVegetarian();
  }, []);

  const onRefresh = useCallback(async () => {
    try {
      setRefreshing(true);
      const recipes = await getPopularRecipes();
      setPopular(recipes);
    } catch (error) {
      Alert.alert('Something went wrong.', 'Try again.', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ]);
    } finally {
      setRefreshing(false);
    }
  }, []);

  return (
    <ScrollView
      style={styles.root}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={styles.homeContainer}>
        <HomeTopContent />
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('../../assets/images/HomePhoto.jpg')}
          />
        </View>
        <View style={styles.recipesContainer}>
          <Text style={styles.largeTitle}>Popular</Text>
          <Slider data={popular} />
        </View>
        <View style={styles.recipesContainer}>
          <Text style={styles.largeTitle}>Vegetarian</Text>
          <Slider data={vegetarian} />
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  homeContainer: {
    flex: 1,
  },
  titleContainer: {
    marginTop: 30,
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  smallText: {
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
    color: Colors.tertiary,
  },
  largeText: {
    fontSize: 30,
    fontFamily: 'Poppins-Medium',
    color: Colors.secondary,
  },
  imageContainer: {
    marginTop: 10,
    paddingHorizontal: 20,
    width: '100%',
    height: 150,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: 20,
  },
  recipesContainer: {
    height: 300,
    marginVertical: 10,
  },
  largeTitle: {
    fontSize: 30,
    fontFamily: 'Poppins-Medium',
    color: Colors.secondary,
    marginTop: 20,
    marginBottom: 10,
    marginHorizontal: 20,
  },
});

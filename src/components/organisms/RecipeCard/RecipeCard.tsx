import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../../../styles/Colors';
import {Recipe} from '../../../utils/types/types';

interface IRecipecardProps {
  item: Recipe;
}

const RecipeCard = ({item}: IRecipecardProps) => {
  return (
    <View style={styles.recipeContainer}>
      <View style={styles.recipeCard}>
        <Pressable>
          <Image style={styles.recipeImage} source={{uri: item.image}} />
          <View style={styles.recipeTextContainer}>
            <Text style={styles.recipeText}>{item.title}</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default RecipeCard;

const styles = StyleSheet.create({
  recipeContainer: {
    alignItems: 'center',
    flexDirection: 'column',
  },
  recipeCard: {
    justifyContent: 'space-between',
    borderRadius: 24,
    width: 240,
    height: 240,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.5,
    shadowRadius: -10,
    elevation: 20,
    backgroundColor: Colors.primary,
    marginVertical: 10,
  },
  recipeImage: {
    width: '100%',
    height: '70%',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    objectFit: 'cover',
    resizeMode: 'cover',
  },
  recipeTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  recipeText: {
    marginTop: 16,
    marginBottom: 40,
    color: Colors.tertiary,
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
});

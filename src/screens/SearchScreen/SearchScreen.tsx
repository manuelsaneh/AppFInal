import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../styles/Colors';

import {getSearched} from '../../api/searchApi';
import useLoading from '../../utils/customHooks/useLoading';
import RecipeCard from '../../components/organisms/RecipeCard/RecipeCard';
import SearchButton from '../../components/atoms/buttons/SearchButton';

const SearchScreen = () => {
  const [searched, setSearched] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const {loading, startLoading, stopLoading} = useLoading();

  const handleSearch = async () => {
    try {
      if (searchQuery.trim() !== '') {
        const results = await getSearched(
          searchQuery,
          startLoading,
          stopLoading,
        );
        setSearched(results);
        setSearchQuery('');
      } else {
        setSearched([]);
      }
    } catch (error) {
      console.error('Error searching:', error);
    } finally {
      stopLoading();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search recipe or cuisine"
          placeholderTextColor={Colors.tertiary}
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
        <SearchButton onPress={handleSearch} />
      </View>
      <View style={styles.separator} />
      {searched &&
        (loading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={searched}
            renderItem={({item}) => <RecipeCard item={item} />}
          />
        ))}
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  inputContainer: {
    width: '100%',
    marginVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    height: 50,
    width: '80%',
    borderWidth: 1,
    borderColor: Colors.secondary,
    borderRadius: 8,
    paddingHorizontal: 10,
    color: Colors.tertiary,
    fontFamily: 'Poppins-Light',
  },

  separator: {
    width: '100%',
    borderBottomWidth: 0.5,
    borderColor: Colors.primary,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 10,
  },
});

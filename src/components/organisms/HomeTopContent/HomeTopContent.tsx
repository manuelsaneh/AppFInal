import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LogoutButton from '../../atoms/buttons/LogoutButton';
import {useAppDispatch} from '../../../utils/redux/hooks/hooks';
import {Colors} from '../../../styles/Colors';
import {logout} from '../../../utils/redux/slices/authSlice';

const HomeTopContent = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <View style={styles.titleContainer}>
      <View>
        <Text style={styles.smallText}>Discover our</Text>
        <Text style={styles.largeText}>Best Recipes!</Text>
      </View>
      <View>
        <LogoutButton onPress={handleLogout} />
      </View>
    </View>
  );
};

export default HomeTopContent;

const styles = StyleSheet.create({
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
});

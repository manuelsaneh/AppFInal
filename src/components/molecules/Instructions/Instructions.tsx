import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Info} from '../../../utils/types/types';

interface IInstructionsProp {
  data: Info;
}

const Instructions = ({data}: IInstructionsProp) => {
  return (
    <View style={styles.instructionsContainer}>
      <Text style={styles.title}>Instructions</Text>
      {data &&
        data.analyzedInstructions &&
        data.analyzedInstructions.length > 0 &&
        data.analyzedInstructions[0].steps.map((instruction, index) => (
          <Text style={styles.text} key={index}>
            {instruction.number}. {instruction.step}
          </Text>
        ))}
    </View>
  );
};

export default Instructions;

const styles = StyleSheet.create({
  instructionsContainer: {
    marginVertical: 20,
    marginHorizontal: 20,
  },
  text: {
    marginTop: 20,
    fontFamily: 'Poppins-Bold',
    fontSize: 12,
    color: Colors.tertiary,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: Colors.tertiary,
  },
});

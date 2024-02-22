import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {COLORS, TEXT_STYLE} from '../../utils/GlobalStyles';

interface ErrorProps {}

const Error: React.FC<ErrorProps> = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleStyle}>Error fetching movies</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  titleStyle: {
    color: COLORS.main_text,
    marginBottom: 20,
    ...TEXT_STYLE.boldSmallText,
  },

});

export default Error;

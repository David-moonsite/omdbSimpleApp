import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

import {COLORS} from '../../utils/GlobalStyles';

interface LoaderProps {}

const Loader: React.FC<LoaderProps> = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={COLORS.white} />
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
});

export default Loader;

import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {COLORS, TEXT_STYLE} from '../../utils/GlobalStyles';
import * as Animatable from 'react-native-animatable';
import {useNavigation} from '@react-navigation/native';

import { SCREEN } from '../../utils/Constants';
import { Movie } from '../../models/MovieModel';


interface MovieItemListProps {
  movie: Movie;
  index: 0;
}
const DURATION = 400;

const MovieItemList: React.FC<MovieItemListProps> = ({movie, index}) => {
    const navigation = useNavigation();

  return (
    <Animatable.View
      animation={'fadeInUp'}
      useNativeDriver={true}
      duration={DURATION}
      delay={index * 150}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(SCREEN.MOVIEINFO, {movie})
        }>
        <View style={styles.item}>
          <View style={styles.posterWrapper}>
            <Image
              source={{uri: movie.Poster}}
              resizeMode="stretch"
              style={styles.posterStyle}
            />
          </View>
          <View style={styles.infoWrapper}>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
              {movie.Title.split(':')[0]}
            </Text>
            <Text numberOfLines={2} style={styles.subTitle}>
              {movie.Title.split(':')[1]?.trim()}
            </Text>
            <Text style={styles.year}>{movie.Year}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  item: {
    marginVertical: 8,
    flexDirection: 'row',
    marginBottom: 20,
  },
  infoWrapper: {
    padding: 10,
    flex: 1,
  },
  posterWrapper: {
    width: 100,
    backgroundColor: COLORS.white,
  },
  posterStyle: {
    width: 100,
    height: 150,
  },
  title: {
    ...TEXT_STYLE.regularMediumText,
    color: COLORS.white,
    marginBottom: 4,
  },
  subTitle: {
    ...TEXT_STYLE.regularMediumText,
    color: COLORS.white,
  },
  year: {
    fontSize: 14,
    color: COLORS.white,
  },
});

export default MovieItemList;

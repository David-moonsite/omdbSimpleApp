import React, {useEffect, useCallback} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import {COLORS, TEXT_STYLE} from '../../utils/GlobalStyles';
import {Error, Header, Loader} from '../../components';
import {MainStackParamList} from '../../navigation/MainStackNavigator';
import {SCREEN} from '../../utils/Constants';
import {fetchMovieInfo} from '../../slices/MoviesStore/MoviesSlice';
import Icon from 'react-native-vector-icons/AntDesign';

type MovieInfoRouteProp = RouteProp<MainStackParamList, SCREEN.MOVIEINFO>;

type MovieInfoProp = {
  route: MovieInfoRouteProp;
};

const MovieInfo: React.FC<MovieInfoProp> = ({route}) => {
  const dispatch = useDispatch();
  const {movie} = route.params;
  const {status, movieInfo} = useSelector(state => state.moviesStore);

  useEffect(() => {
    dispatch(fetchMovieInfo(movie.imdbID));
  }, []);

  const renderLoading = useCallback(() => <Loader />, []);

  const renderError = useCallback(() => <Error />, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header title={''} />
      </View>
      {status === 'loading' && renderLoading()}
      {status === 'failed' && renderError()}
      {status === 'succeeded' && (
        <>
          <View>
            <Image
              source={{uri: movieInfo.Poster}}
              resizeMode="contain"
              style={styles.posterStyle}
            />
          </View>
          <View style={styles.movieInfoStyle}>
            <Text style={styles.title}>{movieInfo?.Title}</Text>
            <View></View>
            <View style={styles.yearWrapper}>
              <View style={styles.yearContainer}>
                <Text style={styles.subTitle}>{movieInfo?.Year}</Text>
                <Text style={styles.subTitle}>{' | '}</Text>
                <Text style={styles.subTitle}>{movieInfo?.Runtime}</Text>
              </View>
              <View style={styles.ratingWrapper}>
                <Icon name="star" size={20} color={COLORS.yellow} />
                <Text style={styles.rating}>{movieInfo?.imdbRating}</Text>
                <Text style={styles.ratingFrom}>{'/10'}</Text>
              </View>
            </View>
            <Text style={styles.subTitleSmall}>{movieInfo?.Genre}</Text>

            <Text style={styles.plot}>{movieInfo?.Plot}</Text>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background_screen,
    flex: 1,
  },
  movieInfoStyle: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    marginBottom: 20,
    paddingHorizontal: 14,
  },

  posterStyle: {
    height: 350,
    width: '100%',
  },
  title: {
    ...TEXT_STYLE.regularMediumText,
    color: COLORS.white,
    marginBottom: 10,
  },
  yearWrapper: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  yearContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subTitle: {
    ...TEXT_STYLE.regularSmallText,
    color: COLORS.white,
  },
  ratingFrom: {
    color: COLORS.input_text_placeholder_form,
  },
  subTitleSmall: {
    ...TEXT_STYLE.regularVerySmallText,
    color: COLORS.white,
    marginBottom: 50,
  },
  plot: {
    ...TEXT_STYLE.regularSmallerText,
    color: COLORS.white,
    marginBottom: 10,
  },
  rating: {
    ...TEXT_STYLE.boldVerySmallText,
    color: COLORS.white,
    paddingLeft: 5,
  },
  ratingWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
});

export default MovieInfo;

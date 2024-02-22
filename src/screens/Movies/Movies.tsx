import React, {useState, useEffect, useMemo, useCallback} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MainStackParamList} from '../../navigation/MainStackNavigator';
import {SCREEN} from '../../utils/Constants';
import {COLORS, TEXT_STYLE} from '../../utils/GlobalStyles';
import {useDispatch, useSelector} from 'react-redux';
import {fetchMovies} from '../../slices/MoviesStore/MoviesSlice';
import {Error, Loader, MovieItemList} from '../../components';
import {useDebounce} from '../../utils/hooks';
import Icon from 'react-native-vector-icons/Feather';

type MoviesProp = {
  navigation: NativeStackNavigationProp<MainStackParamList, SCREEN.MOVIES>;
};
const Movies: React.FC<MoviesProp> = ({navigation}) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const {movies, status} = useSelector(state => state.moviesStore);
  const debouncedSearchTerm = useDebounce(name, 500);
  useEffect(() => {
    dispatch(fetchMovies(debouncedSearchTerm));
  }, [debouncedSearchTerm]);

  const renderMovieItem = useMemo(
    () =>
      ({item, index}) => {
        return (
          <MovieItemList
            movie={{
              imdbID: item.imdbID,
              Title: item.Title,
              Year: item.Year,
              Poster: item.Poster,
            }}
            index={index}
          />
        );
      },
    [],
  );

  const renderLoading = useCallback(() => <Loader />, []);

  const renderError = useCallback(() => <Error />, []);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.titleStyle}>Hey</Text>
        <View style={styles.subTitleWrapper}>
          <Text style={styles.subTitleStyle}>Let's Find Your </Text>
          <Text style={styles.movieTextStyle}>Movie</Text>
        </View>
        <View>
          <TextInput
            style={styles.inputText}
            placeholder="Search Movies"
            placeholderTextColor={COLORS.input_text_placeholder}
            value={name}
            onChangeText={setName}
          />
          <View style={styles.iconWrapper}>
            {name.length == 0 ? (
              <Icon
                name="search"
                size={30}
                color={COLORS.input_text_placeholder}
              />
            ) : (
              <TouchableOpacity onPress={() => setName('')}>
                <Icon
                  name="x-circle"
                  size={30}
                  color={COLORS.input_text_placeholder}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {status === 'succeeded' && (
          <View style={styles.resultsWrapper}>
            <Text style={styles.subTitleStyle}>
              Results ({movies.Search?.length ? movies.Search.length : 0})
            </Text>
            <FlatList
              data={movies.Search}
              keyExtractor={item => item.imdbID}
              showsVerticalScrollIndicator={false}
              renderItem={renderMovieItem}
            />
          </View>
        )}
        {status === 'loading' && renderLoading()}
        {status === 'failed' && renderError()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background_screen,
    paddingHorizontal: 20,
  },

  iconWrapper: {
    width: 50,
    height: 55,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    right: 7,
  },
  inputContainer: {
    flex: 1,
    paddingTop: 50,
  },
  inputText: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.button_long_background,
    padding: 10,
    height: 55,
    ...TEXT_STYLE.regularSmallText,
  },
  titleStyle: {
    color: COLORS.main_text,
    marginBottom: 20,
    ...TEXT_STYLE.boldSmallText,
  },
  subTitleStyle: {
    color: COLORS.main_text,
    ...TEXT_STYLE.regularMediumText,
    marginBottom: 10,
  },
  subTitleWrapper: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  movieTextStyle: {
    color: COLORS.red,
    ...TEXT_STYLE.regularMediumText,
  },
  resultsWrapper: {
    marginTop: 40,
    flex: 1,
  },
});

export default Movies;

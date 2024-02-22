import React from 'react';
import {MovieInfo, Movies} from '../screens';
import {SCREEN} from '../utils/Constants';
import {createStackNavigator} from '@react-navigation/stack';
import { Movie } from '../models/MovieModel';

export type MainStackParamList = {
  [SCREEN.MOVIES]: undefined;
  [SCREEN.MOVIEINFO]: { movie: Movie }; 
};

const Stack = createStackNavigator<MainStackParamList>();

const MainStackNavigator = () => {

  return (
    <Stack.Navigator
      initialRouteName={ SCREEN.MOVIES}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={SCREEN.MOVIES} component={Movies} />
      <Stack.Screen name={SCREEN.MOVIEINFO} component={MovieInfo} />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;

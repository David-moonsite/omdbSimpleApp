import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import {COLORS, TEXT_STYLE} from '../../utils/GlobalStyles';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({title}) => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleBackPress}>
        <Icon name="arrow-left" size={30} color={COLORS.white} />
      </TouchableOpacity>
      <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingRight:40
  },
  backButton: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 12,
  },
  title: {
    color: COLORS.white,
    paddingLeft:10,
    ...TEXT_STYLE.regularMediumText,

  },
});

export default Header;

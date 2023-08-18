import React from 'react';
import { Image, View } from 'react-native';
import styles from './header.style';
import { Text } from 'react-native-paper';

const Header = () => {
  return(
    <View style={styles.headerContainer}>
      <Image style={styles.logo} source={require('../../assets/logo.png')}/>
      <Text style={styles.slogan}>TBT</Text>
    </View>
  )
}

export default Header;
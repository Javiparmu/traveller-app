import React from 'react'
import { StyleSheet, View } from 'react-native';
import { RootStackParams } from '../navigator/Navigation';
import { StackScreenProps } from '@react-navigation/stack';
import { TopBar, TravelCard, FriendTravelCard } from '../components';

interface Props extends StackScreenProps<RootStackParams, 'HomeScreen'> { }

export const HomeScreen = () => {

  return (
    <View style={styles.container}>
      <TopBar />
      <TravelCard />
      <FriendTravelCard />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontFamily: 'Roboto-Black',
    marginTop: 25,
    letterSpacing: 5
  },

});

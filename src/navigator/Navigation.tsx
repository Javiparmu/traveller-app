import 'react-native-gesture-handler';
import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { HomeScreen } from '../screens/HomeScreen';
import { CreateTravel } from '../screens/CreateTravel';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { ThemeContext } from '../context/themeContext/ThemeContext';
import { EditTravel } from '../screens/EditTravel';
import { User } from '../interfaces/userInterface';
import { Travel } from '../interfaces/travelInterface';

export type RootStackParams = {
  HomeScreen: undefined;
  CreateTravel: undefined;
  EditTravel: {
    travel: Travel,
  };
}

const Stack = createStackNavigator<RootStackParams>()

export const Navigation = () => {

  const { theme } = useContext( ThemeContext );

  return (
    <NavigationContainer
      theme={ theme }
    >
      <StatusBar animated backgroundColor="transparent" translucent showHideTransition={'fade'} networkActivityIndicatorVisible={false} />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="CreateTravel" component={CreateTravel} />
        <Stack.Screen name="EditTravel" component={EditTravel} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

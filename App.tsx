import { DefaultTheme, NavigationContainer, Theme } from '@react-navigation/native'
import React from 'react'
import { StatusBar } from 'react-native'
import { ThemeProvider } from './src/context/themeContext/ThemeContext'
import { Navigation } from './src/navigator/Navigation'

const App = () => {
  return (
    <AppState>
        <Navigation />
    </AppState>

  )
}

const AppState = ({ children }: any) => {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  )
}

export default App

import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useContext } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ThemeContext } from '../context/themeContext/ThemeContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams, Navigation } from '../navigator/Navigation';
import { useNavigation } from '@react-navigation/native';

export const TopBar = () => {

    const { theme: { colors } } = useContext(ThemeContext);

    const navigation = useNavigation()

    return (
        <LinearGradient
            colors={[colors.primary, colors.secondary]}
            style={styles.header}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
        >
            <Image
                source={require('../data/images/traveller_logo_2_white.png')}
                style={styles.logo}
            />
            <TouchableOpacity
                style={styles.calendarIcon}
                activeOpacity={0.8}
                onPress={() => navigation.navigate('CreateTravel')}
            >
                <Icon name='calendar-edit' color={colors.card} size={30} />
            </TouchableOpacity>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 130,
        height: 70,
        marginTop: 0,
    },
    calendarIcon: {
        position: 'absolute',
        right: 25,
        bottom: 21
    },
})
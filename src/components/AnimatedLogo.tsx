import React, { useEffect } from 'react'
import { Image, Animated, StyleSheet } from 'react-native';
import { useAnimation } from '../hooks/useAnimation';

export const AnimatedLogo = () => {

    const { opacity, position, startMovingPosition } = useAnimation();

    useEffect(() => {
        startMovingPosition(-10, 180, -0.8, 700, 600);
    }, [])

    return (
        <>
            <Image
                source={require('../data/images/traveller_logo_no_text.png')}
                style={styles.logoNoText}
            />
            <Animated.Image
                source={require('../data/images/traveller_text_logo_black.png')}
                style={{ ...styles.logoText, opacity: opacity, transform: [{ translateX: position }] }}
            />
        </>
    )
}

const styles = StyleSheet.create({
    logoNoText: {
        width: 110,
        height: 55,
        marginTop: 55,
        marginLeft: 55,
        backgroundColor: 'white',
    },
    logoText: {
        width: 176,
        height: 25,
        position: 'absolute',
        top: 70,
        zIndex: -2
    },
})


import { useRef } from 'react';
import { Animated, Easing, LayoutAnimation, Platform, UIManager } from 'react-native';

if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true);
}

export const useAnimation = () => {

    const opacity = useRef(new Animated.Value(0)).current;
    const position = useRef(new Animated.Value(0)).current;

    const fadeIn = (duration: number = 300) => {
        Animated.timing(
            opacity,
            {
                toValue: 1,
                duration,
                useNativeDriver: true
            }
        ).start();
    }

    const fadeOut = () => {
        Animated.timing(
            opacity,
            {
                toValue: 0,
                duration: 300,
                useNativeDriver: true
            }
        ).start();
    }

    const startReducingSize = () => {
        LayoutAnimation.configureNext({
            duration: 250,
            update: {
                type: LayoutAnimation.Types.easeInEaseOut,
                springDamping: 0.7,
            },
        });
        LayoutAnimation.configureNext({
            duration: 200,
            delete: {
                type: LayoutAnimation.Types.easeOut,
                property: LayoutAnimation.Properties.scaleXY,
                springDamping: 0.7,
            },
        });
        LayoutAnimation.configureNext({
            duration: 150,
            create: {
                type: LayoutAnimation.Types.easeInEaseOut,
                property: LayoutAnimation.Properties.scaleXY,
                springDamping: 0.7,
            },
        });
    };

    const startMovingPosition = (initPosition: number, endPosition: number, initOpacity: number = 0, posDuration: number = 300, opDuration: number = 300) => {

        position.setValue(initPosition);

        Animated.timing(
            position,
            {
                toValue: endPosition,
                duration: posDuration,
                useNativeDriver: true,
            }
        ).start();

        opacity.setValue(initOpacity);

        Animated.timing(
            opacity,
            {
                toValue: 1,
                duration: opDuration,
                useNativeDriver: true
            }
        ).start();
    }


    return {
        opacity,
        position,
        fadeIn,
        fadeOut,
        startMovingPosition,
        startReducingSize
    }
}

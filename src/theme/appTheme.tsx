import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
    title: {
        fontSize: 30,
        fontFamily: 'Roboto-Bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 20,
        fontFamily: 'Roboto-Regular',
        marginLeft: 20,
        marginTop: 25,
    },
    closeIcon: {
        position: 'absolute',
        right: 4,
        top: 0,
        backgroundColor: 'rgba(235, 232, 232, 1)',
        borderRadius: 50,
        zIndex: 1
    },
    travelsText: {
        fontSize: 24,
        fontFamily: 'Roboto-Bold',
        marginTop: 20,
        marginBottom: 5,
        marginLeft: 25,
    },
})

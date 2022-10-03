import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useContext } from 'react'
import { myTravels } from '../data/travelsData';
import { TravelItem } from './TravelItem';
import { ItemSeparator } from './ItemSeparator';
import { ThemeContext } from '../context/themeContext/ThemeContext';

export const TravelCard = () => {

    const { theme: { colors } } = useContext(ThemeContext);

    return (
        <View style={{ ...styles.travelsContainer, backgroundColor: colors.card }}>
            <View style={{ ...styles.circleLeft, backgroundColor: colors.background }} />
            <View style={{ ...styles.circleRight, backgroundColor: colors.background }} />
            <Text style={{ ...styles.travelsText, color: colors.text }}>Mis viajes</Text>
            <FlatList
                data={myTravels}
                renderItem={({ item }) => (
                    <TravelItem {...item} />
                )}
                keyExtractor={item => item.title + item.id}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <ItemSeparator />}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    travelsContainer: {
        height: 340,
        width: 380,
        marginTop: 15,
        borderRadius: 15,
        paddingBottom: 20,
        elevation: 8,
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowOffset: {
            height: 4,
            width: 0
        }
    },
    circleLeft: {
        width: 12,
        height: 12,
        borderRadius: 300,
        position: 'absolute',
        top: 8,
        left: 8,
        zIndex: 1,
    },
    circleRight: {
        width: 12,
        height: 12,
        borderRadius: 300,
        position: 'absolute',
        top: 8,
        right: 8,
        zIndex: 1,
    },
    travelsText: {
        fontSize: 24,
        fontFamily: 'Roboto-Bold',
        marginTop: 20,
        marginBottom: 5,
        marginLeft: 25,
    },
})
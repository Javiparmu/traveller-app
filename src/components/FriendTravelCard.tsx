import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useContext, useState } from 'react'
import { FriendTravelItem } from './FriendTravelItem';
import { ThemeContext } from '../context/themeContext/ThemeContext';
import { globalStyles } from '../theme/appTheme';
import { friendTravels } from '../data/travelsData';

export const FriendTravelCard = () => {

    const { theme: { colors } } = useContext(ThemeContext);

    const [page, setPage] = useState<number>(1);

    const onNextPage = () => {
        setPage((prev) => prev + 1);
    }

    const onPrevPage = () => {
        setPage((prev) => prev - 1);
    }

    return (
        <View style={{ ...styles.otherTravelsContainer, backgroundColor: colors.card }}>
            <Image
                source={require('../data/images/rings.png')}
                style={styles.ringsImage}
            />
            <Text style={{ ...globalStyles.travelsText, color: colors.text }}>Viajes de amigos</Text>
            <FriendTravelItem item={friendTravels[page - 1]} />
            <View style={styles.pagesContainer}>
                <TouchableOpacity
                    onPress={onPrevPage}
                    disabled={page > 1 ? false : true}
                    style={{ ...styles.last, opacity: page > 1 ? 1 : 0 }}
                >
                    <Text style={{ ...styles.nextText, color: colors.primary }}>Anterior</Text>
                </TouchableOpacity>
                <Text style={{ ...styles.page, color: colors.text }}>{page} de {friendTravels.length}</Text>
                <TouchableOpacity
                    onPress={onNextPage}
                    disabled={page < friendTravels.length ? false : true}
                    style={{ ...styles.next, opacity: page < friendTravels.length ? 1 : 0 }}
                >
                    <Text style={{ ...styles.nextText, color: colors.primary }}>Siguiente</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    otherTravelsContainer: {
        height: 320,
        width: 380,
        marginVertical: 25,
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
    ringsImage: {
        position: 'absolute',
        top: -6,
        width: 300,
        height: 16,
        alignSelf: 'center',
    },
    pagesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 10,
        marginTop: 15,
    },
    page: {
        fontSize: 12,
        fontFamily: 'Roboto-Regular',
        opacity: 0.5,
        marginBottom: 5,
    },
    next: {
        width: 80,
        height: 30,
        alignItems: 'center',
    },
    nextText: {
        fontSize: 16,
        fontFamily: 'Roboto-Bold',
    },
    last: {
        width: 80,
        height: 30,
        alignItems: 'center',
    },
})
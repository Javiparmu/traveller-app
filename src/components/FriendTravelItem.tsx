import React, { useContext } from 'react'
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { default as FAIcon } from 'react-native-vector-icons/FontAwesome5';
import { default as MCIcon } from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '@react-navigation/native';
import { ThemeContext } from '../context/themeContext/ThemeContext';

interface FriendTravelItemProps {
    item: Item;
}

interface Item {
    title: string;
    author: string;
    description: string;
    from: string;
    to: string;
    image: string;
    participants: Participant[];
}

interface Participant {
    id: number;
    name: string;
    image: string;
}

export const FriendTravelItem = ({ item }: FriendTravelItemProps) => {

    const { theme: {colors} } = useContext(ThemeContext);

    return (
        <View style={styles.container}>
            <View style={styles.itemContainer}>
                <TouchableOpacity
                    activeOpacity={0.5}
                    style={{ position: 'absolute', right: 10, top: -33 }}
                >
                    <Text style={{fontFamily: 'Roboto-Regular', fontSize: 16, color: colors.text, marginVertical: 5, marginLeft: 10}}>Ver todo</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: 200 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon
                                name="airplane-outline"
                                size={30}
                                color={colors.primary}
                            />
                            <Text style={{...styles.itemTitle, color: colors.text}}>{item.title}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <FAIcon
                                name="user-circle"
                                size={25}
                                color={colors.primary}
                            />
                            <Text style={{...styles.author, color: colors.text}}>Creado por {item.author}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <MCIcon
                                name="airplane-takeoff"
                                size={25}
                                color={colors.primary}
                            />
                            <Text style={{ fontFamily: 'Roboto-Regular', fontSize: 16, color: colors.text, marginVertical: 5, marginLeft: 15 }}>Salida: </Text>
                            <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 16, marginVertical: 5, color: colors.text }}>{item.from}</Text>
                        </View>
                    </View>
                    <View style={{ width: 60 }}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={{ 
                                backgroundColor: colors.secondary, 
                                width: 60,
                                borderRadius: 10, 
                                padding: 8, 
                                position: 'absolute',
                                bottom: 30,
                                left: 35,
                            }}
                        >
                            <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 16, color: colors.card, textAlign: 'center' }}>VER</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 16, color: colors.text, marginBottom: 10, marginTop: 20 }}>Participantes: </Text>
                <FlatList
                    data={item.participants}
                    keyExtractor={(item) => item.name + item.id}
                    renderItem={({ item }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <TouchableOpacity activeOpacity={0.8} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image
                                    source={{ uri: item.image }}
                                    style={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: 50,
                                        borderWidth: 2,
                                        borderColor: colors.secondary,
                                        marginLeft: 10,
                                    }}
                                />
                            </TouchableOpacity>
                            <Text style={{ fontFamily: 'Roboto-Regular', fontSize: 14, color: colors.text, marginLeft: 10 }}>{item.name}</Text>
                        </View>
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 8,
    },
    itemContainer: {
        marginHorizontal: 25,
        width: '85%',
        marginTop: -10
    },
    itemTitle: {
        fontSize: 20,
        fontFamily: 'Roboto-Bold',
        marginVertical: 5,
        marginLeft: 10,
    },
    author: {
        fontSize: 16,
        fontFamily: 'Roboto-Regular',
        marginLeft: 15,
    },
})
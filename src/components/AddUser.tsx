import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Animated } from 'react-native';
import React, { useState, useRef, useContext, useEffect } from 'react'
import { User } from '../interfaces/userInterface';
import { users } from '../data/userData';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { ItemSeparator } from './ItemSeparator';
import { ThemeContext } from '../context/themeContext/ThemeContext';
import { default as MCIcon } from 'react-native-vector-icons/MaterialCommunityIcons';
import { default as IonIcon } from 'react-native-vector-icons/Ionicons';
import { TextInput } from 'react-native-gesture-handler';
import { globalStyles } from '../theme/appTheme';
import { useAnimation } from '../hooks/useAnimation';

interface AddUserProps {
    participants: User[];
    onModalAccept: (users: User[]) => void;
    onModalCancel: () => void;
}

export const AddUser = ({ participants, onModalAccept, onModalCancel }: AddUserProps) => {

    const { theme: { colors } } = useContext(ThemeContext);

    const [friends, setFriends] = useState<User[]>(users)
    const [usersToAdd, setUsersToAdd] = useState<User[]>(participants);
    const [checkboxStates, setCheckboxStates] = useState<boolean[]>([].slice(0, friends.length));
    const [search, setSearch] = useState<string>('');
    const [isEndReached, setIsEndReached] = useState<boolean>(false);

    const { startReducingSize } = useAnimation();

    let checkboxRef = useRef<any>([]);
    const flatListRef = useRef<FlatList>(null);

    useEffect(() => {
        checkboxRef.current = checkboxRef.current.slice(0, friends.length);
    }, [checkboxRef.current]);

    useEffect(() => {
        const initialStates = friends.map((user) => {
            if (usersToAdd.includes(user)) return true;
            return false;
        })
        setCheckboxStates(initialStates)
    }, []);

    const deleteUser = (id: string) => {
        startReducingSize();
        setUsersToAdd(usersToAdd.filter(user => user.id !== id))
        if (usersToAdd.length > 0) {
            checkboxRef.current.map((ref: any, index: number) => {
                if (id !== friends[index].id) return
                if (ref.props.isChecked) ref.props.onPress();
            })
        }
    }

    const onCheckboxPress = (index: number) => {
        const newCheckboxStates = [...checkboxStates];
        newCheckboxStates[index] = !newCheckboxStates[index];
        setCheckboxStates(newCheckboxStates);
        startReducingSize();
        if (newCheckboxStates[index]) {
            setUsersToAdd([...usersToAdd, friends[index]]);
        } else {
            setUsersToAdd(usersToAdd.filter(user => user.id !== friends[index].id));
        }
    }

    const onSearch = (text: string) => {
        setSearch(text);
        if (text.length > 1) {
            setFriends(users.filter(user => user.name.toLowerCase().includes(text.toLowerCase())));
        } else {
            setFriends(users);
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ ...styles.searchSection, borderColor: colors.border }}>
                <IonIcon style={styles.searchIcon} name="search" size={20} color={colors.text} />
                <TextInput
                    style={styles.input}
                    placeholder="Buscar"
                    value={search}
                    onChangeText={onSearch}
                    autoCorrect={false}
                />
            </View>
            <FlatList
                ref={flatListRef}
                data={usersToAdd}
                keyExtractor={(item) => item.name + '_' + item.id}
                renderItem={({ item }) => (
                    <Animated.View style={{ paddingTop: 2 }}>
                        <Image
                            source={{ uri: item.image }}
                            style={{ ...styles.addedUserImage, width: 40, height: 40 }}
                        />
                        <MCIcon
                            name="minus"
                            size={18}
                            color='#1E90FF'
                            style={globalStyles.closeIcon}
                            onPress={() => deleteUser(item.id)}
                        />
                    </Animated.View>
                )}
                horizontal
                onContentSizeChange={() => isEndReached ? flatListRef.current?.scrollToEnd() : ''}
                onEndReached={() => setIsEndReached(true)}
                onMomentumScrollBegin={() => setIsEndReached(false)}
                showsHorizontalScrollIndicator={false}
                style={{ width: 250 }}
            />
            <FlatList
                data={friends}
                keyExtractor={(item) => item.name + '_' + item.id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => checkboxRef.current[index]?.props.onPress()}
                        style={styles.userContainer}
                    >
                        <View style={{ flexDirection: 'row' }}>
                            <Image
                                source={{ uri: item.image }}
                                style={styles.userImage}
                            />
                            <Text style={{ ...styles.userName, color: colors.text }}>{item.name}</Text>
                        </View>
                        <BouncyCheckbox
                            ref={(ref) => checkboxRef.current[index] = ref}
                            size={20}
                            isChecked={checkboxStates[index]}
                            fillColor="#1E90FF"
                            unfillColor="#FFFFFF"
                            disableBuiltInState
                            iconStyle={{ borderColor: "#1E90FF" }}
                            onPress={() => onCheckboxPress(index)}
                            disableText
                            style={{ marginRight: 17 }}
                        />
                    </TouchableOpacity>
                )}
                ItemSeparatorComponent={() => <ItemSeparator />}
                style={{ ...styles.flatList }}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={{ ...styles.button }}
                    onPress={() => onModalCancel()}
                >
                    <Text style={{ ...styles.buttonText, color: '#FA564E' }}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} style={{ ...styles.button }} onPress={() => onModalAccept(usersToAdd)}>
                    <Text style={{ ...styles.buttonText, color: '#1E90FF' }}>Agregar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    searchSection: {
        width: 250,
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 20,
        borderWidth: 1,
        marginBottom: 10,
        marginTop: 16,
    },
    searchIcon: {
        marginLeft: 10,
    },
    input: {
        width: 200,
        backgroundColor: '#fff',
        color: '#424242',
    },
    addedUserImage: {
        borderRadius: 20,
        marginRight: 10,
        marginBottom: 20,
    },
    userContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    userImage: {
        width: 30,
        height: 30,
        borderRadius: 50,
        marginRight: 10,
    },
    userName: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 5
    },
    flatList: {
        height: 320,
        width: 270,
        marginTop: 5,
        paddingTop: 5,
    },
    button: {
        width: 80,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 10,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    }
})
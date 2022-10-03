import { StyleSheet, Text, View, Modal, Pressable } from 'react-native';
import React, { useContext } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AddUser } from './AddUser';
import { globalStyles } from '../theme/appTheme';
import { ThemeContext } from '../context/themeContext/ThemeContext';
import { User } from '../interfaces/userInterface';

interface AddParticipantsModalProps {
    modalVisible: boolean;
    participants: User[];
    onModalAccept: (users: User[]) => void;
    onModalCancel: () => void;
    toggleModalVisible: () => void;
}

export const AddParticipantsModal = ({
    modalVisible,
    participants,
    onModalAccept,
    onModalCancel,
    toggleModalVisible
}: AddParticipantsModalProps) => {

    const { theme: { colors } } = useContext(ThemeContext);

    return (
        <>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ ...globalStyles.subtitle, color: colors.text }}>Añadir miembros:</Text>
                <Icon
                    name='account-plus-outline'
                    size={30}
                    color={colors.primary}
                    onPress={() => toggleModalVisible()}
                    style={{ marginLeft: 20, top: 24 }}
                />
            </View>
            <Modal
                animationType='fade'
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    toggleModalVisible();
                }}
            >
                <View style={styles.modalViewContainer}>
                    <View style={{ ...styles.modalView, backgroundColor: colors.card }}>
                        <AddUser participants={participants} onModalAccept={onModalAccept} onModalCancel={onModalCancel} />
                    </View>
                </View>
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    modalViewContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalView: {
        width: 300,
        height: 400,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'flex-start',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
})
import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useContext, useState } from 'react'
import { globalStyles } from '../theme/appTheme'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ThemeContext } from '../context/themeContext/ThemeContext';
import { usePhotos } from '../hooks/usePhotos';

interface ImageSelectorProps {
    uri: string | undefined;
    takePhoto: () => void;
    takePhotoFromGallery: () => void;
}

export const ImageSelector = ({ uri, takePhoto, takePhotoFromGallery }: ImageSelectorProps) => {

    const { theme: { colors } } = useContext(ThemeContext);

    return (
        <>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ ...globalStyles.subtitle, color: colors.text }}>Imagen:</Text>
                <Icon
                    name='camera-outline'
                    size={30}
                    color={colors.primary}
                    onPress={takePhoto}
                    style={{ marginLeft: 20, top: 24 }}
                />
                <Icon
                    name='image-outline'
                    size={30}
                    color={colors.primary}
                    onPress={takePhotoFromGallery}
                    style={{ marginLeft: 20, top: 23 }}
                />
            </View>
            {
                uri &&
                <Image
                    source={{ uri: uri }}
                    style={{ width: 120, height: 120, borderRadius: 10, borderWidth: 3, borderColor: colors.secondary, marginTop: 20, alignSelf: 'center' }}
                />
            }
        </>
    )
}
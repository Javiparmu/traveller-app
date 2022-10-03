import { StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native';
import React, { useContext, useState } from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { globalStyles } from '../theme/appTheme';
import { ThemeContext } from '../context/themeContext/ThemeContext';

interface DestinationInputProps {
    title: string;
    onDestinationChange: (destination: string) => void;
}


export const DestinationInput = ({ title, onDestinationChange }: DestinationInputProps) => {

    const { theme: { colors } } = useContext(ThemeContext);

    return (
        <View style={{ flexDirection: 'row' }}>
            <Text style={{ ...globalStyles.subtitle, color: colors.text }}>{title}</Text>
            <KeyboardAvoidingView style={{ ...styles.inputContainer, borderColor: colors.border }}>
                <GooglePlacesAutocomplete
                    placeholder='Elige tu destino'
                    styles={{
                        textInput: {
                            fontSize: 18,
                            top: 5
                        },
                        container: {
                            flex: 0
                        },
                    }}
                    enablePoweredByContainer={false}
                    minLength={2}
                    onPress={(data, details = null) => {
                        onDestinationChange(data.description);
                    }}
                    query={{
                        key: 'AIzaSyCXT6UdcGkHpB5tQqpGhZFZvfpUbZepSzw',
                        language: 'es',
                    }}
                    nearbyPlacesAPI='GooglePlacesSearch'
                    debounce={400}
                />
            </KeyboardAvoidingView>
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        width: 175,
        borderRadius: 10,
        marginTop: 10,
        marginLeft: 10,
        paddingLeft: 10,
        paddingRight: 10,
        borderBottomWidth: 1
    },
})
import React, { useState, useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DatePicker from 'react-native-date-picker';
import { ThemeContext } from '../context/themeContext/ThemeContext';
import { globalStyles } from '../theme/appTheme';

interface DatePickerProps {
    title: string;
    date: Date;
    onDateChange: (date: Date) => void;
}

export const CustomDatePicker = ({ title, date, onDateChange }: DatePickerProps) => {

    const [open, setOpen] = useState(false);

    const { theme: { colors } } = useContext(ThemeContext);

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ ...globalStyles.subtitle, color: colors.text }}>{title}</Text>
            <Text style={{ ...styles.date, color: colors.text }}>
                {`${date.getDate()} - ${date.getMonth() + 1} - ${date.getFullYear()}`}
            </Text>
            <Icon
                name={'calendar-plus'}
                size={30}
                color={colors.primary}
                onPress={() => setOpen(!open)}
                style={{ marginLeft: 10, marginTop: 20 }}

            />
            <DatePicker
                modal
                mode='date'
                open={open}
                date={date}
                onConfirm={(date) => {
                    setOpen(false)
                    onDateChange(date)
                }}
                onCancel={() => {
                    setOpen(false)
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
      date: {
        fontSize: 18,
        fontFamily: 'Roboto-Regular',
        marginLeft: 20,
        marginTop: 25,
      },
})

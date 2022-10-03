import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import React, { useContext, useState } from 'react'
import { AnimatedLogo } from '../components';
import { User } from '../interfaces/userInterface';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../navigator/Navigation';
import { ThemeContext } from '../context/themeContext/ThemeContext';
import { globalStyles } from '../theme/appTheme';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { Card } from 'react-native-paper';
import { LocaleConfig } from 'react-native-calendars';
import { useDates } from '../hooks/useDates';

interface Props extends StackScreenProps<RootStackParams, 'EditTravel'> { }

LocaleConfig.locales['es'] = {
  monthNames: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ],
  monthNamesShort: ['Ene.', 'Feb.', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic.'],
  dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
  dayNamesShort: ['Dom.', 'Lun.', 'Mar.', 'Mié.', 'Jue.', 'Vie.', 'Sáb.'],
  today: 'Hoy',
};
LocaleConfig.defaultLocale = 'es';

export const EditTravel = ({ navigation, route }: Props) => {

  const { travel: { title, startDate, endDate, destination, image, participants } } = route.params;

  const { theme: { colors } } = useContext(ThemeContext);

  const { getDaysInMonth, getWeekDayFromDate } = useDates();

  const [events, setEvents] = useState([])

  return (
    <View style={{ ...styles.container, backgroundColor: colors.card }}>
      <AnimatedLogo />
      <View style={{ marginHorizontal: 20, marginTop: 20 }}>
        <Text style={{ ...globalStyles.title, color: colors.text }}>{title}</Text>
        <View style={{ height: 400 }}>
          <Text style={{ ...globalStyles.subtitle, color: colors.text }}>{getDaysInMonth(10, 2022)}</Text>
          <Text style={{ ...globalStyles.subtitle, color: colors.text }}>{getWeekDayFromDate(new Date())}</Text>
        </View>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  item: {
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
})
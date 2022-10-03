import { useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

interface TravelItemProps {
  title: string;
  from: string;
  to: string;
  image: string;
}

export const TravelItem = ({ title, from, to, image }: TravelItemProps) => {

  const [timeMessage, setTimeMessage] = useState<string>('');

  const { colors } = useTheme();

  useEffect(() => {
    let days = getDaysLeft()
    let months: number = 0;
    let years: number = 0;

    if (days >= 30) {
      months = Math.floor(days / 30);
      days = days % 30;
      if (months >= 12) {
        years = Math.floor(months / 12);
        months = months % 12;
      }
    }

    const time = {
      years,
      months,
      days
    }

    let message = '';
    let yearWord = time.years > 1 ? 'años' : 'año';
    let monthWord = time.months > 1 ? 'meses' : 'mes';
    let dayWord = time.days > 1 ? 'días' : 'día';
    if (time.years > 0) {
      message = `${time.years} ${yearWord}`;
      if (time.months > 0) {
        let union = 'y'
        if (time.days > 0) union = ',';
        message = `${message} ${union} ${time.months} ${monthWord}`;
        if (time.days > 0) {
          message = `${message} y ${time.days} ${dayWord}`;
        }
      } else if (time.days > 0) {
        message = `${message} y ${time.days} ${dayWord}`;
      }
    } else if (time.months > 0) {
      message = `${time.months} ${monthWord}`;
      if (time.days > 0) {
        message = `${message} y ${time.days} ${dayWord}`;
      }
    } else {
      message = `${time.days} ${dayWord}`;
    }

    setTimeMessage(message)
  }, [])

  const getDaysLeft = () => {
    const today = new Date();
    const formattedDate = formatDate(from)
    const travelDate = new Date(formattedDate);
    const daysLeft = Math.floor((travelDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
    return daysLeft;
  }

  const formatDate = (date: string) => {
    const dateParts = date.split('-');
    const year = dateParts[2];
    const month = dateParts[1];
    const day = dateParts[0];
    return `${year}-${month}-${day}`;
  }

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
    >
      <View style={styles.itemContainer}>
        <Image
          source={{ uri: image }}
          style={{
            width: 60,
            height: 60,
            borderRadius: 10,
          }}
        />
        <View style={styles.textContainer}>
          <Text style={{...styles.travelText, color: colors.text}}>{title}</Text>
          <Text style={{...styles.dateText, color: colors.text}}>{from} - {to}</Text>
          <View style={styles.timeContainer}>
            <Icon
              name="time-outline"
              size={12}
              color={colors.text}
              style={{ marginTop: 2, opacity: 0.4 }} 
            />
            <Text style={{...styles.daysText, color: colors.text}}>Quedan {timeMessage}</Text>
          </View>
        </View>
      </View>

      <Icon
        name="chevron-forward-outline"
        size={25}
        color={colors.text}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 25,
    paddingVertical: 8,
    justifyContent: 'space-between',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: 10,
  },
  travelText: {
    marginLeft: 15,
    fontSize: 18,
    fontFamily: 'Roboto-Bold',
  },
  dateText: {
    marginLeft: 15,
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
  },
  daysText: {
    marginLeft: 5,
    fontSize: 14,
    opacity: 0.4,
    fontFamily: 'Roboto-Regular',
  },
  timeContainer: {
    marginLeft: 15,
    flexDirection: 'row',
    alignItems: 'center',
  }
});
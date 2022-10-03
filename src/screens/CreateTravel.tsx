import React, { useContext, useState } from 'react'
import { Text, View, StyleSheet, StatusBar, TextInput, FlatList, Image, TouchableOpacity } from 'react-native';
import { ThemeContext } from '../context/themeContext/ThemeContext';
import { globalStyles } from '../theme/appTheme';
import { CustomDatePicker, AnimatedLogo, DestinationInput, ImageSelector, AddParticipantsModal } from '../components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { User } from '../interfaces/userInterface';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../navigator/Navigation';
import { usePhotos } from '../hooks/usePhotos';

interface Props extends StackScreenProps<RootStackParams, 'CreateTravel'> { }

export const CreateTravel = ({ navigation }: Props) => {

  const { theme: { colors } } = useContext(ThemeContext);

  const [titleInput, setTitleInput] = useState('');
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [destination, setDestination] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [participants, setParticipants] = useState<User[]>([]);

  const { tempUri, takePhoto, takePhotoFromGallery } = usePhotos();

  const onStartDateChange = (date: Date) => {
    setStartDate(date);
  }

  const onEndDateChange = (date: Date) => {
    setEndDate(date);
  }

  const onDestinationChange = (destination: string) => {
    setDestination(destination);
  }

  const onModalAccept = (users: User[]) => {
    setModalVisible(false);
    setParticipants([...participants, ...users.filter(user => !participants.includes(user))]);
  }

  const onModalCancel = () => {
    setModalVisible(false);
  }

  const toggleModalVisible = () => {
    setModalVisible((prev) => !prev);
  }

  return (
    <View style={{ ...styles.container, backgroundColor: colors.card }}>
      <StatusBar animated barStyle={'dark-content'} translucent backgroundColor={modalVisible ? 'rgba(0, 0, 0, 0.3)' : 'transparent'} />
      <AnimatedLogo />
      <Text style={{ ...styles.title, color: colors.text }}>Crea tu viaje</Text>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ ...globalStyles.subtitle, color: colors.text }}>Título del viaje:</Text>
        <TextInput
          style={{ ...styles.input, color: colors.text, borderColor: colors.border }}
          placeholder={'Ej: Viaje a la playa'}
          placeholderTextColor={colors.border}
          value={titleInput}
          onChangeText={(text) => setTitleInput(text)}
          autoCorrect={false}
        />
      </View>
      <CustomDatePicker title={'Fecha de salida:'} date={startDate} onDateChange={onStartDateChange} />
      <CustomDatePicker title={'Fecha de llegada:'} date={endDate} onDateChange={onEndDateChange} />
      <DestinationInput title='Destino' onDestinationChange={onDestinationChange} />
      <ImageSelector uri={tempUri} takePhoto={takePhoto} takePhotoFromGallery={takePhotoFromGallery} />
      <AddParticipantsModal
        modalVisible={modalVisible}
        participants={participants}
        onModalAccept={onModalAccept}
        onModalCancel={onModalCancel}
        toggleModalVisible={toggleModalVisible}
      />
      <View style={{ flexDirection: 'row', marginTop: 15, marginHorizontal: 20 }}>
        <FlatList
          data={participants}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={{ alignItems: 'center', width: 55, marginRight: 10 }}>
              <Image source={{ uri: item.image }} style={{ width: 45, height: 45, borderRadius: 25 }} />
              <Text numberOfLines={1} style={{ color: colors.text, marginLeft: 5 }}>{item.name.split(' ')[0]}</Text>
              <Icon
                name="minus"
                size={18}
                color='#1E90FF'
                style={{ ...globalStyles.closeIcon, right: -1 }}
                onPress={() => {
                  setParticipants(participants.filter(user => user.id !== item.id))
                }}
              />
            </View>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <TouchableOpacity activeOpacity={0.8} onPress={() => {
        navigation.replace('EditTravel', {
          travel: {
            title: titleInput,
            startDate,
            endDate,
            destination,
            image: tempUri,
            participants
          }
        })
      }} style={{ ...styles.button }}>
        <Text style={{ ...styles.buttonText, color: colors.secondary }}>Crear viaje</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: -5,
  },
  title: {
    fontSize: 26,
    fontFamily: 'Roboto-Bold',
    marginLeft: 20,
    marginTop: 35,
  },
  input: {
    width: 170,
    height: 40,
    borderBottomWidth: 1,
    marginLeft: 20,
    marginTop: 25,
    paddingLeft: 10,
    fontSize: 18,
    fontFamily: 'Roboto-Regular',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
    alignSelf: 'flex-end',
    marginTop: 25,
    marginBottom: 20,
    marginRight: 20,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Roboto-Bold',
  },
})

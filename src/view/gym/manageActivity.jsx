import {useEffect, useState} from 'react';
import {Pressable, Text, TextInput, View} from 'react-native';

import Header from '../../components/Header';
import ViewDefault from '../ViewDefault';
import styles from '../../styles';
import Button from '../../components/Button';
import ManageActivityList from './components/manageActivityList';

export default function ManageActivity({navigation, route}) {
  const [name, setName] = useState('');
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [availableActivities, setAvailableActivities] = useState([]);

  const activitiesList = [
    {
      id: 1,
      title: 'ESTEIRA',
    },
    {
      id: 2,
      title: 'SUPINO',
    },
    {
      id: 3,
      title: 'CRUCIFIXO',
    },
    {
      id: 4,
      title: 'TRICEPS',
    },
    {
      id: 5,
      title: 'ELEVAÇÃO LATERAL',
    },
    {
      id: 6,
      title: 'REMADA',
    },
    {
      id: 7,
      title: 'ROTAÇÃO DE TRONCO',
    },
    {
      id: 8,
      title: 'ROSCA',
    },
    {
      id: 9,
      title: 'EXTENSÃO DE TRONCO',
    },
    {
      id: 10,
      title: 'LEG PRESS',
    },
    {
      id: 10,
      title: 'EXTENSÃO DE JOELHOS',
    },
    {
      id: 11,
      title: 'FLEXÃO DE JOELHOS',
    },
    {
      id: 12,
      title: 'ABDUÇÃO DE QUADRIL',
    },
    {
      id: 13,
      title: 'ADUÇÃO DE QUADRIL',
    },
    {
      id: 14,
      title: 'EXTENSÃO DE QUADRIL',
    },
    {
      id: 15,
      title: 'ABDOMINAL',
    },
    {
      id: 16,
      title: 'ALONGAMENTO',
    },
  ];

  useEffect(() => {
    setAvailableActivities(activitiesList);
  }, []);

  function createActivity() {
    const data = {
      idUser: null,
      activityList: selectedActivities,
    };

    console.log(data);
  }

  function addItemToList(data) {
    const newActivity = {
      ...data,
      load: null,
      machine: null,
      repetitions: null,
      series: null,
      time: null,
      note: null,
    };
    selectedActivities.push(newActivity);
    setSelectedActivities(selectedActivities);
  }

  return (
    <ViewDefault>
      <Header navigation={navigation} title={'GERENCIAR TREINO'} />
      <View
        style={[
          styles.gapStyle.gap_5,
          styles.paddingStyle.px_3,
          {
            flex: 1,
          },
        ]}>
        <View style={[styles.main.column, styles.gapStyle.gap_1]}>
          <Text
            style={[
              styles.colors.textColor.white_2,
              styles.font.size.size_18,
              styles.font.weight.regular,
            ]}>
            NOME DO TREINO
          </Text>
          <TextInput
            style={[
              styles.colors.backgroundColor.dark_3,
              styles.paddingStyle.py_1,
              styles.paddingStyle.px_2,
              styles.font.size.size_20,
              styles.font.weight.medium,
              styles.colors.textColor.white_1,
            ]}
            placeholder="EXEMPLO: TREINO A"
            placeholderTextColor={styles.colors.textColor.gray_1.color}
            defaultValue={name}
            onChangeText={text => setName(text)}
          />
        </View>
        <ManageActivityList
          title={'MINHAS ATIVIDADES'}
          selectedActivities={selectedActivities}
          availableActivities={availableActivities}
          addItemToList={addItemToList}
        />
        <Pressable onPress={() => createActivity()}>
          <Button title={'CRIAR'} type={1} />
        </Pressable>
        <Pressable onPress={() => createActivity()}>
          <Button title={'ATUALIZAR'} type={1} />
        </Pressable>
      </View>
    </ViewDefault>
  );
}

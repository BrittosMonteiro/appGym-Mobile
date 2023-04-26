import {useEffect, useState} from 'react';
import {Pressable, Text, TextInput, View} from 'react-native';

import Header from '../../components/Header';
import ViewDefault from '../ViewDefault';
import styles from '../../styles';
import Button from '../../components/Button';
import ManageActivityList from './components/manageActivityList';
import {useDispatch} from 'react-redux';
import {setLoading, unsetLoading} from '../../store/actions/loadingAction';
import {
  createActivityService,
  readActivityByIdService,
} from '../../service/activity';

export default function ManageActivity({navigation, route}) {
  const {userId, idActivity} = route.params;
  const dispatch = useDispatch();

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
    {
      id: 17,
      title: 'PULL UP',
    },
    {
      id: 18,
      title: 'DIP',
    },
  ];

  async function loadActivity() {
    await readActivityByIdService(idActivity)
      .then(responseFind => {
        if (responseFind) {
          return responseFind.json();
        }
      })
      .then(response => {
        setSelectedActivities(response.data.items);
        setName(response.data.title);
      })
      .catch(err => {});
  }

  useEffect(() => {
    setAvailableActivities(activitiesList);
    loadActivity();
  }, []);

  async function createActivity() {
    dispatch(setLoading());
    if (!name) {
      dispatch(unsetLoading());
      return;
    }
    const data = {
      idUser: userId,
      items: selectedActivities,
      title: name,
    };

    await createActivityService(data)
      .then(() => {
        dispatch(setLoading());
        navigation.goBack();
      })
      .catch(err => {})
      .finally(() => {
        dispatch(unsetLoading());
      });
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

  function deleteItemFromList(index) {
    setSelectedActivities(selected =>
      selected.filter((items, key) => key !== index),
    );
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
          deleteItemFromList={deleteItemFromList}
        />
        {idActivity ? (
          <Pressable onPress={() => createActivity()}>
            <Button title={'ATUALIZAR'} type={1} />
          </Pressable>
        ) : (
          <Pressable onPress={() => createActivity()}>
            <Button title={'CRIAR'} type={1} />
          </Pressable>
        )}
      </View>
    </ViewDefault>
  );
}

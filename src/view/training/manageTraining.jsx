import {useEffect, useState} from 'react';

import Header from '../../components/Header/Header';
import ViewDefault from '../ViewDefault';
import ManageActivityList from './components/manageActivityList';
import {useDispatch} from 'react-redux';
import {setLoading, unsetLoading} from '../../store/actions/loadingAction';
import {
  createActivityService,
  readActivityByIdService,
} from '../../service/activity';
import {ButtonDefault, Card, ContainerScroll} from '../style';
import {Column, InputText, Label} from '../profile/components/style';
import HorizontalRule from '../../components/HorizontalRule/HorizontalRule';

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
      <HorizontalRule />
      <ContainerScroll contentContainerStyle={{gap: 24}}>
        <Card $black $padding>
          <Column $gap>
            <Label>NOME DO TREINO</Label>
            <InputText
              placeholder="EXEMPLO: TREINO A"
              defaultValue={name}
              onChangeText={text => setName(text)}
            />
          </Column>
        </Card>

        <Card $black $padding>
          <ManageActivityList
            title={'MINHAS ATIVIDADES'}
            selectedActivities={selectedActivities}
            availableActivities={availableActivities}
            addItemToList={addItemToList}
            deleteItemFromList={deleteItemFromList}
          />
        </Card>
        <ButtonDefault $green onPress={() => createActivity()}>
          <Label>{idActivity ? 'ATUALIZAR' : 'CRIAR'}</Label>
        </ButtonDefault>
      </ContainerScroll>
    </ViewDefault>
  );
}
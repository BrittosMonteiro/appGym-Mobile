import {useEffect, useState} from 'react';

import Header from '../../components/Header/Header';
import ViewDefault from '../ViewDefault';
import ManageActivityList from './components/manageActivityList';
import {useDispatch} from 'react-redux';
import {setLoading, unsetLoading} from '../../store/actions/loadingAction';
import {
  createTrainingService,
  readTrainingByIdService,
  updateTrainingByIdService,
} from '../../service/training';
import {ButtonDefault, Card, ContainerScroll} from '../style';
import {Column, InputText, Label} from '../profile/components/style';
import HorizontalRule from '../../components/HorizontalRule/HorizontalRule';

export default function ManageActivity({navigation, route}) {
  const {userId, idActivity} = route.params;
  const DISPATCH = useDispatch();

  const [name, setName] = useState('');
  const [idTraining, setIdTraining] = useState(idActivity);
  const [selectedActivities, setSelectedActivities] = useState([]);

  async function loadActivity() {
    DISPATCH(setLoading());

    if (!idTraining) {
      DISPATCH(unsetLoading());
      return;
    }

    await readTrainingByIdService(idActivity)
      .then(responseFind => {
        if (responseFind) {
          return responseFind.json();
        }
      })
      .then(response => {
        setSelectedActivities(response.data.items);
        setName(response.data.title);
      })
      .catch(err => {})
      .finally(() => {
        DISPATCH(unsetLoading());
      });
  }

  useEffect(() => {
    loadActivity();
  }, []);

  async function createActivity() {
    DISPATCH(setLoading());
    if (!name) {
      DISPATCH(unsetLoading());
      return;
    }
    const data = {
      idUser: userId,
      items: selectedActivities,
      title: name,
    };

    await createTrainingService(data)
      .then(responseCreate => {
        if (responseCreate.status === 201) {
          return responseCreate.json();
        }
      })
      .then(response => {
        setIdTraining(response.idTraining);
      })
      .catch(err => {})
      .finally(() => {
        DISPATCH(unsetLoading());
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
    const update = {
      idTraining,
      newData: {
        items: selectedActivities,
      },
    };
    manageUpdate(update);
  }

  function deleteItemFromList(index) {
    const newList = selectedActivities.filter((items, key) => key !== index);

    const update = {
      idTraining,
      newData: {
        items: newList,
      },
    };
    manageUpdate(update);
  }

  function updateTraining(data) {
    const updatedList = selectedActivities;
    updatedList[data.index] = data.newInformation;

    const update = {
      idTraining,
      newData: {
        items: updatedList,
        title: name,
      },
    };
    manageUpdate(update);
  }

  async function manageUpdate(data) {
    DISPATCH(setLoading());
    await updateTrainingByIdService(data)
      .then(responseUpdate => {
        if (responseUpdate.status === 200) {
          loadActivity();
        }
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        DISPATCH(unsetLoading());
      });
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
              placeholder={`EXEMPLO: TREINO A`}
              defaultValue={name}
              onChangeText={text => setName(text)}
            />
          </Column>
        </Card>

        {idTraining && (
          <ManageActivityList
            title={'MINHAS ATIVIDADES'}
            selectedActivities={selectedActivities}
            addItemToList={addItemToList}
            deleteItemFromList={deleteItemFromList}
            updateTraining={updateTraining}
          />
        )}

        {idTraining ? (
          <ButtonDefault
            $green
            onPress={() => manageUpdate({idTraining, newData: {title: name}})}>
            <Label>ATUALIZAR</Label>
          </ButtonDefault>
        ) : (
          <ButtonDefault $green onPress={() => createActivity()}>
            <Label>CRIAR</Label>
          </ButtonDefault>
        )}
      </ContainerScroll>
    </ViewDefault>
  );
}

import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';

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
import WorkoutDays from '../../components/WorkoutDays/WorkoutDays';
import {setMessageError, setMessageOff} from '../../store/actions/systemAction';

export default function ManageActivity({navigation, route}) {
  const {userId, idActivity} = route.params;
  const DISPATCH = useDispatch();

  const [name, setName] = useState('');
  const [idTraining, setIdTraining] = useState(idActivity);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [workoutDays, setWorkoutDays] = useState([]);
  const {t} = useTranslation();

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
        setWorkoutDays(response.data.workoutDays);
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
      setMessage(`${t('system_message_workout_missing_name')}`);
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
      .catch(() => {
        setMessage(`${t('system_message_workout_default_error')}`);
      })
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
      .catch(() => {
        setMessage(`${t('system_message_workout_error_updating')}`);
      })
      .finally(() => {
        DISPATCH(unsetLoading());
      });
  }

  function manageWorkoutDays(index) {
    if (index === 7) {
      setWorkoutDays([0, 1, 2, 3, 4, 5, 6]);
    } else {
      if (!workoutDays.includes(index)) {
        setWorkoutDays(prevMovies => [...prevMovies, index]);
      } else {
        setWorkoutDays(prevMovies => prevMovies.filter(item => item !== index));
      }
    }
  }

  function setMessage(text) {
    DISPATCH(setMessageError(text));
    setTimeout(() => {
      DISPATCH(setMessageOff());
    }, 2500);
  }

  return (
    <ViewDefault>
      <Header navigation={navigation} title={t('title_manage_workout')} />
      <HorizontalRule />
      <ContainerScroll contentContainerStyle={{gap: 24}}>
        <Card $black $padding>
          <Column $gap>
            <Label>{t('lbl_workout_name')}</Label>
            <InputText
              placeholder={`${t('lbl_example')}: TREINO A`}
              defaultValue={name}
              onChangeText={text => setName(text)}
            />
          </Column>
        </Card>

        {idTraining && (
          <ManageActivityList
            title={t('title_my_exercises')}
            selectedActivities={selectedActivities}
            addItemToList={addItemToList}
            deleteItemFromList={deleteItemFromList}
            updateTraining={updateTraining}
          />
        )}

        {idTraining && (
          <WorkoutDays
            workoutDays={workoutDays}
            manageWorkoutDays={manageWorkoutDays}
          />
        )}

        {idTraining ? (
          <ButtonDefault
            $green
            onPress={() =>
              manageUpdate({idTraining, newData: {title: name, workoutDays}})
            }>
            <Label>{t('lbl_update')}</Label>
          </ButtonDefault>
        ) : (
          <ButtonDefault $green onPress={() => createActivity()}>
            <Label>{t('lbl_create')}</Label>
          </ButtonDefault>
        )}
      </ContainerScroll>
    </ViewDefault>
  );
}

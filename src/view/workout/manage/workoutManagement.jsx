import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';

import Header from '../../../components/Header/Header';
import ViewDefault from '../../ViewDefault';
import ExerciseList from './components/ExerciseList';
import WorkoutDays from './components/WorkoutDays';

import {
  Button,
  ContainerScroll,
  CustomText,
  InputDataDefault,
} from '../../style';
import {Column} from '../../profile/components/style';

import {
  createTrainingService,
  readTrainingByIdService,
  updateTrainingByIdService,
} from '../../../service/training';

import {setLoading, unsetLoading} from '../../../store/actions/loadingAction';
import {
  setMessageError,
  setMessageOff,
  setMessageSuccess,
} from '../../../store/actions/systemAction';

export default function WorkoutManagement({navigation, route}) {
  const {userId, idActivity} = route.params;
  const DISPATCH = useDispatch();

  const [name, setName] = useState('');
  const [idTraining, setIdTraining] = useState(idActivity);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [workoutDays, setWorkoutDays] = useState([]);
  const {t} = useTranslation();

  function setMessage(text) {
    DISPATCH(setMessageError(text));
    setTimeout(() => {
      DISPATCH(setMessageOff());
    }, 5000);
  }

  function setSuccessMessage(text) {
    DISPATCH(setMessageSuccess(text));
    setTimeout(() => {
      DISPATCH(setMessageOff());
    }, 5000);
  }

  async function loadActivity() {
    DISPATCH(setLoading());

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
      .catch(() => {
        setMessage(['system_message_workout_could_not_load']);
      })
      .finally(() => {
        DISPATCH(unsetLoading());
      });
  }

  useEffect(() => {
    if (idActivity) loadActivity();
  }, []);

  async function createActivity() {
    DISPATCH(setLoading());
    if (!name) {
      DISPATCH(unsetLoading());
      setMessage(['system_message_workout_missing_name']);
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
        setSuccessMessage(['lbl_workout_created']);
      })
      .catch(() => {
        setMessage(['system_message_workout_default_error']);
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
        setMessage(['system_message_workout_error_updating']);
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
      <ContainerScroll contentContainerStyle={{gap: 32}}>
        <Column $gap>
          <CustomText $fontSize={14}>{t('lbl_workout_name')}</CustomText>
          <InputDataDefault
            $fontWeight={'SemiBold'}
            autoCapitalize={'characters'}
            placeholder={`${t('lbl_example')}: TREINO A`}
            defaultValue={name}
            onChangeText={text => setName(text)}
          />
        </Column>

        {idTraining && (
          <ExerciseList
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
          <Button
            $bgColor={props => props.theme.colors.turquoise_01}
            onPress={() =>
              manageUpdate({idTraining, newData: {title: name, workoutDays}})
            }>
            <CustomText
              $textAlign={'center'}
              $color={props => props.theme.colors.white_02}
              $fontSize={18}
              $weight={'SemiBold'}>
              {t('lbl_update')}
            </CustomText>
          </Button>
        ) : (
          <Button
            $bgColor={props => props.theme.colors.turquoise_01}
            onPress={() => createActivity()}>
            <CustomText
              $textAlign={'center'}
              $fontSize={18}
              $weight={'SemiBold'}
              $color={props => props.theme.colors.white_02}>
              {t('lbl_create')}
            </CustomText>
          </Button>
        )}
      </ContainerScroll>
    </ViewDefault>
  );
}

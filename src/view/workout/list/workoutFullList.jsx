import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

import ViewDefault from '../../ViewDefault';
import Header from '../../../components/Header/Header';

import {ContainerScroll} from '../../style';
import WorkoutOfTheDay from './components/WorkoutOfTheDay';
import WorkoutList from './components/WorkoutList';

import {readActivityListService} from '../../../service/training';

import {
  setMessageError,
  setMessageOff,
} from '../../../store/actions/systemAction';
import {setLoading, unsetLoading} from '../../../store/actions/loadingAction';

export default function WorkoutFullList({navigation, route}) {
  const DISPATCH = useDispatch();
  const {t} = useTranslation();

  const USERSESSION = useSelector(state => {
    return state.userSessionReducer;
  });

  const [trainingList, setTrainingList] = useState([]);
  const [todayTrainings, setTodayTrainings] = useState([]);
  const currentWeekday = new Date().getDay();

  function setMessage(text) {
    DISPATCH(setMessageError(text));
    setTimeout(() => {
      DISPATCH(setMessageOff());
    }, 5000);
  }

  async function loadActivities() {
    DISPATCH(setLoading());
    await readActivityListService(USERSESSION.id)
      .then(responseFind => {
        return responseFind.json();
      })
      .then(response => {
        setTrainingList(response.data);
        filterTrainings(response.data);
      })
      .catch(() => {
        setMessage(['system_message_workout_could_not_load_list']);
      })
      .finally(() => {
        DISPATCH(unsetLoading());
      });
  }

  useEffect(() => {
    loadActivities();
  }, []);

  useEffect(() => {
    navigation.addListener('focus', () => {
      loadActivities();
    });
  }, [navigation]);

  function filterTrainings(list) {
    setTodayTrainings(
      list.filter(item => item.workoutDays.includes(currentWeekday)),
    );
  }

  return (
    <ViewDefault>
      <Header navigation={navigation} title={t('title_workouts')} />
      <ContainerScroll
        contentContainerStyle={{
          alignItems: 'flex-start',
          gap: 24,
        }}>
        <WorkoutOfTheDay
          todayTrainings={todayTrainings}
          navigation={navigation}
        />
        <WorkoutList
          navigation={navigation}
          routeName={route.name}
          trainingList={trainingList}
          userId={USERSESSION.id}
          userSession={USERSESSION}
        />
      </ContainerScroll>
    </ViewDefault>
  );
}

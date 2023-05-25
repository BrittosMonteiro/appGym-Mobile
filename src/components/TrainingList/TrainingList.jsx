import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';

import {readActivityListService} from '../../service/training';
import {useDispatch, useSelector} from 'react-redux';
import {setLoading, unsetLoading} from '../../store/actions/loadingAction';
import {setMessageError, setMessageOff} from '../../store/actions/systemAction';
import Container2 from '../Container/Container';
import WorkoutOfTheDay from './WorkoutOfTheDay';
import TrainingMiniList from './TrainingMiniList';

export default function TrainingList({userId, navigation, limit, routeName}) {
  const dispatch = useDispatch();
  const USERSESSION = useSelector(state => {
    return state.userSessionReducer;
  });
  const [trainingList, setTrainingList] = useState([]);
  const [todayTrainings, setTodayTrainings] = useState([]);
  const currentWeekday = new Date().getDay();
  const {t} = useTranslation();

  function setMessage(text) {
    dispatch(setMessageError(text));
    setTimeout(() => {
      dispatch(setMessageOff());
    }, 5000);
  }

  async function loadActivities() {
    dispatch(setLoading());
    await readActivityListService(userId)
      .then(responseFind => {
        return responseFind.json();
      })
      .then(response => {
        setTrainingList(response.data.slice(0, limit));
        filterTrainings(response.data);
      })
      .catch(() => {
        setMessage(['system_message_workout_could_not_load_list']);
      })
      .finally(() => {
        dispatch(unsetLoading());
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
    <Container2>
      <WorkoutOfTheDay
        todayTrainings={todayTrainings}
        navigation={navigation}
      />
      <TrainingMiniList
        navigation={navigation}
        routeName={routeName}
        trainingList={trainingList}
        userId={userId}
        userSession={USERSESSION}
      />
    </Container2>
  );
}

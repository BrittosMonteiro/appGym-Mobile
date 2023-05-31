import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Container2 from '../../../../components/Container/Container';
import WorkoutOfTheDay from './WorkoutOfTheDay';
import WorkoutList from './WorkoutList';

import {readWorkoutListService} from '../../../../service/workoutService';

import {
  setLoading,
  unsetLoading,
} from '../../../../store/actions/loadingAction';
import {
  setMessageError,
  setMessageOff,
} from '../../../../store/actions/systemAction';

export default function WorkoutResume({limit, navigation, routeName, userId}) {
  const DISPATCH = useDispatch();
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
    await readWorkoutListService(userId)
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
    <Container2 gap={48}>
      <WorkoutOfTheDay
        todayTrainings={todayTrainings}
        navigation={navigation}
      />
      <WorkoutList
        navigation={navigation}
        routeName={routeName}
        trainingList={trainingList}
        userId={userId}
        userSession={USERSESSION}
      />
    </Container2>
  );
}

import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';

import HorizontalRule from '../HorizontalRule/HorizontalRule';
import ItemList from './ItemList';
import {
  ButtonDefault,
  Card,
  Container,
  ContainerTitle,
  CustomText,
} from '../../view/style';

import {readActivityListService} from '../../service/training';
import {Label, Row} from '../../view/profile/components/style';
import {useDispatch, useSelector} from 'react-redux';
import {setLoading, unsetLoading} from '../../store/actions/loadingAction';
import {setMessageError, setMessageOff} from '../../store/actions/systemAction';

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
        setMessage(`${t('system_message_workout_could_not_load_list')}`);
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
    <Container>
      {todayTrainings.length > 0 && (
        <Card>
          <Row $align={'center'} $justifyContent={'space-between'}>
            <ContainerTitle>{t('workout_of_the_day')}</ContainerTitle>
          </Row>
          <Card $black $padding $fullWidth>
            {todayTrainings.map((training, index) => (
              <React.Fragment key={index}>
                <ItemList item={training} navigation={navigation} />
                {index < todayTrainings.length - 1 && (
                  <HorizontalRule color={'#fcf3f3'} />
                )}
              </React.Fragment>
            ))}
          </Card>
        </Card>
      )}

      <Card>
        {USERSESSION.id === userId && (
          <Row $align={'center'} $justifyContent={'space-between'}>
            <ContainerTitle>{t('my_workouts')}</ContainerTitle>
            <ButtonDefault
              $turquoise
              onPress={() =>
                navigation.navigate('ManageTraining', {
                  userId,
                  idActivity: null,
                })
              }>
              <Label>{t('lbl_create_workout')}</Label>
            </ButtonDefault>
          </Row>
        )}
        <Card $black $padding $fullWidth>
          {trainingList.length > 0 ? (
            <React.Fragment>
              {trainingList.map((training, index) => (
                <React.Fragment key={index}>
                  <ItemList item={training} navigation={navigation} />
                  {index < trainingList.length - 1 && (
                    <HorizontalRule color={'#fcf3f3'} />
                  )}
                </React.Fragment>
              ))}
            </React.Fragment>
          ) : (
            <Row $align={'center'} $justifyContent={'center'}>
              <CustomText $color="#fcf3f3">
                {t('empty_workout_list')}
              </CustomText>
            </Row>
          )}
        </Card>

        {trainingList.length > 0 && routeName !== 'TrainingFullList' && (
          <Row $align={'center'} $justifyContent={'flex-start'}>
            <ButtonDefault
              onPress={() => navigation.navigate('TrainingFullList')}>
              <Label $black>{t('go_to_workouts')}</Label>
            </ButtonDefault>
          </Row>
        )}
      </Card>
    </Container>
  );
}

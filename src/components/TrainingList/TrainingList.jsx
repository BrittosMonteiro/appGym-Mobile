import React, {useEffect, useState} from 'react';

import HorizontalRule from '../HorizontalRule/HorizontalRule';
import ItemList from './ItemList';
import {ButtonDefault, Card, Container, ContainerTitle} from '../../view/style';

import {readActivityListService} from '../../service/training';
import {Label, Row} from '../../view/profile/components/style';
import {useDispatch, useSelector} from 'react-redux';
import {setLoading, unsetLoading} from '../../store/actions/loadingAction';

export default function TrainingList({userId, navigation, limit, routeName}) {
  const dispatch = useDispatch();
  const USERSESSION = useSelector(state => {
    return state.userSessionReducer;
  });
  const [trainingList, setTrainingList] = useState([]);
  const [todayTrainings, setTodayTrainings] = useState([]);
  const currentWeekday = new Date().getDay();

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
      .catch(err => {})
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
      {trainingList.length > 0 ? (
        <React.Fragment>
          {todayTrainings.length > 0 && (
            <Card>
              <Row $align={'center'} $justifyContent={'space-between'}>
                <ContainerTitle>TREINO DO DIA</ContainerTitle>
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
                <ContainerTitle>MEUS TREINOS</ContainerTitle>
                <ButtonDefault
                  $turquoise
                  onPress={() =>
                    navigation.navigate('ManageTraining', {
                      userId,
                      idActivity: null,
                    })
                  }>
                  <Label>CRIAR TREINO</Label>
                </ButtonDefault>
              </Row>
            )}
            <Card $black $padding $fullWidth>
              {trainingList.map((training, index) => (
                <React.Fragment key={index}>
                  <ItemList item={training} navigation={navigation} />
                  {index < trainingList.length - 1 && (
                    <HorizontalRule color={'#fcf3f3'} />
                  )}
                </React.Fragment>
              ))}
            </Card>
            {routeName !== 'TrainingFullList' && (
              <Row $align={'center'} $justifyContent={'flex-start'}>
                <ButtonDefault
                  onPress={() => navigation.navigate('TrainingFullList')}>
                  <Label $black>VER TODOS OS TREINOS</Label>
                </ButtonDefault>
              </Row>
            )}
          </Card>
        </React.Fragment>
      ) : null}
    </Container>
  );
}

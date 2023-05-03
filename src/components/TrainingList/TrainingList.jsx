import React, {useEffect, useState} from 'react';

import HorizontalRule from '../HorizontalRule/HorizontalRule';
import ItemList from './ItemList';
import {ButtonDefault, Card, Container, ContainerTitle} from '../../view/style';

import {readActivityListService} from '../../service/activity';
import {Label, Row} from '../../view/profile/components/style';
import {useDispatch, useSelector} from 'react-redux';
import {setLoading, unsetLoading} from '../../store/actions/loadingAction';

export default function TrainingList({userId, navigation}) {
  const dispatch = useDispatch();
  const USERSESSION = useSelector(state => {
    return state.userSessionReducer;
  });
  const [trainingList, setTrainingList] = useState([]);

  async function loadActivities() {
    dispatch(setLoading());
    await readActivityListService(userId)
      .then(responseFind => {
        return responseFind.json();
        dispatch(unsetLoading());
      })
      .then(response => {
        setTrainingList(response.data);
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

  return (
    <Container>
      {USERSESSION.id === userId && (
        <Row $align={'center'} $justifyContent={'space-between'}>
          <ContainerTitle>MEUS TREINOS</ContainerTitle>
          <ButtonDefault
            $turquoise
            onPress={() =>
              navigation.navigate('ManageTraining', {userId, idActivity: null})
            }>
            <Label>CRIAR TREINO</Label>
          </ButtonDefault>
        </Row>
      )}
      {trainingList.length > 0 ? (
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
      ) : null}
    </Container>
  );
}

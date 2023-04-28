import React, {useEffect, useState} from 'react';

import HorizontalRule from '../HorizontalRule/HorizontalRule';
import ItemList from './ItemList';
import {Card, Container, ContainerTitle} from '../../view/style';

import {readActivityListService} from '../../service/activity';

export default function TrainingList({userId, navigation}) {
  const [trainingList, setTrainingList] = useState([]);

  async function loadActivities() {
    await readActivityListService(userId)
      .then(responseFind => {
        return responseFind.json();
      })
      .then(response => {
        setTrainingList(response.data);
      })
      .catch(err => {});
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
      <ContainerTitle>MEUS TREINOS</ContainerTitle>
      {trainingList.length > 0 ? (
        <Card $black={true} $padding={true} $fullWidth={true}>
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

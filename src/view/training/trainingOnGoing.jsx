import React, {useState} from 'react';
import {useDispatch} from 'react-redux';

import ViewDefault from '../ViewDefault';
import Header from '../../components/Header/Header';
import ActivityItem from '../../components/Activity/ActivityItem';
import HorizontalRule from '../../components/HorizontalRule/HorizontalRule';
import {setLoading, unsetLoading} from '../../store/actions/loadingAction';
import {createActivityHistoryService} from '../../service/activityHistory';
import {ButtonDefault, Card, ContainerScroll} from '../style';
import {Label, Row} from '../profile/components/style';
import Timer from '../../components/Timer/Timer';

export default function TrainingOnGoing({route, navigation}) {
  const dispatch = useDispatch();
  const {training, idActivity} = route.params;
  const [items, setItems] = useState(training.items);

  async function activityFinish() {
    dispatch(setLoading());
    await createActivityHistoryService({idActivity})
      .then(() => {
        navigation.goBack();
      })
      .catch(err => {})
      .finally(() => {
        dispatch(unsetLoading());
      });
  }

  function cancel() {
    dispatch(setLoading());

    setTimeout(() => {
      dispatch(unsetLoading());
      navigation.goBack();
    }, 1000);
  }

  return (
    <ViewDefault>
      <Header title={training.title} navigation={navigation} />
      <HorizontalRule color={'#202020'} />
      <ContainerScroll contentContainerStyle={{gap: 16}}>
        {training ? (
          <React.Fragment>
            {/* <Timer /> */}
            <Row $justifyContent={'flex-end'}>
              <ButtonDefault $turquoise onPress={() => activityFinish()}>
                <Label>FINALIZAR TREINO</Label>
              </ButtonDefault>
            </Row>
            <Card $black $padding $fullWidth>
              {items.map((activity, index) => (
                <React.Fragment key={index}>
                  <ActivityItem activity={activity} />
                  {index < items.length - 1 && (
                    <HorizontalRule color={'#fcf3f3'} />
                  )}
                </React.Fragment>
              ))}
            </Card>
            <ButtonDefault $red onPress={() => cancel()}>
              <Label>CANCELAR</Label>
            </ButtonDefault>
          </React.Fragment>
        ) : null}
      </ContainerScroll>
    </ViewDefault>
  );
}

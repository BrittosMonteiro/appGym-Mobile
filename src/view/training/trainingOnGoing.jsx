import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

import ViewDefault from '../ViewDefault';
import Header from '../../components/Header/Header';
import ActivityItem from '../../components/Activity/ActivityItem';
import HorizontalRule from '../../components/HorizontalRule/HorizontalRule';
import {setLoading, unsetLoading} from '../../store/actions/loadingAction';
import {createTrainingHistoryService} from '../../service/trainingHistory';
import {Button, ContainerScroll, CustomText} from '../style';
import Timer from '../../components/Timer/Timer';
import {setMessageError, setMessageOff} from '../../store/actions/systemAction';
import Container2 from '../../components/Container/Container';

export default function TrainingOnGoing({route, navigation}) {
  const DISPATCH = useDispatch();
  const USERSESSION = useSelector(state => {
    return state.userSessionReducer;
  });
  const {training, idActivity} = route.params;
  const [items, setItems] = useState(training.items);
  const {t} = useTranslation();

  function setMessage(text) {
    DISPATCH(setMessageError(text));
    setTimeout(() => {
      DISPATCH(setMessageOff());
    }, 5000);
  }

  async function activityFinish() {
    DISPATCH(setLoading());
    await createTrainingHistoryService({idUser: USERSESSION.id, idActivity})
      .then(() => {
        navigation.goBack();
      })
      .catch(() => {
        setMessage(['system_message_default_error']);
      })
      .finally(() => {
        DISPATCH(unsetLoading());
      });
  }

  function cancel() {
    DISPATCH(setLoading());

    setTimeout(() => {
      DISPATCH(unsetLoading());
      navigation.goBack();
    }, 1000);
  }

  return (
    <ViewDefault>
      <Header title={training.title} navigation={navigation} />
      <ContainerScroll contentContainerStyle={{gap: 32}}>
        {training ? (
          <React.Fragment>
            {/* <Timer /> */}
            {/* <Row $justifyContent={'flex-end'}> */}
            <Button
              onPress={() => activityFinish()}
              $bgColor={props => props.theme.colors.turquoise_01}>
              <CustomText
                $textAlign={'center'}
                $fontSize={18}
                $weight={'SemiBold'}
                $color={props => props.theme.colors.white_02}>
                {t('lbl_finish_workout')}
              </CustomText>
            </Button>
            {/* </Row> */}
            <Container2
              bgColor={props => props.theme.colors.black_01}
              padding={'16px'}
              gap={16}>
              {items.map((activity, index) => (
                <React.Fragment key={index}>
                  <ActivityItem activity={activity} />
                  {/* <ExerciseDetail activity={activity} /> */}
                  {index < items.length - 1 && (
                    <HorizontalRule color={'#fcf3f3'} />
                  )}
                </React.Fragment>
              ))}
            </Container2>
            <Button
              onPress={() => cancel()}
              $bgColor={props => props.theme.colors.red_01}>
              <CustomText
                $textAlign={'center'}
                $fontSize={18}
                $weight={'SemiBold'}
                $color={props => props.theme.colors.white_02}>
                {t('lbl_cancel')}
              </CustomText>
            </Button>
          </React.Fragment>
        ) : null}
      </ContainerScroll>
    </ViewDefault>
  );
}

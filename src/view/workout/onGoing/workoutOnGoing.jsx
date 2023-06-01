import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

import ViewDefault from '../../ViewDefault';
import Header from '../../../components/Header/Header';
import ActivityItem from '../../../components/Activity/ActivityItem';
import HorizontalRule from '../../../components/HorizontalRule/HorizontalRule';
import {setLoading, unsetLoading} from '../../../store/actions/loadingAction';
import {createWorkoutHistoryService} from '../../../service/workoutHistory';
import {
  ButtonDefault,
  ContainerScroll,
  ContainerTitle,
  CustomText,
} from '../../style';
import Timer from '../../../components/Timer/Timer';
import {
  setMessageError,
  setMessageOff,
  setMessageSuccess,
} from '../../../store/actions/systemAction';
import Container2 from '../../../components/Container/Container';
import {getWeekNumber} from '../../../utils/dateManagement';
import {Row} from '../../profile/components/style';

export default function TrainingOnGoing({route, navigation}) {
  const DISPATCH = useDispatch();
  const USERSESSION = useSelector(state => {
    return state.userSessionReducer;
  });
  const {training, idActivity} = route.params;
  const [items, setItems] = useState(training.items);
  const [startTime, setStartTime] = useState(new Date());
  const [finishTime, setFinishTime] = useState('');
  const [isStopped, setIsStopped] = useState(false);
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

  async function activityFinish() {
    DISPATCH(setLoading());

    const diffMili = finishTime.getTime() - startTime.getTime();
    const diffSec = diffMili / 1000;
    const hours = Math.floor(diffSec / 3600);
    const minutes = Math.floor((diffSec % 3600) / 60);
    const seconds = Math.floor(diffSec % 60);
    const totalTime = `${hours >= 10 ? hours : `0${hours}`}:${
      minutes >= 10 ? minutes : `0${minutes}`
    }:${seconds >= 10 ? seconds : `0${seconds}`}`;

    const data = {
      idUser: USERSESSION.id,
      title: training.title,
      idActivity,
      weekNumber: getWeekNumber(),
      createdAt: new Date(),
      totalTime,
    };

    await createWorkoutHistoryService(data)
      .then(responseCreate => {
        if (responseCreate.status === 201) {
          return responseCreate.json();
        }
      })
      .then(() => {
        navigation.goBack();
        setSuccessMessage(['lbl_you_have_finished_workout']);
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
            <Container2 gap={16}>
              <ContainerTitle>{t('lbl_workout_description')}</ContainerTitle>
              <Container2
                bgColor={props => props.theme.colors.black_01}
                padding={'16px'}
                gap={16}>
                {items.map((activity, index) => (
                  <React.Fragment key={index}>
                    <ActivityItem activity={activity} />
                    {index < items.length - 1 && (
                      <HorizontalRule color={'#fcf3f3'} />
                    )}
                  </React.Fragment>
                ))}
              </Container2>
            </Container2>
          </React.Fragment>
        ) : null}
      </ContainerScroll>

      <Row
        $align={'center'}
        $justifyContent={'space-between'}
        style={{backgroundColor: '#202020', padding: 8, borderRadius: 4}}>
        <ButtonDefault $red onPress={() => cancel()}>
          <CustomText
            $fontSize={18}
            $weight={'SemiBold'}
            $color={props => props.theme.colors.white_02}>
            {t('lbl_cancel')}
          </CustomText>
        </ButtonDefault>
        <Timer
          finishTime={setFinishTime}
          isStopped={isStopped}
          setIsStopped={setIsStopped}
        />
        <ButtonDefault
          $turquoise
          onPress={() => isStopped && activityFinish()}
          style={!isStopped && [{opacity: 0.25}]}>
          <CustomText
            $fontSize={18}
            $weight={'SemiBold'}
            $color={props => props.theme.colors.white_02}>
            {t('lbl_finish')}
          </CustomText>
        </ButtonDefault>
      </Row>
    </ViewDefault>
  );
}

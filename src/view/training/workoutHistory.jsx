import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Header from '../../components/Header/Header';
import ViewDefault from '../ViewDefault';
import {ContainerScroll, CustomText} from '../style';
import {readWorkoutHistoryListByIdUser} from '../../service/trainingHistory';
import Container2 from '../../components/Container/Container';
import HorizontalRule from '../../components/HorizontalRule/HorizontalRule';
import WorkoutHistoryItem from './components/workoutHistoryItem';
import {setLoading, unsetLoading} from '../../store/actions/loadingAction';
import {useTranslation} from 'react-i18next';
import {setMessageError, setMessageOff} from '../../store/actions/systemAction';

export default function WorkoutHistory({navigation}) {
  const {t} = useTranslation();
  const DISPATCH = useDispatch();
  const USERSESSION = useSelector(state => {
    return state.userSessionReducer;
  });

  const [workoutHistoryList, setWorkoutHistoryList] = useState([]);

  function setMessage(text) {
    DISPATCH(setMessageError(text));
    setTimeout(() => {
      DISPATCH(setMessageOff());
    }, 5000);
  }

  async function loadWorkoutHistory() {
    DISPATCH(setLoading());
    await readWorkoutHistoryListByIdUser(USERSESSION.id)
      .then(responseFind => {
        if (responseFind.status === 200) {
          return responseFind.json();
        }
      })
      .then(response => {
        setWorkoutHistoryList(response.data);
      })
      .catch(() => {
        setMessage(['system_message_default_error']);
      })
      .finally(() => {
        DISPATCH(unsetLoading());
      });
  }

  useEffect(() => {
    loadWorkoutHistory();
  }, []);

  useEffect(() => {
    navigation.addListener('focus', () => {
      loadWorkoutHistory();
    });
  }, []);

  return (
    <ViewDefault>
      <Header navigation={navigation} title={t('lbl_workout_history')} />
      <ContainerScroll contentContainerStyle={{gap: 32}}>
        {workoutHistoryList && workoutHistoryList.length > 0 ? (
          <Container2 gap={16}>
            {workoutHistoryList.map((workout, index) => (
              <React.Fragment key={index}>
                <WorkoutHistoryItem
                  workout={workout}
                  reload={loadWorkoutHistory}
                />
                {index < workoutHistoryList.length - 1 && <HorizontalRule />}
              </React.Fragment>
            ))}
          </Container2>
        ) : (
          <CustomText $textAlign={'center'} $fontSize={18}>
            {t('lbl_workout_history_empty')}
          </CustomText>
        )}
      </ContainerScroll>
    </ViewDefault>
  );
}

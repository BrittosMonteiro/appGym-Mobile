import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

import {readWorkoutHistoryListByIdUserService} from '../../../../service/workoutHistory';
import {
  setMessageError,
  setMessageOff,
} from '../../../../store/actions/systemAction';
import {
  setLoading,
  unsetLoading,
} from '../../../../store/actions/loadingAction';

import HorizontalRule from '../../../../components/HorizontalRule/HorizontalRule';
import Container2 from '../../../../components/Container/Container';
import WorkoutHistoryItem from './WorkoutHistoryItem';
import {CustomText} from '../../../style';

export default function WorkoutHistoryList({navigation}) {
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
    await readWorkoutHistoryListByIdUserService(USERSESSION.id)
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
    <React.Fragment>
      {workoutHistoryList && workoutHistoryList.length > 0 ? (
        <Container2 gap={16}>
          {workoutHistoryList.map((workout, index) => (
            <React.Fragment key={index}>
              <WorkoutHistoryItem
                navigation={navigation}
                reload={loadWorkoutHistory}
                workout={workout}
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
    </React.Fragment>
  );
}

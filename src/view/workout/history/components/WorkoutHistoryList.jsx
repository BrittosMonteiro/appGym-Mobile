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
import {
  ContainerTitle,
  CustomText,
  InputDataDefault,
  Link,
} from '../../../style';
import {CaretRight} from 'phosphor-react-native';

export default function WorkoutHistoryList({
  navigation,
  hasSearch,
  hasTitle,
  limit,
  routeName,
}) {
  const {t} = useTranslation();
  const DISPATCH = useDispatch();
  const USERSESSION = useSelector(state => {
    return state.userSessionReducer;
  });
  const [originalList, setOriginalList] = useState([]);
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
        setOriginalList(response.data);
        setWorkoutHistoryList(response.data.slice(0, limit));
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
  }, [navigation]);

  function filterWorkoutHistory(text) {
    setWorkoutHistoryList(
      originalList.filter(
        workout =>
          workout.title.includes(text.toUpperCase()) ||
          workout.title.includes(text.toLowerCase()),
      ),
    );
  }

  return (
    <React.Fragment>
      {(routeName === 'WorkoutHistory' ||
        (routeName === 'Home' && workoutHistoryList.length > 0)) && (
        <Container2 gap={16}>
          {hasTitle && (
            <ContainerTitle>{t('lbl_workout_history')}</ContainerTitle>
          )}
          {hasSearch && (
            <InputDataDefault
              $padding={16}
              $bgColor={props => props.theme.colors.black_01}
              $color={props => props.theme.colors.white_02}
              placeholder={t('lbl_search')}
              autoCapitalize={'characters'}
              onChangeText={text => filterWorkoutHistory(text)}
            />
          )}
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

          {routeName === 'Home' && (
            <Link
              $fullWidth
              onPress={() => navigation.navigate('WorkoutHistory')}>
              <CustomText $fontSize={18}>
                {t('go_to_workout_history')}
              </CustomText>
              <CaretRight size={24} color={'#202020'} />
            </Link>
          )}
        </Container2>
      )}
    </React.Fragment>
  );
}

import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';

import Header from '../../../components/Header/Header';
import ViewDefault from '../../ViewDefault';
import Container2 from '../../../components/Container/Container';
import WorkoutGoalHistoryList from './components/WorkoutGoalHistoryList';

import {
  Button,
  ContainerScroll,
  CustomText,
  InputDataDefault,
} from '../../style';
import {Column, Row} from '../../profile/components/style';

import {
  createGoalService,
  readGoalsListService,
} from '../../../service/goalService';

import {setLoading, unsetLoading} from '../../../store/actions/loadingAction';
import {
  setMessageError,
  setMessageOff,
} from '../../../store/actions/systemAction';

export default function WorkoutGoal({navigation}) {
  const DISPATCH = useDispatch();
  const USERSESSION = useSelector(state => {
    return state.userSessionReducer;
  });
  const {t} = useTranslation();
  const [goalValue, setGoalValue] = useState(0);
  const [goalList, setGoalList] = useState([]);

  function setMessage(text) {
    DISPATCH(setMessageError(text));
    setTimeout(() => {
      DISPATCH(setMessageOff());
    }, 5000);
  }

  async function setNewGoal() {
    DISPATCH(setLoading());
    if (!goalValue) {
      DISPATCH(unsetLoading());
      return;
    }
    const data = {
      idUser: USERSESSION.id,
      value: goalValue,
      createdAt: new Date(),
    };
    await createGoalService(data)
      .then(responseCreate => {
        if (responseCreate.status === 201) {
          loadGoalList();
        }
      })
      .catch(() => {
        setMessage(['system_message_default_error']);
      })
      .finally(() => {
        DISPATCH(unsetLoading());
      });
  }

  async function loadGoalList() {
    DISPATCH(setLoading());
    await readGoalsListService(USERSESSION.id)
      .then(responseFind => {
        if (responseFind.status === 200) {
          return responseFind.json();
        }
      })
      .then(response => {
        setGoalList(response.data);
      })
      .catch(() => {
        setMessage(['system_message_default_error']);
      })
      .finally(() => {
        DISPATCH(unsetLoading());
      });
  }

  useEffect(() => {
    loadGoalList();
  }, []);

  return (
    <ViewDefault>
      <Header navigation={navigation} title={t('lbl_manage_workout_goals')} />
      <ContainerScroll
        contentContainerStyle={{
          alignItems: 'flex-start',
          gap: 32,
        }}>
        <Container2 gap={16}>
          <Row>
            <Column $gap $fullWidth>
              <CustomText $fontSize={14}>
                {t('lbl_workouts_thru_week_goal')}
              </CustomText>
              <InputDataDefault
                $fontSize={18}
                $fontWeight={'SemiBold'}
                $bgColor={props => props.theme.colors.black_01}
                $padding={16}
                $color={props => props.theme.colors.white_02}
                keyboardType={'numeric'}
                inputMode={'numeric'}
                placeholder={t('lbl_your_goal')}
                defaultValue={goalValue}
                onChangeText={number => setGoalValue(number)}
              />
              <Button
                $bgColor={props => props.theme.colors.turquoise_01}
                onPress={() => setNewGoal()}>
                <CustomText
                  $textAlign={'center'}
                  $fontSize={18}
                  $weight={'SemiBold'}
                  $color={props => props.theme.colors.white_02}>
                  {t('lbl_set_your_goal')}
                </CustomText>
              </Button>
            </Column>
          </Row>
          <WorkoutGoalHistoryList goalList={goalList} reload={loadGoalList} />
        </Container2>
      </ContainerScroll>
    </ViewDefault>
  );
}

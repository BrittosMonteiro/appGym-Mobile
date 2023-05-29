import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';

import Header from '../../components/Header/Header';
import ViewDefault from '../ViewDefault';
import {Button, ContainerScroll, CustomText, InputDataDefault} from '../style';
import Container2 from '../../components/Container/Container';
import {Column, Row} from '../profile/components/style';
import {useDispatch, useSelector} from 'react-redux';
import {
  createGoalService,
  readGoalsListService,
} from '../../service/goalService';
import GoalHistoryList from './GoalHistoryList';
import {setLoading, unsetLoading} from '../../store/actions/loadingAction';

export default function WorkoutGoal({navigation}) {
  const DISPATCH = useDispatch();
  const USERSESSION = useSelector(state => {
    return state.userSessionReducer;
  });
  const {t} = useTranslation();
  const [goalValue, setGoalValue] = useState(0);
  const [goalList, setGoalList] = useState([]);

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
      .catch(implementar => {})
      .finally(implementar => {
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
      .catch(implementar => {})
      .finally(implementar => {
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
          <GoalHistoryList goalList={goalList} reload={loadGoalList} />
        </Container2>
      </ContainerScroll>
    </ViewDefault>
  );
}

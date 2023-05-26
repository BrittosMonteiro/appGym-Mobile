import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';

import Header from '../../components/Header/Header';
import ViewDefault from '../ViewDefault';
import {Button, ContainerScroll, CustomText, InputDataDefault} from '../style';
import Container2 from '../../components/Container/Container';
import {Column, Row} from '../profile/components/style';
import {useSelector} from 'react-redux';
import {createGoalService, readGoalService} from '../../service/goalService';

export default function WorkoutGoal({navigation}) {
  const USERSESSION = useSelector(state => {
    return state.userSessionReducer;
  });
  const {t} = useTranslation();
  const [goal, setGoal] = useState('');

  async function loadGoal() {
    await readGoalService(USERSESSION.id)
      .then(responseFind => {
        return responseFind.json();
      })
      .then(response => {
        setGoal(response.data);
      })
      .catch(implementar => {})
      .finally(implementar => {});
  }

  async function setNewGoal() {
    if (!goal) return;
    const data = {
      idUser: USERSESSION.id,
      value: goal,
    };
    await createGoalService(data)
      .then(responseCreate => {
        if (responseCreate.status === 201) {
          loadGoal();
        }
      })
      .catch(implementar => {})
      .finally(implementar => {});
  }

  useEffect(() => {
    loadGoal();
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
                {t('lbl_workouts_whole_year')}
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
                defaultValue={goal}
                onChangeText={number => setGoal(number)}
              />
            </Column>
          </Row>
          <Button
            $bgColor={props => props.theme.colors.turquoise_01}
            onPress={() => setNewGoal()}>
            <CustomText
              $textAlign={'center'}
              $fontSize={18}
              $weight={'SemiBold'}
              $color={props => props.theme.colors.white_02}>
              SET GOAL
            </CustomText>
          </Button>
        </Container2>
      </ContainerScroll>
    </ViewDefault>
  );
}

import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';

import {
  Button,
  ButtonDefault,
  ContainerTitle,
  CustomText,
  Link,
} from '../../view/style';
import Container2 from '../Container/Container';
import PeriodGoal from './PeriodGoal';
import HorizontalRule from '../HorizontalRule/HorizontalRule';
import {CaretRight, Plus, ShareNetwork} from 'phosphor-react-native';
import {useSelector} from 'react-redux';
import {readGoalResumeService} from '../../service/goalService';
import {Row} from '../../view/profile/components/style';

export default function WorkoutGoal({navigation}) {
  const {t} = useTranslation();
  const USERSESSION = useSelector(state => {
    return state.userSessionReducer;
  });
  const [goalYear, setGoalYear] = useState('');
  const [goalWeek, setGoalWeek] = useState('');
  const [totalCompleted, setTotalCompleted] = useState('');
  const [totalCompletedThisWeek, setTotalCompletedThiWeek] = useState('');

  async function loadGoal() {
    await readGoalResumeService(USERSESSION.id)
      .then(responseFind => {
        return responseFind.json();
      })
      .then(response => {
        setGoalYear(response.data.yearGoal);
        setGoalWeek(response.data.weekGoal);
        setTotalCompleted(response.data.workoutsCompleted);
        setTotalCompletedThiWeek(response.data.workoutsCompletedThisWeek);
      })
      .catch(implementar => {})
      .finally(implementar => {});
  }

  useEffect(() => {
    loadGoal();
  }, []);

  useEffect(() => {
    navigation.addListener('focus', () => {
      loadGoal();
    });
  }, [navigation]);

  async function captureAndShareMyGoal() {
    try {
      const uri = await this.viewShotRef.capture();
      await Share.open({url: uri});
    } catch (error) {}
  }

  return (
    <Container2 gap={16}>
      <Row $align={'center'} $justifyContent={'space-between'}>
        <ContainerTitle>{t('lbl_workout_goals')}</ContainerTitle>
        {goalYear > 0 && (
          <ButtonDefault $black onPress={() => captureAndShareMyGoal()}>
            <ShareNetwork color={'#fcf3f3'} />
          </ButtonDefault>
        )}
      </Row>
      {goalYear > 0 ? (
        <ViewShot ref={ref => (this.viewShotRef = ref)}>
          <Container2 gap={16} bgColor={'#202020'} padding={'16px'}>
            <React.Fragment>
              <PeriodGoal
                period={t('lbl_year')}
                total={goalYear}
                done={totalCompleted}
                hasBar={true}
              />
              <HorizontalRule color={'#FCF3F3'} />
              <PeriodGoal
                period={t('lbl_week')}
                total={goalWeek}
                done={totalCompletedThisWeek}
                hasBar={true}
              />
              <HorizontalRule color={'#FCF3F3'} />
              <PeriodGoal
                period={t('lbl_workouts_completed')}
                total={totalCompleted}
              />
            </React.Fragment>
          </Container2>
        </ViewShot>
      ) : (
        <Row $justifyContent={'center'}>
          <CustomText $fontSize={16}>{t('lbl_no_goal_set')}</CustomText>
          <Button
            $bgColor={props => props.theme.colors.black_01}
            onPress={() => navigation.navigate('WorkoutGoal')}>
            <Plus color={'#fcf3f3'} size={24} weight={'regular'} />
            <CustomText
              $fontSize={18}
              $color={props => props.theme.colors.white_02}>
              {t('lbl_set_your_goal')}
            </CustomText>
          </Button>
        </Row>
      )}
      {goalYear > 0 && (
        <Link $fullWidth onPress={() => navigation.navigate('WorkoutGoal')}>
          <CustomText $fontSize={18}>
            {t('go_to_manage_workout_goals')}
          </CustomText>
          <CaretRight size={24} color={'#202020'} />
        </Link>
      )}
    </Container2>
  );
}

import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';

import {ContainerTitle, CustomText, Link} from '../../view/style';
import Container2 from '../Container/Container';
import PeriodGoal from './PeriodGoal';
import HorizontalRule from '../HorizontalRule/HorizontalRule';
import {CaretRight} from 'phosphor-react-native';
import {useSelector} from 'react-redux';
import {readGoalResumeService} from '../../service/goalService';

export default function WorkoutGoal({navigation}) {
  const {t} = useTranslation();
  const USERSESSION = useSelector(state => {
    return state.userSessionReducer;
  });
  const [goalYear, setGoalYear] = useState('');
  const [goalWeek, setGoalWeek] = useState('');
  const [totalCompleted, setTotalCompleted] = useState('');

  async function loadGoal() {
    await readGoalResumeService(USERSESSION.id)
      .then(responseFind => {
        return responseFind.json();
      })
      .then(response => {
        setGoalYear(response.data.yearGoal);
        setGoalWeek(response.data.weekGoal);
        setTotalCompleted(response.data.workoutsCompleted);
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

  return (
    <Container2 gap={16}>
      <ContainerTitle>{t('lbl_workout_goals')}</ContainerTitle>
      {goalYear > 0 ? (
        <Container2 gap={16} bgColor={'#202020'} padding={'16px'}>
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
            done={totalCompleted}
            hasBar={true}
          />
          <HorizontalRule color={'#FCF3F3'} />
          <PeriodGoal
            period={t('lbl_workouts_completed')}
            total={totalCompleted}
          />
        </Container2>
      ) : (
        ''
      )}
      <Link $fullWidth onPress={() => navigation.navigate('WorkoutGoal')}>
        <CustomText $fontSize={18}>
          {t('go_to_manage_workout_goals')}
        </CustomText>
        <CaretRight size={24} color={'#202020'} />
      </Link>
    </Container2>
  );
}

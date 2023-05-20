import {useTranslation} from 'react-i18next';

import {Row} from '../../view/profile/components/style';
import {ButtonDefault, ContainerTitle, CustomText} from '../../view/style';
import Container2 from '../Container/Container';

export default function WorkoutDays({workoutDays, manageWorkoutDays}) {
  const {t} = useTranslation();
  const WEEKDAYS = [
    {
      id: 0,
      title: `${t('lbl_sunday')}`,
    },
    {
      id: 1,
      title: `${t('lbl_monday')}`,
    },
    {
      id: 2,
      title: `${t('lbl_tuesday')}`,
    },
    {
      id: 3,
      title: `${t('lbl_wednesday')}`,
    },
    {
      id: 4,
      title: `${t('lbl_thursday')}`,
    },
    {
      id: 5,
      title: `${t('lbl_friday')}`,
    },
    {
      id: 6,
      title: `${t('lbl_saturday')}`,
    },
    {
      id: 7,
      title: `${t('lbl_everyday')}`,
    },
  ];

  function isSelected(index) {
    const verify = workoutDays.indexOf(index);
    if (verify !== -1) return true;
  }

  return (
    <Container2 gap={16}>
      <ContainerTitle>{t('title_days_to_workout')}</ContainerTitle>
      <Container2
        gap={16}
        padding={'16px'}
        bgColor={props => props.theme.colors.black_01}>
        <Row>
          {WEEKDAYS.map((day, index) => (
            <ButtonDefault
              key={index}
              onPress={() => manageWorkoutDays(index)}
              $turquoise={isSelected(day.id)}>
              <CustomText $color={props => props.theme.colors.white_02}>
                {day.title}
              </CustomText>
            </ButtonDefault>
          ))}
        </Row>
      </Container2>
    </Container2>
  );
}

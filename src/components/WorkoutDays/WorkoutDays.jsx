import {useTranslation} from 'react-i18next';

import {Label, Row} from '../../view/profile/components/style';
import {ButtonDefault, Card, CustomText} from '../../view/style';

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
    <Card $black $fullWidth $padding>
      <CustomText $color={'#fcf3f3'} $fontSize={18} $weight={'Medium'}>
        {t('title_days_to_workout')}
      </CustomText>
      <Row>
        {WEEKDAYS.map((day, index) => (
          <ButtonDefault
            key={index}
            onPress={() => manageWorkoutDays(index)}
            $turquoise={isSelected(day.id)}>
            <Label>{day.title}</Label>
          </ButtonDefault>
        ))}
      </Row>
    </Card>
  );
}

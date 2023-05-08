import {useState} from 'react';
import {Label, Row} from '../../view/profile/components/style';
import {ButtonDefault, Card, CustomText} from '../../view/style';

export default function WorkoutDays({workoutDays, manageWorkoutDays}) {
  const WEEKDAYS = [
    {
      id: 0,
      title: 'DOMINGO',
    },
    {
      id: 1,
      title: 'SEGUNDA',
    },
    {
      id: 2,
      title: 'TERÇA',
    },
    {
      id: 3,
      title: 'QUARTA',
    },
    {
      id: 4,
      title: 'QUINTA',
    },
    {
      id: 5,
      title: 'SEXTA',
    },
    {
      id: 6,
      title: 'SÁBADO',
    },
    {
      id: 7,
      title: 'TODOS',
    },
  ];

  function isSelected(index) {
    const verify = workoutDays.indexOf(index);
    if (verify !== -1) return true;
  }

  return (
    <Card $black $fullWidth $padding>
      <CustomText $color={'#fcf3f3'} $fontSize={18} $weight={'Medium'}>
        QUAIS DIAS VOCÊ QUER TREINAR?
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

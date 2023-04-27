import React from 'react';

import {Container, ContainerWeek} from './weekPerformance_style';
import {ContainerTitle} from '../../view/style';
import Weekday from './Weekday';

export default function WeekPerformance({navigation}) {
  const week = [
    {
      weekday: 'D',
      monthday: 23,
    },
    {
      weekday: 'S',
      monthday: 24,
    },
    {
      weekday: 'T',
      monthday: 25,
    },
    {
      weekday: 'Q',
      monthday: 26,
    },
    {
      weekday: 'Q',
      monthday: 27,
    },
    {
      weekday: 'S',
      monthday: 28,
    },
    {
      weekday: 'S',
      monthday: 29,
    },
  ];

  return (
    <Container>
      <ContainerTitle>DESEMPENHO SEMANAL</ContainerTitle>
      <ContainerWeek>
        {week.map((day, index) => (
          <Weekday day={day} navigation={navigation} key={index} />
        ))}
      </ContainerWeek>
    </Container>
  );
}

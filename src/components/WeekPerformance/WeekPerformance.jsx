import React, {useEffect, useState} from 'react';

import {Container, ContainerWeek} from './weekPerformance_style';
import {ContainerTitle} from '../../view/style';
import Weekday from './Weekday';

export default function WeekPerformance({navigation}) {
  const week = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
  const [currentWeek, setCurrentWeek] = useState([]);

  function getCurrentWeek(current) {
    var week = new Array();

    // Starting Sunday
    current.setDate(current.getDate() - current.getDay());
    for (var i = 0; i < 7; i++) {
      week.push(new Date(current).getDate());
      current.setDate(current.getDate() + 1);
    }
    setCurrentWeek(week);
  }

  useEffect(() => {
    getCurrentWeek(new Date());
  }, []);

  return (
    <Container>
      <ContainerTitle>DESEMPENHO SEMANAL</ContainerTitle>
      <ContainerWeek>
        {week.map((day, index) => (
          <Weekday
            day={day}
            monthDate={currentWeek[index]}
            isToday={new Date().getDate() === currentWeek[index]}
            navigation={navigation}
            key={index}
          />
        ))}
      </ContainerWeek>
    </Container>
  );
}

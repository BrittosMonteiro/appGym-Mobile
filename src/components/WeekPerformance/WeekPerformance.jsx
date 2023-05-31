import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';

import {Container, ContainerWeek} from './weekPerformance_style';
import Weekday from './Weekday';

export default function WeekPerformance({navigation}) {
  const {t} = useTranslation();
  const week = [
    `${t('lbl_sunday_shorthand')}`,
    `${t('lbl_monday_shorthand')}`,
    `${t('lbl_tuesday_shorthand')}`,
    `${t('lbl_wednesday_shorthand')}`,
    `${t('lbl_thursday_shorthand')}`,
    `${t('lbl_friday_shorthand')}`,
    `${t('lbl_saturday_shorthand')}`,
  ];
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

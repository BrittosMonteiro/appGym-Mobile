import React from 'react';

import HorizontalRule from '../HorizontalRule/HorizontalRule';
import {Day, WeekdayNameAndNumber} from './weekPerformance_style';

export default function Weekday({day, monthDate, isToday}) {
  return (
    <Day $isToday={isToday}>
      <WeekdayNameAndNumber $isToday={isToday}>{day}</WeekdayNameAndNumber>
      <HorizontalRule color={isToday ? '#fcf3f3' : '#202020'} />
      <WeekdayNameAndNumber $isToday={isToday}>
        {monthDate}
      </WeekdayNameAndNumber>
    </Day>
  );
}

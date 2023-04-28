import React, {useState} from 'react';

import HorizontalRule from '../HorizontalRule/HorizontalRule';
import {Day, WeekdayNameAndNumber} from './weekPerformance_style';

export default function Weekday({day, monthDate, isToday, navigation}) {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <Day
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      isToday={isToday || isPressed}>
      <WeekdayNameAndNumber isToday={isToday}>{day}</WeekdayNameAndNumber>
      <HorizontalRule color={isToday || isPressed ? '#202020' : '#fff3f3'} />
      <WeekdayNameAndNumber isToday={isToday}>{monthDate}</WeekdayNameAndNumber>
    </Day>
  );
}

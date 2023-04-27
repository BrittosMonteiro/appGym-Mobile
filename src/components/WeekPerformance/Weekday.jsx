import React, {useState} from 'react';

import HorizontalRule from '../HorizontalRule/HorizontalRule';
import {Day, WeekdayNameAndNumber} from './weekPerformance_style';

export default function Weekday({day, navigation}) {
  const [isPressed, setIsPressed] = useState(false);

  const today = new Date().getDate();

  return (
    <Day
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      isToday={today === day.monthday || isPressed}>
      <WeekdayNameAndNumber isToday={today === day.monthday}>
        {day.weekday}
      </WeekdayNameAndNumber>
      <HorizontalRule
        color={today === day.monthday || isPressed ? '#202020' : '#fff3f3'}
      />
      <WeekdayNameAndNumber isToday={today === day.monthday}>
        {day.monthday}
      </WeekdayNameAndNumber>
    </Day>
  );
}

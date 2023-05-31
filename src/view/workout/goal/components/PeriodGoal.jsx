import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Column, Row} from '../../../profile/components/style';
import {CustomText} from '../../../style';
import {useTranslation} from 'react-i18next';

export default function PeriodGoal({period, total, done, hasBar}) {
  const [workoutDone, setWorkoutDone] = useState(0);
  const {t} = useTranslation();

  useEffect(() => {
    if (done) {
      setWorkoutDone((done / total) * 100);
    }
  }, [done]);

  return (
    <Row>
      <Column $gap $fullWidth>
        <CustomText $fontSize={18} $color={'#fcf3f3'}>
          {period}
        </CustomText>
        {hasBar && (
          <React.Fragment>
            <View
              style={{
                width: '100%',
                height: 10,
                backgroundColor: '#00A1AB',
                borderRadius: 10,
              }}
            />
            {!done ? (
              ''
            ) : (
              <View
                style={{
                  width: `${workoutDone}%`,
                  maxWidth: '100%',
                  height: 10,
                  backgroundColor: '#FE7A71',
                  borderRadius: 10,
                }}
              />
            )}
          </React.Fragment>
        )}
        <Row $align={'center'}>
          <CustomText $fontSize={32} $weight={'SemiBold'} $color={'#fcf3f3'}>
            {total}
            {!done ? null : (
              <CustomText $fontSize={18} $weight={'Regular'} $color={'#fcf3f3'}>
                {workoutDone >= 100
                  ? `/${done} - ${t('lbl_goal_achieved')}`
                  : `/${workoutDone.toFixed(2)}%`}
              </CustomText>
            )}
          </CustomText>
        </Row>
      </Column>
    </Row>
  );
}

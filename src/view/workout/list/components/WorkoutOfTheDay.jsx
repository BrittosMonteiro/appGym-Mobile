import React from 'react';
import {useTranslation} from 'react-i18next';

import Container from '../../../../components/Container/Container';
import HorizontalRule from '../../../../components/HorizontalRule/HorizontalRule';
import ItemList from './ItemList';

import {ContainerTitle} from '../../../style';

export default function WorkoutOfTheDay({todayTrainings, navigation}) {
  const {t} = useTranslation();

  return (
    <React.Fragment>
      {todayTrainings.length > 0 && (
        <Container gap={16}>
          <ContainerTitle>{t('workout_of_the_day')}</ContainerTitle>
          <Container
            padding={'16px'}
            bgColor={props => props.theme.colors.salmon}
            gap={16}>
            {todayTrainings.map((training, index) => (
              <React.Fragment key={index}>
                <ItemList item={training} navigation={navigation} />
                {index < todayTrainings.length - 1 && (
                  <HorizontalRule color={'#fcf3f3'} />
                )}
              </React.Fragment>
            ))}
          </Container>
        </Container>
      )}
    </React.Fragment>
  );
}

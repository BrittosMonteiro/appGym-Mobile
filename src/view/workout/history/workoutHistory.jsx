import React from 'react';
import Header from '../../../components/Header/Header';
import ViewDefault from '../../ViewDefault';
import {ContainerScroll} from '../../style';
import {useTranslation} from 'react-i18next';
import WorkoutHistoryList from './components/WorkoutHistoryList';

export default function WorkoutHistory({navigation}) {
  const {t} = useTranslation();

  return (
    <ViewDefault>
      <Header navigation={navigation} title={t('lbl_workout_history')} />
      <ContainerScroll contentContainerStyle={{gap: 32}}>
        <WorkoutHistoryList navigation={navigation} />
      </ContainerScroll>
    </ViewDefault>
  );
}

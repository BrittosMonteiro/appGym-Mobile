import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

import ViewDefault from '../ViewDefault';
import Header from '../../components/Header/Header';
import HorizontalRule from '../../components/HorizontalRule/HorizontalRule';
import {ContainerScroll} from '../style';
import TrainingList from '../../components/TrainingList/TrainingList';

export default function TrainingFullList({navigation, route}) {
  const USERSESSION = useSelector(state => {
    return state.userSessionReducer;
  });
  const {t} = useTranslation();

  return (
    <ViewDefault>
      <Header navigation={navigation} title={t('title_workouts')} />
      <HorizontalRule color={'#202020'} />
      <ContainerScroll
        contentContainerStyle={{
          alignItems: 'flex-start',
          gap: 24,
        }}>
        <TrainingList
          navigation={navigation}
          routeName={route.name}
          userId={USERSESSION.id}
        />
      </ContainerScroll>
    </ViewDefault>
  );
}

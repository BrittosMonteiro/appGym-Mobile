import {useSelector} from 'react-redux';

import ViewDefault from '../ViewDefault';
import HeaderStart from '../../components/Header/HeaderStart';
import WeekPerformance from '../../components/WeekPerformance/WeekPerformance';
import HorizontalRule from '../../components/HorizontalRule/HorizontalRule';
import TrainingList from '../../components/TrainingList/TrainingList';
import {ContainerScroll} from '../style';

export default function Home({navigation}) {
  const USERSESSION = useSelector(state => {
    return state.userSessionReducer;
  });

  return (
    <ViewDefault>
      <HeaderStart navigation={navigation} />
      <HorizontalRule color={'#202020'} />
      <ContainerScroll
        contentContainerStyle={{alignItems: 'flex-start', gap: 24}}>
        {/* <WeekPerformance /> */}
        <TrainingList
          limit={5}
          navigation={navigation}
          userId={USERSESSION.id}
        />
      </ContainerScroll>
    </ViewDefault>
  );
}

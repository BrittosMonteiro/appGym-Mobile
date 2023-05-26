import {useSelector} from 'react-redux';

import ViewDefault from '../ViewDefault';
import HeaderStart from '../../components/Header/HeaderStart';
import WeekPerformance from '../../components/WeekPerformance/WeekPerformance';
import TrainingList from '../../components/TrainingList/TrainingList';
import {ContainerScroll} from '../style';
import WorkoutGoal from '../../components/WorkoutGoal/WorkoutGoal';

export default function Home({navigation, route}) {
  const USERSESSION = useSelector(state => {
    return state.userSessionReducer;
  });

  return (
    <ViewDefault>
      <HeaderStart navigation={navigation} />
      <ContainerScroll
        contentContainerStyle={{alignItems: 'flex-start', gap: 32}}>
        <WeekPerformance />
        <TrainingList
          limit={5}
          navigation={navigation}
          userId={USERSESSION.id}
          routeName={route.name}
        />
        <WorkoutGoal navigation={navigation} />
      </ContainerScroll>
    </ViewDefault>
  );
}

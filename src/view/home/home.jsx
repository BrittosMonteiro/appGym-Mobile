import {useSelector} from 'react-redux';

import ViewDefault from '../ViewDefault';
import HeaderStart from '../../components/Header/HeaderStart';
import WeekPerformance from '../../components/WeekPerformance/WeekPerformance';
import WorkoutResume from '../workout/list/components/WorkoutListResume';
import {ContainerScroll} from '../style';
import WorkoutGoalResume from '../workout/goal/components/WorkoutGoalResume';
import WorkoutHistoryList from '../workout/history/components/WorkoutHistoryList';

export default function Home({navigation, route}) {
  const USERSESSION = useSelector(state => {
    return state.userSessionReducer;
  });

  return (
    <ViewDefault>
      <HeaderStart navigation={navigation} />
      <ContainerScroll
        contentContainerStyle={{alignItems: 'flex-start', gap: 48}}>
        <WeekPerformance />
        <WorkoutResume
          limit={5}
          navigation={navigation}
          userId={USERSESSION.id}
          routeName={route.name}
        />
        <WorkoutHistoryList
          navigation={navigation}
          hasTitle
          limit={3}
          routeName={route.name}
        />
        <WorkoutGoalResume navigation={navigation} />
      </ContainerScroll>
    </ViewDefault>
  );
}

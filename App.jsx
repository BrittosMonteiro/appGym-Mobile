import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';

const Stack = createNativeStackNavigator();
import {navigationRef} from './src/utils/RootNavigation';

// Common
import Sidebar from './src/components/Sidebar';
import ModalLoading from './src/components/ModalLoading';

// Views
import Login from './src/view/login/login';
import CreateGymAccount from './src/view/login/createGymAccount';
import Home from './src/view/home/home';
import Profile from './src/view/profile/profile';
import TrainingDetail from './src/view/training/trainingDetail';
import TrainingOnGoing from './src/view/training/trainingOnGoing';

// Views - Pending
import PaymentHistory from './src/view/user/paymentHistory';
import Instructors from './src/view/gym/instructors';
import ManageInstructor from './src/view/gym/manageInstructor';
import Users from './src/view/instructor/users';
import ManageUser from './src/view/instructor/manageUser';
import ManageActivity from './src/view/instructor/manageActivity';
import PlanList from './src/view/gym/planList';
import PlanManagement from './src/view/gym/planManagement';
import UserPlanSelect from './src/view/instructor/userPlanSelect';

export default function App() {
  const sidebarState = useSelector(state => {
    return state.sidebarReducer;
  });

  return (
    <>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="CreateGymAccount" component={CreateGymAccount} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="TrainingDetail" component={TrainingDetail} />
          <Stack.Screen name="TrainingOnGoing" component={TrainingOnGoing} />
          <Stack.Screen name="Profile" component={Profile} />

          <Stack.Screen name="PaymentHistory" component={PaymentHistory} />
          <Stack.Screen name="Instructors" component={Instructors} />
          <Stack.Screen name="ManageInstructor" component={ManageInstructor} />
          <Stack.Screen name="PlanList" component={PlanList} />
          <Stack.Screen name="PlanManagement" component={PlanManagement} />
          <Stack.Screen name="Users" component={Users} />
          <Stack.Screen name="ManageUser" component={ManageUser} />
          <Stack.Screen name="ManageActivity" component={ManageActivity} />
          <Stack.Screen name="UserPlanSelect" component={UserPlanSelect} />
        </Stack.Navigator>
        <Sidebar open={sidebarState} />
        <ModalLoading />
      </NavigationContainer>
    </>
  );
}

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';

const Stack = createNativeStackNavigator();
import {navigationRef} from './src/utils/RootNavigation';

// Common
import Sidebar from './src/components/Sidebar';
import ModalLoading from './src/components/ModalLoading';

// Access
import Login from './src/view/login/login';
import CreateGymAccount from './src/view/login/createGymAccount';

// Users
import Dashboard from './src/view/user/dashboard';
import ActivityDetail from './src/view/user/activityDetail';
import ActivityCurrent from './src/view/user/activityCurrent';
import Profile from './src/view/user/profile';
import PaymentHistory from './src/view/user/paymentHistory';

// Gym admin
import Instructors from './src/view/gym/instructors';
import ManageInstructor from './src/view/gym/manageInstructor';

// Instructors
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
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="ActivityDetail" component={ActivityDetail} />
          <Stack.Screen name="ActivityCurrent" component={ActivityCurrent} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="PaymentHistory" component={PaymentHistory} />

          <Stack.Screen name="GymProfile" component={Profile} />
          <Stack.Screen name="Instructors" component={Instructors} />
          <Stack.Screen name="ManageInstructor" component={ManageInstructor} />
          <Stack.Screen name="PlanList" component={PlanList} />
          <Stack.Screen name="PlanManagement" component={PlanManagement} />

          <Stack.Screen name="ProfileInstructor" component={Profile} />
          <Stack.Screen name="Users" component={Users} />
          <Stack.Screen name="ManageUser" component={ManageUser} />
          <Stack.Screen name="ManageActivity" component={ManageActivity} />
          <Stack.Screen name="UserPlanSelect" component={UserPlanSelect} />

          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="CreateGymAccount" component={CreateGymAccount} />
        </Stack.Navigator>
        <Sidebar open={sidebarState} />
        <ModalLoading />
      </NavigationContainer>
    </>
  );
}

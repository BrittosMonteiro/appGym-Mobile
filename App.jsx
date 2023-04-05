import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import Dashboard from './src/view/user/dashboard';
import ActivityDetail from './src/view/user/activityDetail';
import ActivityCurrent from './src/view/user/activityCurrent';
import Profile from './src/view/user/profile';
import PaymentHistory from './src/view/user/paymentHistory';
import Sidebar from './src/components/Sidebar';
import {useSelector} from 'react-redux';

import {navigationRef} from './src/utils/RootNavigation';
import GymProfile from './src/view/gym/profile';
import Instructors from './src/view/gym/instructors';
import Users from './src/view/gym/users';
import ManageInstructor from './src/view/gym/manageInstructor';
import ManageUser from './src/view/gym/manageUser';
import ModalLoading from './src/components/ModalLoading';
import ManageActivity from './src/view/gym/manageActivity';
import Login from './src/view/login/login';
import CreateUserAccount from './src/view/login/createUserAccount';
import CreateGymAccount from './src/view/login/createGymAccount';

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

          <Stack.Screen name="GymProfile" component={GymProfile} />
          <Stack.Screen name="Instructors" component={Instructors} />
          <Stack.Screen name="ManageInstructor" component={ManageInstructor} />
          <Stack.Screen name="Users" component={Users} />
          <Stack.Screen name="ManageUser" component={ManageUser} />
          <Stack.Screen name="ManageActivity" component={ManageActivity} />

          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen
            name="CreateUserAccount"
            component={CreateUserAccount}
          />
          <Stack.Screen name="CreateGymAccount" component={CreateGymAccount} />
        </Stack.Navigator>
        <Sidebar open={sidebarState} />
        <ModalLoading />
      </NavigationContainer>
    </>
  );
}

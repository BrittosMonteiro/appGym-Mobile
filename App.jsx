import {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18next from 'i18next';

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

import WorkoutDetail from './src/view/workout/detail/workoutDetail';
import WorkoutHistory from './src/view/workout/history/workoutHistory';
import WorkoutFullList from './src/view/workout/list/workoutFullList';
import WorkoutManagement from './src/view/workout/manage/workoutManagement';
import WorkoutOnGoing from './src/view/workout/onGoing/workoutOnGoing';
import WorkoutGoal from './src/view/workout/goal/workoutGoal';

import Instructors from './src/view/instructors/instructors';
import ManageInstructor from './src/view/instructors/manageInstructor';
import PlanList from './src/view/plan/planList';
import PlanManagement from './src/view/plan/planManagement';
import Users from './src/view/users/users';
import ManageUser from './src/view/users/manageUser';
import UserPlanSelect from './src/view/users/userPlanSelect';
import PaymentHistory from './src/view/payment/paymentHistory';
import SystemMessage from './src/components/SystemMessage/SystemMessage';
import AdminHome from './src/view/admin/adminHome';
import ExercisesList from './src/view/admin/exercise/exercisesList';
import CategoriesList from './src/view/admin/category/categoriesList';

export default function App() {
  const sidebarState = useSelector(state => {
    return state.sidebarReducer;
  });

  const verifySystemLanguage = () => {
    AsyncStorage.getItem('SYSTEM_LANGUAGE')
      .then(systemLanguage => {
        const hasLanguage = JSON.parse(systemLanguage);
        if (hasLanguage !== null) {
          i18next.changeLanguage(hasLanguage.code);
        } else {
          AsyncStorage.setItem(
            'SYSTEM_LANGUAGE',
            JSON.stringify({code: 'en', language: 'English', index: 0}),
          );
          i18next.changeLanguage('en');
        }
      })
      .catch(() => {
        AsyncStorage.setItem(
          'SYSTEM_LANGUAGE',
          JSON.stringify({code: 'en', language: 'English', index: 0}),
        );
        i18next.changeLanguage('en');
      });
  };

  useEffect(() => {
    verifySystemLanguage();
  }, []);

  return (
    <>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="CreateGymAccount" component={CreateGymAccount} />
          <Stack.Screen name="Home" component={Home} />

          <Stack.Screen name="WorkoutDetail" component={WorkoutDetail} />
          <Stack.Screen name="WorkoutFullList" component={WorkoutFullList} />
          <Stack.Screen name="WorkoutGoal" component={WorkoutGoal} />
          <Stack.Screen name="WorkoutHistory" component={WorkoutHistory} />
          <Stack.Screen
            name="WorkoutManagement"
            component={WorkoutManagement}
          />
          <Stack.Screen name="WorkoutOnGoing" component={WorkoutOnGoing} />

          <Stack.Screen name="Profile" component={Profile} />

          <Stack.Screen name="AdminHome" component={AdminHome} />
          <Stack.Screen name="ExercisesList" component={ExercisesList} />
          <Stack.Screen name="CategoriesList" component={CategoriesList} />

          <Stack.Screen name="PaymentHistory" component={PaymentHistory} />
          <Stack.Screen name="Instructors" component={Instructors} />
          <Stack.Screen name="ManageInstructor" component={ManageInstructor} />
          <Stack.Screen name="PlanList" component={PlanList} />
          <Stack.Screen name="PlanManagement" component={PlanManagement} />
          <Stack.Screen name="Users" component={Users} />
          <Stack.Screen name="ManageUser" component={ManageUser} />
          <Stack.Screen name="UserPlanSelect" component={UserPlanSelect} />
        </Stack.Navigator>
        <Sidebar open={sidebarState} />
        <ModalLoading />
        <SystemMessage />
      </NavigationContainer>
    </>
  );
}

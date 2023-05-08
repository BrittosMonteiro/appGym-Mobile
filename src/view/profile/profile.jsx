import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ViewDefault from '../ViewDefault';
import HorizontalRule from '../../components/HorizontalRule/HorizontalRule';
import Header from '../../components/Header/Header';
import HeaderStart from '../../components/Header/HeaderStart';
import Plan from './components/profilePlan';
import ProfilePassword from './components/profilePassword';
import ProfileData from './components/profileData';

import {ButtonDefault, ContainerScroll} from '../style';

import {readUserByIdService, updateUserService} from '../../service/user';
import {setLoading, unsetLoading} from '../../store/actions/loadingAction';
import {Label} from './components/style';

export default function Profile({navigation}) {
  const DISPATCH = useDispatch();
  const USERSESSION = useSelector(state => {
    return state.userSessionReducer;
  });
  const [plan, setPlan] = useState('');
  const [userData, setUserData] = useState('');

  async function loadProfile() {
    DISPATCH(setLoading());
    await readUserByIdService(USERSESSION.id)
      .then(responseFind => {
        if (responseFind.status === 200) {
          return responseFind.json();
        }
      })
      .then(response => {
        setPlan(response.data.plan);
        setUserData(response.data);
      })
      .catch(err => {})
      .finally(() => {
        DISPATCH(unsetLoading());
      });
  }

  async function updateUser(updateData) {
    DISPATCH(setLoading());
    await updateUserService(updateData)
      .then(responseUpdate => {
        if (responseUpdate.status === 200) {
          loadProfile();
        }
      })
      .catch(err => {})
      .finally(() => {
        DISPATCH(unsetLoading());
      });
  }

  async function logout() {
    try {
      const storedData = await AsyncStorage.removeItem('USERSESSION');
      if (!storedData) {
        navigation.reset({
          index: 0,
          routes: [{name: 'Login'}],
        });
        return;
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    loadProfile();
  }, []);

  return (
    <ViewDefault>
      {USERSESSION.userLevel === 3 ? (
        <Header navigation={navigation} title={'PERFIL'} />
      ) : (
        <HeaderStart />
      )}
      <HorizontalRule color={'#202020'} />
      <ContainerScroll contentContainerStyle={{gap: 16}}>
        <ProfileData userData={userData} updateProfile={updateUser} />
        {plan && <Plan plan={plan} />}
        <ProfilePassword />
        <ButtonDefault $red onPress={() => logout()}>
          <Label>SAIR</Label>
        </ButtonDefault>
      </ContainerScroll>
    </ViewDefault>
  );
}

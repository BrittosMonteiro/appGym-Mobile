import {useEffect, useState} from 'react';
import {Pressable, ScrollView, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../styles';

import ViewDefault from '../ViewDefault';

import Header from '../../components/Header';
import HeaderStart from '../../components/HeaderStart';

import Plan from './components/profilePlan';
import ProfilePassword from './components/profilePassword';
import ProfileData from './components/profileData';

import HorizontalRule from '../../components/HorizontalRule';
import Button from '../../components/Button';

import {readUserByIdService, updateUserService} from '../../service/user';
import {setLoading, unsetLoading} from '../../store/actions/loadingAction';

export default function Profile({navigation}) {
  const dispatch = useDispatch();
  const userSession = useSelector(state => {
    return state.userSessionReducer;
  });
  const [plan, setPlan] = useState('');
  const [userData, setUserData] = useState('');

  async function loadProfile() {
    dispatch(setLoading());
    await readUserByIdService(userSession.id)
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
        dispatch(unsetLoading());
      });
  }

  async function updateUser(updateData) {
    dispatch(setLoading());
    await updateUserService(updateData)
      .then(responseUpdate => {
        if (responseUpdate.status === 200) {
          loadProfile();
        }
      })
      .catch(err => {})
      .finally(() => {
        dispatch(unsetLoading());
      });
  }

  async function logout() {
    try {
      const storedData = await AsyncStorage.removeItem('userSession');
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
      {userSession.userLevel === 3 ? (
        <Header navigation={navigation} title={'PERFIL'} />
      ) : (
        <HeaderStart />
      )}
      <ScrollView
        contentContainerStyle={[
          styles.main.column,
          styles.paddingStyle.px_3,
          styles.gapStyle.gap_5,
        ]}>
        <ProfileData userData={userData} updateProfile={updateUser} />

        <HorizontalRule />

        {plan && <Plan plan={plan} />}

        <ProfilePassword />

        <Pressable onPress={() => logout()}>
          <Button title={'SAIR'} type={2} />
        </Pressable>
      </ScrollView>
    </ViewDefault>
  );
}

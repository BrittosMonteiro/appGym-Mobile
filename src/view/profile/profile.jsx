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

import {readUserByIdService} from '../../service/user';
import {setLoading, unsetLoading} from '../../store/actions/loadingAction';

export default function Profile({navigation}) {
  const dispatch = useDispatch();
  const userSession = useSelector(state => {
    return state.userSessionReducer;
  });

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [shortName, setShortName] = useState('');
  const [username, setUsername] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [cpf, setCpf] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [cref, setCref] = useState('');
  const [gymName, setGymName] = useState('');
  const [plan, setPlan] = useState('');
  const [planValidDate, setPlanValidDate] = useState('');

  async function loadProfile() {
    dispatch(setLoading());
    await readUserByIdService(userSession.id)
      .then(responseFind => {
        if (responseFind.status === 200) {
          return responseFind.json();
        }
      })
      .then(response => {
        setName(response.data.name);
        setEmail(response.data.email);
        setUsername(response.data.username);

        setCpf(response.data.cpf);
        setGymName(response.data.gym);
        setBirthdate(response.data.birthdate);
        setPlan(response.data.plan);
        setPlanValidDate(response.data.planValidDate);
        setShortName(response.data.shortName);
        setCnpj(response.data.cnpj);
        setCref(response.data.cref);
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
        <ProfileData
          birthdate={birthdate}
          cnpj={cnpj}
          cpf={cpf}
          cref={cref}
          email={email}
          gymName={gymName}
          name={name}
          shortName={shortName}
          username={username}
        />

        <HorizontalRule />

        {plan && <Plan plan={plan} planValidDate={planValidDate} />}

        <ProfilePassword />

        <Pressable onPress={() => logout()}>
          <Button title={'SAIR'} type={2} />
        </Pressable>
      </ScrollView>
    </ViewDefault>
  );
}

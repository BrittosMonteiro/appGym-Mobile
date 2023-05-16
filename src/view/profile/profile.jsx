import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTranslation} from 'react-i18next';

import ViewDefault from '../ViewDefault';
import HorizontalRule from '../../components/HorizontalRule/HorizontalRule';
import Header from '../../components/Header/Header';
import HeaderStart from '../../components/Header/HeaderStart';
import Plan from './components/profilePlan';
import ProfilePassword from './components/profilePassword';
import ProfileData from './components/profileData';

import {ButtonDefault, ContainerScroll} from '../style';

import {
  deleteUserAccountService,
  readUserByIdService,
  updateUserService,
} from '../../service/user';
import {setLoading, unsetLoading} from '../../store/actions/loadingAction';
import {Label} from './components/style';
import ModalDeleteUserAccount from './components/ModalDeleteUserAccount';
import {unsetUser} from '../../store/actions/userSessionAction';
import LanguageSelection from '../../components/LanguageSelection/LanguageSelection';
import {setMessageError, setMessageOff} from '../../store/actions/systemAction';

export default function Profile({navigation}) {
  const DISPATCH = useDispatch();
  const USERSESSION = useSelector(state => {
    return state.userSessionReducer;
  });
  const [plan, setPlan] = useState('');
  const [userData, setUserData] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const {t} = useTranslation();

  function setMessage(text) {
    DISPATCH(setMessageError(text));
    setTimeout(() => {
      DISPATCH(setMessageOff());
    }, 5000);
  }

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
      .catch(() => {
        setMessage(`${t('system_message_user_could_not_update_profile')}`);
      })
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
      .catch(() => {
        setMessage(`${t('system_message_user_could_not_load_profile')}`);
      })
      .finally(() => {
        DISPATCH(unsetLoading());
      });
  }

  async function logout() {
    try {
      const storedData = await AsyncStorage.removeItem('USERSESSION');
      DISPATCH(unsetUser());
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

  async function deleteAccount() {
    DISPATCH(setLoading());
    await deleteUserAccountService({idUser: USERSESSION.id})
      .then(responseDelete => {
        if (responseDelete.status === 200) {
          logout();
        }
      })
      .catch(() => {
        setMessage(`${t('system_message_user_could_not_delete_profile')}`);
      })
      .finally(() => {
        DISPATCH(unsetLoading());
      });
  }

  useEffect(() => {
    loadProfile();
  }, []);

  return (
    <ViewDefault>
      {USERSESSION.userLevel === 3 ? (
        <Header navigation={navigation} title={t('title_profile')} />
      ) : (
        <HeaderStart />
      )}

      <ContainerScroll contentContainerStyle={{gap: 16}}>
        <ProfileData userData={userData} updateProfile={updateUser} />

        <LanguageSelection />

        {plan && <Plan plan={plan} />}

        <ProfilePassword />

        <ButtonDefault $red onPress={() => logout()}>
          <Label>{t('lbl_logout')}</Label>
        </ButtonDefault>

        <HorizontalRule />

        <ButtonDefault $red onPress={() => setOpenModal(true)}>
          <Label>{t('lbl_delete_account')}</Label>
        </ButtonDefault>
      </ContainerScroll>
      <ModalDeleteUserAccount
        deleteAccount={deleteAccount}
        openModal={openModal}
        setOpenModal={setOpenModal}
        title={t('lbl_delete_account')}
      />
    </ViewDefault>
  );
}

import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';

import {readGymUsersListService} from '../../service/user';
import {useDispatch, useSelector} from 'react-redux';
import Search from '../../components/Search';
import UsersList from './components/UsersList';
import {ButtonDefault, CustomText} from '../style';
import {Label, Row} from '../profile/components/style';
import {setLoading, unsetLoading} from '../../store/actions/loadingAction';

export default function UsersAttached({isAttached, navigation}) {
  const DISPATCH = useDispatch();
  const USERSESSION = useSelector(state => {
    return state.userSessionReducer;
  });
  const [originalList, setOriginalList] = useState([]);
  const [usersList, setUserList] = useState([]);
  const {t} = useTranslation();

  async function loadGymUsers() {
    DISPATCH(setLoading());
    await readGymUsersListService(USERSESSION.idGym)
      .then(responseFind => {
        if (responseFind.status === 200) {
          return responseFind.json();
        }
      })
      .then(response => {
        setOriginalList(response.data);
        setUserList(response.data);
      })
      .catch(err => {})
      .finally(() => {
        DISPATCH(unsetLoading());
      });
  }

  useEffect(() => {
    loadGymUsers();
  }, []);

  useEffect(() => {
    navigation.addListener('focus', () => {
      loadGymUsers();
    });
  }, [navigation]);

  function filterList(text) {
    setUserList(
      originalList.filter(
        item =>
          item.name.includes(text.toLowerCase()) ||
          item.name.includes(text.toUpperCase()),
      ),
    );
  }

  return (
    <React.Fragment>
      <CustomText>{t('message_users')}</CustomText>

      <Search search={filterList} />

      <Row>
        <ButtonDefault
          $turquoise
          onPress={() => navigation.navigate('ManageUser', {id: null})}>
          <Label>{t('lbl_add')}</Label>
        </ButtonDefault>
      </Row>

      {usersList.length > 0 ? (
        <UsersList list={usersList} navigation={navigation} isAttached={true} />
      ) : null}
    </React.Fragment>
  );
}

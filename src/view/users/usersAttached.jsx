import React, {useEffect, useState} from 'react';

import {readGymUsersListService} from '../../service/user';
import {useSelector} from 'react-redux';
import Search from '../../components/Search';
import UsersList from './components/UsersList';
import {ButtonDefault, CustomText} from '../style';
import {Label, Row} from '../profile/components/style';

export default function UsersAttached({isAttached, navigation}) {
  const userSession = useSelector(state => {
    return state.userSessionReducer;
  });
  const [originalList, setOriginalList] = useState([]);
  const [usersList, setUserList] = useState([]);

  async function loadGymUsers() {
    await readGymUsersListService(userSession.idGym)
      .then(responseFind => {
        if (responseFind.status === 200) {
          return responseFind.json();
        }
      })
      .then(response => {
        setOriginalList(response.data);
        setUserList(response.data);
      })
      .catch(err => {});
  }

  useEffect(() => {
    loadGymUsers();
  }, []);

  useEffect(() => {
    navigation.addListener('focus', () => {
      loadGymUsers();
    });
  }, []);

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
      <CustomText>Lista de alunos atrelados à academia</CustomText>

      <Search search={filterList} />

      <Row>
        <ButtonDefault
          $turquoise
          onPress={() => navigation.navigate('ManageUser', {id: null})}>
          <Label>ADICIONAR</Label>
        </ButtonDefault>
      </Row>

      {usersList.length > 0 ? (
        <UsersList list={usersList} navigation={navigation} isAttached={true} />
      ) : null}
    </React.Fragment>
  );
}

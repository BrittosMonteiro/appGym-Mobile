import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';
import {useSelector} from 'react-redux';

import {readUsersNotAttachedToGymService} from '../../service/user';
import styles from '../../styles';
import Search from '../../components/Search';
import UsersList from './components/UsersList';
import {CustomText} from '../style';

export default function UsersNotAttached({navigation}) {
  const userSession = useSelector(state => {
    return state.userSessionReducer;
  });
  const [originalList, setOriginalList] = useState([]);
  const [usersList, setUserList] = useState([]);

  async function loadUsers() {
    await readUsersNotAttachedToGymService(userSession.idGym)
      .then(responseFind => {
        if (responseFind.status === 200) {
          return responseFind.json();
        }
      })
      .then(response => {
        setOriginalList(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    navigation.addListener('focus', () => {
      loadUsers();
    });
  }, []);

  function filterList(text) {
    if (text.length >= 3) {
      setUserList(
        originalList.filter(
          item =>
            item.name.includes(text.toLowerCase()) ||
            item.name.includes(text.toUpperCase()),
        ),
      );
    } else {
      setUserList([]);
    }
  }

  return (
    <React.Fragment>
      <CustomText>
        Lista de alunos cadastrados no nosso sistema não atrelados à academia
      </CustomText>

      <Search search={filterList} />

      {usersList.length > 0 ? (
        <UsersList
          list={usersList}
          navigation={navigation}
          isAttached={false}
        />
      ) : null}
    </React.Fragment>
  );
}

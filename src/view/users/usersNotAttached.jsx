import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {readUsersNotAttachedToGymService} from '../../service/user';
import Search from '../../components/Search';
import UsersList from './components/UsersList';
import {CustomText} from '../style';
import {setLoading, unsetLoading} from '../../store/actions/loadingAction';

export default function UsersNotAttached({navigation}) {
  const DISPATCH = useDispatch();
  const USERSESSION = useSelector(state => {
    return state.userSessionReducer;
  });
  const [originalList, setOriginalList] = useState([]);
  const [usersList, setUserList] = useState([]);

  async function loadUsers() {
    DISPATCH(setLoading());
    await readUsersNotAttachedToGymService(USERSESSION.idGym)
      .then(responseFind => {
        if (responseFind.status === 200) {
          return responseFind.json();
        }
      })
      .then(response => {
        setOriginalList(response.data);
      })
      .catch(err => {})
      .finally(() => {
        DISPATCH(unsetLoading());
      });
  }

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    navigation.addListener('focus', () => {
      loadUsers();
    });
  }, [navigation]);

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

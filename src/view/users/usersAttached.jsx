import React, {useEffect, useState} from 'react';
import {Pressable, Text, View} from 'react-native';

import styles from '../../styles';
import Button from '../../components/Button';
import {readGymUsersListService} from '../../service/user';
import {useSelector} from 'react-redux';
import Search from '../../components/Search';
import UsersList from '../instructor/components/UsersList';

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
      <Text
        style={[
          styles.font.size.size_18,
          styles.font.weight.regular,
          styles.colors.textColor.white_2,
        ]}>
        Lista de alunos atrelados à academia
      </Text>

      <Search search={filterList} />

      <View style={[styles.main.row]}>
        <Pressable
          onPress={() => navigation.navigate('ManageUser', {id: null})}>
          <Button title={'ADICIONAR'} type={2} />
        </Pressable>
      </View>

      {usersList.length > 0 ? (
        <UsersList list={usersList} navigation={navigation} isAttached={true} />
      ) : null}
    </React.Fragment>
  );
}

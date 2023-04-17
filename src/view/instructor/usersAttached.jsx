import React, {useEffect, useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import {CaretRight} from 'phosphor-react-native';

import styles from '../../styles';
import HorizontalRule from '../../components/HorizontalRule';
import Button from '../../components/Button';
import {readGymUsersListService} from '../../service/user';
import {useSelector} from 'react-redux';
import Search from '../../components/Search';

export default function UsersAttached({navigation}) {
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
        Lista de alunos cadastrados no nosso sistema
      </Text>

      <Search search={filterList} />

      <View style={[styles.main.row]}>
        <Pressable
          onPress={() => navigation.navigate('ManageUser', {id: null})}>
          <Button title={'ADICIONAR'} type={2} />
        </Pressable>
      </View>

      {usersList.length > 0 ? (
        <View style={[styles.main.column, styles.gapStyle.gap_3]}>
          {usersList.map((user, index) => (
            <React.Fragment key={index}>
              <Pressable
                onPress={() =>
                  navigation.navigate('ManageUser', {id: user.idUser})
                }
                style={[
                  styles.main.row,
                  styles.alignment.justifyContent.space_between,
                ]}>
                <Text
                  style={[
                    styles.font.weight.medium,
                    styles.font.size.size_20,
                    styles.colors.textColor.white_2,
                  ]}>
                  {user.name}
                </Text>
                <CaretRight
                  color={styles.colors.textColor.white_1.color}
                  weight={'bold'}
                  size={28}
                />
              </Pressable>
              {index < usersList.length - 1 && (
                <HorizontalRule
                  color={styles.border.color.orange_1.borderColor}
                />
              )}
            </React.Fragment>
          ))}
        </View>
      ) : null}
    </React.Fragment>
  );
}

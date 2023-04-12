import React, {useEffect, useState} from 'react';
import {Pressable, Text, TextInput, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import ViewDefault from '../ViewDefault';
import Header from '../../components/Header';
import Button from '../../components/Button';
import styles from '../../styles';
import {setLoading, unsetLoading} from '../../store/actions/loadingAction';
import {createGymUser, readUserByIdService} from '../../service/user';

export default function ManageUser({navigation, route}) {
  const userSession = useSelector(state => {
    return state.userSessionReducer;
  });
  const dispatch = useDispatch();
  const {id} = route.params;
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [username, setUsername] = useState('');

  async function createUser() {
    dispatch(setLoading());
    if (!name || !birthdate || !email || !cpf) {
      console.log('Preencher corretamente');
      dispatch(unsetLoading());
      return;
    }

    const data = {
      name,
      email,
      birthdate,
      cpf,
      idGym: userSession.idGym,
    };

    await createGymUser(data)
      .then(responseCreate => {
        if (responseCreate.status === 201) {
          navigation.goBack();
        }
      })
      .catch(err => {})
      .finally(() => {
        dispatch(unsetLoading());
      });
  }

  async function loadUserInformation() {
    await readUserByIdService(id)
      .then(responseFind => {
        if (responseFind.status === 200) {
          return responseFind.json();
        }
      })
      .then(response => {
        setName(response.data.name);
        setBirthdate(response.data.birthdate);
        setEmail(response.data.email);
        setCpf(response.data.cpf);
        setUsername(response.data.username);
      })
      .catch(err => {});
  }

  useEffect(() => {
    if (id) {
      loadUserInformation();
    }
  }, [id]);

  return (
    <ViewDefault>
      <Header navigation={navigation} title={'GERENCIAR USUÁRIO'} />
      <View
        style={[
          styles.main.column,
          styles.gapStyle.gap_5,
          styles.paddingStyle.px_3,
        ]}>
        <View style={[styles.main.column, styles.gapStyle.gap_1]}>
          <Text
            style={[
              styles.colors.textColor.white_1,
              styles.font.size.size_16,
              styles.font.weight.regular,
            ]}>
            NOME
          </Text>
          <TextInput
            style={[
              styles.colors.backgroundColor.dark_3,
              styles.colors.textColor.white_1,
              styles.paddingStyle.pa_1,
              styles.main.borderRadiusDefault,
              styles.font.size.size_18,
              styles.font.weight.medium,
            ]}
            placeholderTextColor={[styles.colors.textColor.white_2]}
            placeholder="placeholder"
            defaultValue={name}
            editable={!id}
            onChangeText={data => setName(data)}
          />
        </View>
        <View style={[styles.main.column, styles.gapStyle.gap_1]}>
          <Text
            style={[
              styles.colors.textColor.white_1,
              styles.font.size.size_16,
              styles.font.weight.regular,
            ]}>
            DATA NASCIMENTO
          </Text>
          <TextInput
            style={[
              styles.colors.backgroundColor.dark_3,
              styles.colors.textColor.white_1,
              styles.paddingStyle.pa_1,
              styles.main.borderRadiusDefault,
              styles.font.size.size_18,
              styles.font.weight.medium,
            ]}
            placeholderTextColor={[styles.colors.textColor.white_2]}
            placeholder="placeholder"
            defaultValue={birthdate}
            editable={!id}
            onChangeText={data => setBirthdate(data)}
          />
        </View>
        <View style={[styles.main.column, styles.gapStyle.gap_1]}>
          <Text
            style={[
              styles.colors.textColor.white_1,
              styles.font.size.size_16,
              styles.font.weight.regular,
            ]}>
            E-MAIL
          </Text>
          <TextInput
            style={[
              styles.colors.backgroundColor.dark_3,
              styles.colors.textColor.white_1,
              styles.paddingStyle.pa_1,
              styles.main.borderRadiusDefault,
              styles.font.size.size_18,
              styles.font.weight.medium,
            ]}
            placeholderTextColor={[styles.colors.textColor.white_2]}
            placeholder="placeholder"
            defaultValue={email}
            editable={!id}
            onChangeText={data => setEmail(data)}
          />
        </View>
        <View style={[styles.main.column, styles.gapStyle.gap_1]}>
          <Text
            style={[
              styles.colors.textColor.white_1,
              styles.font.size.size_16,
              styles.font.weight.regular,
            ]}>
            CPF
          </Text>
          <TextInput
            style={[
              styles.colors.backgroundColor.dark_3,
              styles.colors.textColor.white_1,
              styles.paddingStyle.pa_1,
              styles.main.borderRadiusDefault,
              styles.font.size.size_18,
              styles.font.weight.medium,
            ]}
            placeholderTextColor={[styles.colors.textColor.white_2]}
            placeholder="placeholder"
            defaultValue={cpf}
            editable={!id}
            onChangeText={data => setCpf(data)}
          />
        </View>
        {id ? (
          <>
            <Pressable onPress={() => null}>
              <Button title={'CRIAR TREINO'} type={1} />
            </Pressable>
            <Pressable onPress={() => null}>
              <Button title={'REMOVER PLANO'} type={0} />
            </Pressable>
          </>
        ) : (
          <>
            <Pressable onPress={() => createUser()}>
              <Button title={'SALVAR'} type={1} />
            </Pressable>
            <Pressable onPress={() => cancel()}>
              <Button title={'CANCELAR'} type={0} />
            </Pressable>
          </>
        )}
      </View>
    </ViewDefault>
  );
}

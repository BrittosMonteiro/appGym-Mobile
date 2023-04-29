import React, {useEffect, useState} from 'react';
import {Pressable, ScrollView, Text, TextInput, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import ViewDefault from '../ViewDefault';
import Header from '../../components/Header';
import Button from '../../components/Button';
import styles from '../../styles';
import {setLoading, unsetLoading} from '../../store/actions/loadingAction';
import {
  createInstructorService,
  deleteInstructorService,
  readInstructorByIdService,
  updateInstructorService,
} from '../../service/instructor';

export default function ManageInstructor({navigation, route}) {
  const dispatch = useDispatch();
  const userSession = useSelector(state => {
    return state.userSessionReducer;
  });
  const {idInstructor} = route.params;
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [email, setEmail] = useState('');
  const [cref, setCref] = useState('');

  async function createInstructor() {
    dispatch(setLoading());
    if (!name || !email) {
      dispatch(unsetLoading());
      return;
    }

    const data = {
      idGym: userSession.id,
      name,
      birthdate,
      username: `${name
        .split(' ')[0]
        .replace(' ', '')
        .toLocaleLowerCase()}${name
        .split(' ')[1]
        .replace(' ', '')
        .toLocaleLowerCase()}_${userSession.displayName
        .replace(' ', '')
        .toLowerCase()}`,
      email,
      cref,
      userLevel: 2,
    };

    await createInstructorService(data)
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

  async function readInstructor() {
    dispatch(setLoading());

    await readInstructorByIdService(idInstructor)
      .then(responseFind => {
        if (responseFind.status === 200) {
          return responseFind.json();
        }
      })
      .then(response => {
        setName(response.data.name);
        setBirthdate(response.data.birthdate);
        setEmail(response.data.email);
        setCref(response.data.cref);
      })
      .catch(err => {})
      .finally(() => {
        dispatch(unsetLoading());
      });
  }

  async function updateInstructor() {
    dispatch(setLoading());

    if (!name || !email) {
      dispatch(unsetLoading());
      return;
    }

    const update = {
      idInstructor,
      data: {
        name,
        birthdate,
        username: `${name
          .split(' ')[0]
          .replace(' ', '')
          .toLocaleLowerCase()}${name
          .split(' ')[1]
          .replace(' ', '')
          .toLocaleLowerCase()}_${userSession.displayName
          .replace(' ', '')
          .toLowerCase()}`,
        email,
        cref,
      },
    };

    await updateInstructorService(update)
      .then(responseUpdate => {
        if (responseUpdate.status === 200) {
          navigation.goBack();
        }
      })
      .catch(err => {})
      .finally(() => {
        dispatch(unsetLoading());
      });
  }

  async function deleteInstructor() {
    dispatch(setLoading());
    await deleteInstructorService({idInstructor})
      .then(responseDelete => {
        if (responseDelete) {
          navigation.goBack();
        }
      })
      .catch(err => {})
      .finally(() => {
        dispatch(unsetLoading());
      });
  }

  useEffect(() => {
    if (idInstructor) {
      readInstructor();
    }
  }, [idInstructor]);

  return (
    <ViewDefault>
      <Header navigation={navigation} title={'GERENCIAR INSTRUTOR'} />
      <ScrollView
        contentContainerStyle={[
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
            placeholder="NOME DO INSTRUTOR"
            defaultValue={name}
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
            placeholder="DATA DE NASCIMENTO"
            defaultValue={birthdate}
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
            placeholder="E-MAIL"
            keyboardType="default"
            defaultValue={email}
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
            CREF
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
            placeholder="CREF"
            defaultValue={cref}
            onChangeText={data => setCref(data)}
          />
        </View>
        {idInstructor ? (
          <>
            <Pressable onPress={() => updateInstructor()}>
              <Button title={'ATUALIZAR'} type={1} />
            </Pressable>
            <Pressable onPress={() => deleteInstructor()}>
              <Button title={'EXCLUIR'} type={0} />
            </Pressable>
          </>
        ) : (
          <>
            <Pressable onPress={() => createInstructor()}>
              <Button title={'SALVAR'} type={1} />
            </Pressable>
            <Pressable onPress={() => navigation.goBack()}>
              <Button title={'CANCELAR'} type={0} />
            </Pressable>
          </>
        )}
      </ScrollView>
    </ViewDefault>
  );
}
